import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[GENERATE-STORY-PUBLIC] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep('Function started');

    const body = await req.json().catch(() => ({}));
    console.log("[GEN:RECEIVED]", body);
    
    const { childName, age, interests = [], pages = 24, locale = 'fr' } = body;
    
    if (!childName || !age) {
      throw new Error('childName and age are required');
    }

    logStep('Input validated', { childName, age, interests, pages, locale });

    // Initialize Supabase with service role for database writes
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Supabase configuration missing');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false }
    });

    // Get Mistral configuration
    const mistralApiKey = Deno.env.get("MISTRAL_API_KEY");
    const mistralModel = Deno.env.get("MISTRAL_MODEL") || "mistral-large-latest";
    const previewRatio = parseFloat(Deno.env.get("PREVIEW_RATIO") || "0.15");

    if (!mistralApiKey) {
      throw new Error('MISTRAL_API_KEY not configured');
    }

    logStep('Configuration loaded', { mistralModel, previewRatio });

    // Create order first
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert({
        child_name: childName,
        child_age: age,
        interests: interests,
        status: 'generated',
        preview_ratio: previewRatio
      })
      .select()
      .single();

    if (orderError) {
      logStep('Order creation failed', orderError);
      throw new Error(`Failed to create order: ${orderError.message}`);
    }

    logStep('Order created', { orderId: orderData.id });

    // Generate story with Mistral
    const storyPrompt = `Crée une histoire personnalisée pour ${childName}, ${age} ans.
Centres d'intérêt: ${interests.join(', ')}.
L'histoire doit faire exactement ${pages} pages.

Retourne une réponse JSON strictement dans ce format:
{
  "title": "Titre de l'histoire",
  "pages": [
    {"page_number": 1, "text": "Texte de la première page..."},
    {"page_number": 2, "text": "Texte de la deuxième page..."}
  ],
  "moral": "Morale de l'histoire"
}

L'histoire doit être adaptée à l'âge de ${age} ans, avec un vocabulaire approprié et des valeurs positives.`;

    logStep('Calling Mistral API');

    const mistralResponse = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${mistralApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: mistralModel,
        messages: [
          {
            role: 'user',
            content: storyPrompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
        max_tokens: 4000
      }),
    });

    console.log("[GEN:MISTRAL:STATUS]", mistralResponse.status);

    if (!mistralResponse.ok) {
      const errorText = await mistralResponse.text();
      logStep('Mistral API error', { status: mistralResponse.status, error: errorText });
      throw new Error(`Mistral API error: ${mistralResponse.status} - ${errorText}`);
    }

    const mistralData = await mistralResponse.json().catch(() => ({}));
    console.log("[GEN:MISTRAL:RAW]", JSON.stringify(mistralData).slice(0, 400));
    const storyContent = mistralData.choices[0].message.content;
    
    let storyJson;
    try {
      storyJson = JSON.parse(storyContent);
    } catch (e) {
      logStep('JSON parsing failed', { content: storyContent });
      throw new Error('Invalid JSON response from Mistral');
    }

    logStep('Story generated', { title: storyJson.title, pageCount: storyJson.pages?.length });

    // Store full story in database
    const { error: storyError } = await supabase
      .from('stories')
      .insert({
        order_id: orderData.id,
        story_json: storyJson
      });

    if (storyError) {
      logStep('Story storage failed', storyError);
      throw new Error(`Failed to store story: ${storyError.message}`);
    }

    logStep('Full story stored in database');

    // Generate preview (limited content)
    const totalPages = storyJson.pages?.length || 0;
    const previewPageCount = Math.max(1, Math.floor(totalPages * previewRatio));
    const previewPages = storyJson.pages?.slice(0, previewPageCount) || [];

    const preview = {
      title: storyJson.title,
      pages: previewPages,
      totalPages: totalPages,
      previewPageCount: previewPageCount,
      isPreview: true
    };

    logStep('Preview generated', { previewPageCount, totalPages });

    return new Response(JSON.stringify({
      success: true,
      orderId: orderData.id,
      preview: preview
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep('ERROR', { message: errorMessage });
    return new Response(JSON.stringify({ 
      success: false, 
      error: errorMessage 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});