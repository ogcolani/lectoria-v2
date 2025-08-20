
interface MistralGenerationParams {
  prompt: string;
  systemPrompt?: string;
  agentId?: string;
  temperature?: number;
  topP?: number;
  maxTokens?: number;
  useStructuredOutput?: boolean;
}

// Helper function to get API key from environment or throw error
const getMistralApiKey = () => {
  // In Lovable, we'll use the Supabase secret
  const apiKey = process.env.MISTRAL_API_KEY || 'ccHJPzAguqBac3OhFbNYAxcFD70MwYFu';
  if (!apiKey) {
    throw new Error('MISTRAL_API_KEY non défini dans les variables d\'environnement');
  }
  return apiKey;
};

export const generateWithMistral = async ({ 
  prompt,
  systemPrompt,
  agentId,
  temperature = 0.7,
  topP = 0.9,
  maxTokens = 4000,
  useStructuredOutput = false
}: MistralGenerationParams) => {
  const apiKey = getMistralApiKey();
  const model = process.env.MISTRAL_MODEL || "mistral-large-latest";

  // Choose between agent and direct model call
  const useAgent = !!agentId && !!process.env.MISTRAL_AGENT_ID;
  const endpoint = useAgent 
    ? `https://api.mistral.ai/v1/agents/${agentId || process.env.MISTRAL_AGENT_ID}/chat/completions`
    : "https://api.mistral.ai/v1/chat/completions";

  const messages = systemPrompt 
    ? [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ]
    : [{ role: "user", content: prompt }];

  const requestBody: any = {
    messages,
    temperature,
    top_p: topP,
    max_tokens: maxTokens
  };

  // Add model for direct API calls (not needed for agents)
  if (!useAgent) {
    requestBody.model = model;
  }

  // Add structured output for JSON responses
  if (useStructuredOutput) {
    requestBody.response_format = { type: "json_object" };
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Mistral API error:", errorText);
    throw new Error(`Mistral API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
};

// New function specifically for structured story generation
export const generateStructuredStory = async (
  userPrompt: string, 
  systemPrompt: string
) => {
  return generateWithMistral({
    prompt: userPrompt,
    systemPrompt,
    useStructuredOutput: true,
    temperature: 0.8, // Slightly higher for creativity
    maxTokens: 6000 // More tokens for longer stories
  });
};
