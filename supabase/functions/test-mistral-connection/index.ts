import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('=== TEST MISTRAL CONNECTION ===');
    
    // Vérifier les variables d'environnement
    const mistralApiKey = Deno.env.get('MISTRAL_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    console.log('Environment check:', {
      hasMistralKey: !!mistralApiKey,
      hasSupabaseUrl: !!supabaseUrl,
      hasServiceKey: !!supabaseServiceKey,
      mistralKeyLength: mistralApiKey?.length || 0
    });

    if (!mistralApiKey) {
      throw new Error('❌ MISTRAL_API_KEY manquante');
    }

    // Test 1: Connexion simple à Mistral
    console.log('🔄 Test 1: Connexion API Mistral...');
    const testResponse = await fetch("https://api.mistral.ai/v1/models", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${mistralApiKey}`,
        "Content-Type": "application/json"
      }
    });

    if (!testResponse.ok) {
      const errorText = await testResponse.text();
      console.error('❌ Erreur connexion Mistral:', errorText);
      throw new Error(`Connexion Mistral échouée: ${testResponse.status} - ${errorText}`);
    }

    const models = await testResponse.json();
    console.log('✅ Connexion Mistral OK - Modèles disponibles:', models.data?.length || 0);

    // Test 2: Génération avec l'agent par défaut
    console.log('🔄 Test 2: Génération avec agent...');
    const agentId = "ag:b1efb91e:20250429:untitled-agent:91be85e6";
    
    const generationResponse = await fetch(`https://api.mistral.ai/v1/agents/${agentId}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${mistralApiKey}`
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: "Raconte une courte histoire pour tester la connexion"
          }
        ],
        temperature: 0.7,
        max_tokens: 200
      })
    });

    if (!generationResponse.ok) {
      const errorText = await generationResponse.text();
      console.error('❌ Erreur génération agent:', errorText);
      throw new Error(`Génération agent échouée: ${generationResponse.status} - ${errorText}`);
    }

    const generationData = await generationResponse.json();
    const generatedContent = generationData.choices[0].message.content;
    console.log('✅ Génération agent OK - Contenu généré:', generatedContent.substring(0, 100) + '...');

    // Test 3: Edge Function mistral-generation
    console.log('🔄 Test 3: Edge Function mistral-generation...');
    
    const supabase = createClient(supabaseUrl!, supabaseServiceKey!);
    
    const { data: edgeFunctionData, error: edgeFunctionError } = await supabase.functions.invoke('mistral-generation', {
      body: {
        prompt: "Test de connexion via Edge Function",
        temperature: 0.7,
        maxTokens: 100
      }
    });

    if (edgeFunctionError) {
      console.error('❌ Erreur Edge Function:', edgeFunctionError);
      throw new Error(`Edge Function échouée: ${edgeFunctionError.message}`);
    }

    console.log('✅ Edge Function OK - Réponse:', edgeFunctionData);

    // Test 4: Sauvegarde du résultat
    console.log('🔄 Test 4: Sauvegarde résultat...');
    
    const { error: insertError } = await supabase
      .from('mistral_test')
      .update({
        test_result: JSON.stringify({
          mistralConnection: '✅ OK',
          agentGeneration: '✅ OK',
          edgeFunction: '✅ OK',
          generatedSample: generatedContent.substring(0, 200)
        }),
        test_status: 'success'
      })
      .eq('test_status', 'pending');

    if (insertError) {
      console.error('❌ Erreur sauvegarde:', insertError);
    } else {
      console.log('✅ Sauvegarde OK');
    }

    return new Response(JSON.stringify({
      success: true,
      message: "🎉 Tous les tests Mistral ont réussi !",
      details: {
        mistralConnection: "✅ OK",
        agentGeneration: "✅ OK", 
        edgeFunction: "✅ OK",
        sampleContent: generatedContent.substring(0, 200) + "..."
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Erreur test Mistral:', error);
    
    // Sauvegarder l'erreur
    try {
      const supabase = createClient(
        Deno.env.get('SUPABASE_URL')!,
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
      );
      
      await supabase
        .from('mistral_test')
        .update({
          test_result: JSON.stringify({
            error: error.message,
            timestamp: new Date().toISOString()
          }),
          test_status: 'failed'
        })
        .eq('test_status', 'pending');
    } catch (saveError) {
      console.error('❌ Erreur sauvegarde échec:', saveError);
    }

    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      message: "❌ Test de connexion Mistral échoué"
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});