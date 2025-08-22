
import { supabase } from '@/integrations/supabase/client';

interface MistralGenerationParams {
  prompt: string;
  agentId?: string;
  temperature?: number;
  topP?: number;
  maxTokens?: number;
}

export const generateWithMistral = async ({ 
  prompt,
  agentId = "ag:b1efb91e:20250429:untitled-agent:91be85e6",
  temperature = 0.7,
  topP = 0.9,
  maxTokens = 4000
}: MistralGenerationParams) => {
  console.log('Calling Mistral via Supabase edge function...');
  
  const { data, error } = await supabase.functions.invoke('mistral-generation', {
    body: {
      prompt,
      agentId,
      temperature,
      topP,
      maxTokens,
      useStructuredOutput: false
    }
  });

  if (error) {
    console.error("Mistral generation error:", error);
    throw new Error(`Mistral generation failed: ${error.message}`);
  }

  if (!data?.success) {
    throw new Error(`Mistral API error: ${data?.error || 'Unknown error'}`);
  }

  return data.content;
};

// New function for structured story generation with JSON format
export const generateStructuredStory = async (
  userPrompt: string,
  systemPrompt: string,
  temperature = 0.7,
  maxTokens = 4000
) => {
  console.log('Calling structured Mistral generation via Supabase edge function...');
  
  const { data, error } = await supabase.functions.invoke('mistral-generation', {
    body: {
      prompt: userPrompt,
      systemPrompt,
      temperature,
      maxTokens,
      useStructuredOutput: true
    }
  });

  if (error) {
    console.error("Structured Mistral generation error:", error);
    throw new Error(`Structured Mistral generation failed: ${error.message}`);
  }

  if (!data?.success) {
    throw new Error(`Mistral API error: ${data?.error || 'Unknown error'}`);
  }

  return data.content;
};
