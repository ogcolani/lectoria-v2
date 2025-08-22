import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[GET-STORY] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep('Function started');

    const { orderId } = await req.json();
    
    if (!orderId) {
      throw new Error('orderId is required');
    }

    logStep('Input validated', { orderId });

    // Initialize Supabase
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Supabase configuration missing');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false }
    });

    // Get preview ratio
    const previewRatio = parseFloat(Deno.env.get("PREVIEW_RATIO") || "0.15");

    // Get order and story data
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .select(`
        *,
        stories!inner (
          story_json,
          created_at
        )
      `)
      .eq('id', orderId)
      .single();

    if (orderError || !orderData) {
      logStep('Order not found', { orderId, error: orderError });
      throw new Error('Order not found');
    }

    logStep('Order found', { 
      orderId, 
      status: orderData.status,
      hasStory: !!orderData.stories?.story_json 
    });

    const storyJson = orderData.stories?.story_json;
    if (!storyJson) {
      throw new Error('Story not found for this order');
    }

    // Check if user has paid
    const isPaid = orderData.status === 'paid';
    
    // Generate preview (always return preview, never full story)
    const totalPages = storyJson.pages?.length || 0;
    const effectiveRatio = orderData.preview_ratio || previewRatio;
    const previewPageCount = Math.max(1, Math.floor(totalPages * effectiveRatio));
    const previewPages = storyJson.pages?.slice(0, previewPageCount) || [];

    const preview = {
      title: storyJson.title,
      pages: previewPages,
      totalPages: totalPages,
      previewPageCount: previewPageCount,
      isPreview: true,
      paid: isPaid,
      printStatus: orderData.print_status || 'pending'
    };

    logStep('Preview generated', { 
      previewPageCount, 
      totalPages, 
      isPaid, 
      printStatus: orderData.print_status 
    });

    return new Response(JSON.stringify({
      success: true,
      preview: preview,
      order: {
        id: orderData.id,
        status: orderData.status,
        child_name: orderData.child_name,
        child_age: orderData.child_age,
        print_status: orderData.print_status,
        created_at: orderData.created_at
      }
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