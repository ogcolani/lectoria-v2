
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
  const response = await fetch(`https://api.mistral.ai/v1/agents/${agentId}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.MISTRAL_API_KEY}`
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

  if (!response.ok) {
    console.error("Mistral API error:", await response.text());
    throw new Error(`Mistral API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
};

// New function for structured story generation with JSON format
export const generateStructuredStory = async (
  userPrompt: string,
  systemPrompt: string,
  temperature = 0.7,
  maxTokens = 4000
) => {
  const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.MISTRAL_API_KEY}`
    },
    body: JSON.stringify({
      model: "pixtral-large-2411",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature,
      max_tokens: maxTokens,
      response_format: { type: "json_object" }
    })
  });

  if (!response.ok) {
    console.error("Mistral API error:", await response.text());
    throw new Error(`Mistral API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
};
