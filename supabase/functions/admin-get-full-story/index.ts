import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-admin-key',
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[ADMIN-GET-FULL-STORY] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep('Function started');

    // Verify admin key
    const adminKey = req.headers.get('x-admin-key');
    const expectedAdminKey = Deno.env.get('ADMIN_API_KEY');
    
    if (!adminKey || !expectedAdminKey || adminKey !== expectedAdminKey) {
      logStep('Unauthorized access attempt', { hasAdminKey: !!adminKey });
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Unauthorized: Invalid admin key' 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 401,
      });
    }

    logStep('Admin access authorized');

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

    // Get full story data
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .select(`
        *,
        stories!inner (
          story_json,
          created_at,
          cover_url,
          pdf_url
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

    // Return full story (admin access only)
    const fullStory = {
      title: storyJson.title,
      pages: storyJson.pages,
      moral: storyJson.moral,
      totalPages: storyJson.pages?.length || 0,
      isPreview: false
    };

    logStep('Full story retrieved', { 
      totalPages: fullStory.totalPages,
      title: fullStory.title 
    });

    return new Response(JSON.stringify({
      success: true,
      story: fullStory,
      order: {
        id: orderData.id,
        status: orderData.status,
        child_name: orderData.child_name,
        child_age: orderData.child_age,
        interests: orderData.interests,
        print_status: orderData.print_status,
        shipping_name: orderData.shipping_name,
        shipping_address: orderData.shipping_address,
        variant: orderData.variant,
        created_at: orderData.created_at
      },
      media: {
        cover_url: orderData.stories?.cover_url,
        pdf_url: orderData.stories?.pdf_url
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