
interface MistralGenerationParams {
  prompt: string;
  agentId?: string;
  temperature?: number;
  topP?: number;
  maxTokens?: number;
}

export const generateWithMistral = async ({ 
  prompt,
  agentId = "ag:b1efb91e:20250417:untitled-agent:42bf825d",
  temperature = 0.7,
  topP = 0.9,
  maxTokens = 4000
}: MistralGenerationParams) => {
  const response = await fetch(`https://api.mistral.ai/v1/agents/${agentId}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ccHJPzAguqBac3OhFbNYAxcFD70MwYFu`
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
