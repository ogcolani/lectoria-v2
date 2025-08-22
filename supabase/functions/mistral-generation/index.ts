import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface MistralRequest {
  prompt: string;
  systemPrompt?: string;
  agentId?: string;
  temperature?: number;
  topP?: number;
  maxTokens?: number;
  useStructuredOutput?: boolean;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      prompt,
      systemPrompt,
      agentId = "ag:b1efb91e:20250429:untitled-agent:91be85e6",
      temperature = 0.7,
      topP = 0.9,
      maxTokens = 4000,
      useStructuredOutput = false
    }: MistralRequest = await req.json();

    const mistralApiKey = Deno.env.get('MISTRAL_API_KEY');
    if (!mistralApiKey) {
      throw new Error('MISTRAL_API_KEY not configured');
    }

    console.log('Mistral generation request:', {
      promptLength: prompt.length,
      hasSystemPrompt: !!systemPrompt,
      useStructuredOutput,
      agentId
    });

    let response;

    if (useStructuredOutput && systemPrompt) {
      // Use structured generation with JSON format
      response = await fetch("https://api.mistral.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${mistralApiKey}`
        },
        body: JSON.stringify({
          model: "pixtral-large-2411",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: prompt }
          ],
          temperature,
          max_tokens: maxTokens,
          response_format: { type: "json_object" }
        })
      });
    } else {
      // Use agent-based generation
      response = await fetch(`https://api.mistral.ai/v1/agents/${agentId}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${mistralApiKey}`
        },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: prompt
            }
          ],
          temperature,
          top_p: topP,
          max_tokens: maxTokens
        })
      });
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Mistral API error:", errorText);
      throw new Error(`Mistral API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    console.log('Mistral generation successful:', {
      contentLength: content.length,
      useStructuredOutput
    });

    return new Response(JSON.stringify({ 
      content,
      success: true 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in mistral-generation function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});