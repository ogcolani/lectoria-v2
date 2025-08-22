import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[STRIPE-WEBHOOK] ${step}${detailsStr}`);
};

serve(async (req) => {
  try {
    logStep('Webhook received');

    const body = await req.text();
    const signature = req.headers.get('stripe-signature');
    
    if (!signature) {
      logStep('Missing Stripe signature');
      return new Response('Missing signature', { status: 400 });
    }

    // For now, we'll parse the body as JSON
    // In production, you should verify the webhook signature with Stripe
    let event;
    try {
      event = JSON.parse(body);
    } catch (e) {
      logStep('Invalid JSON', { error: e.message });
      return new Response('Invalid JSON', { status: 400 });
    }

    logStep('Event parsed', { type: event.type, id: event.id });

    // Initialize Supabase
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Supabase configuration missing');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false }
    });

    // Handle checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const orderId = session.metadata?.orderId;

      if (!orderId) {
        logStep('Missing orderId in session metadata');
        return new Response('Missing orderId', { status: 400 });
      }

      logStep('Processing checkout completion', { orderId, sessionId: session.id });

      // Update order status to paid
      const { error: updateError } = await supabase
        .from('orders')
        .update({ 
          status: 'paid',
          print_status: 'pending'
        })
        .eq('id', orderId);

      if (updateError) {
        logStep('Failed to update order', { error: updateError });
        throw new Error(`Failed to update order: ${updateError.message}`);
      }

      logStep('Order status updated to paid', { orderId });

      // Get full story for printing (call admin function)
      try {
        const adminApiKey = Deno.env.get('ADMIN_API_KEY');
        if (adminApiKey) {
          const adminResponse = await fetch(`${supabaseUrl}/functions/v1/admin-get-full-story`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-admin-key': adminApiKey,
              'Authorization': `Bearer ${supabaseServiceKey}`
            },
            body: JSON.stringify({ orderId })
          });

          if (adminResponse.ok) {
            const fullStoryData = await adminResponse.json();
            logStep('Full story retrieved for printing', { 
              orderId, 
              title: fullStoryData.story?.title 
            });

            // TODO: Send to printer/fulfillment service
            // For now, just log that we have the full story
            logStep('Ready for fulfillment', { 
              orderId,
              customerName: fullStoryData.order?.child_name,
              pageCount: fullStoryData.story?.totalPages
            });

            // Update print status to indicate processing has started
            await supabase
              .from('orders')
              .update({ print_status: 'processing' })
              .eq('id', orderId);

          } else {
            logStep('Failed to retrieve full story', { 
              status: adminResponse.status,
              statusText: adminResponse.statusText 
            });
          }
        }
      } catch (adminError) {
        logStep('Error calling admin function', { error: adminError.message });
        // Don't fail the webhook for this error
      }
    } else {
      logStep('Unhandled event type', { type: event.type });
    }

    return new Response('OK', { status: 200 });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep('ERROR', { message: errorMessage });
    return new Response(`Webhook error: ${errorMessage}`, { status: 500 });
  }
});