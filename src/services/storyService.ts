
import { generateIllustration } from './illustrationService';

// Interface for story generation parameters
interface StoryGenerationParams {
  prompt: string;
  pageCount: number;
  childAge: number;
  values?: string[];
  elements?: string[];
}

export const generateStoryService = async ({
  prompt,
  pageCount,
  childAge = 6,
  values = [],
  elements = []
}: StoryGenerationParams) => {
  try {
    // Convert values and elements to a string format for the prompt
    const valuesText = values.length > 0 ? `Les valeurs importantes dans cette histoire sont: ${values.join(', ')}.` : '';
    const elementsText = elements.length > 0 ? `L'histoire doit inclure les éléments suivants: ${elements.join(', ')}.` : '';
    
    // Calculate approximate word count based on page count (assuming ~100 words per page)
    const wordCount = pageCount * 100;
    
    // Adapt vocabulary based on child age
    const vocabularyLevel = childAge <= 5 ? 'très simple avec des phrases courtes' : 
                           childAge <= 8 ? 'simple et accessible' : 
                           childAge <= 12 ? 'intermédiaire avec quelques mots plus recherchés' : 'riche et varié';
    
    // Create a comprehensive prompt for Mistral API
    const mistralPrompt = `
    Génère une histoire pour enfant de ${childAge} ans, qui fera environ ${pageCount} pages.
    
    Instructions spécifiques:
    - Utilise un vocabulaire ${vocabularyLevel}
    - L'histoire doit faire environ ${wordCount} mots au total
    - Crée un titre captivant
    - Inclus une introduction, un développement avec des rebondissements, et une conclusion
    ${valuesText}
    ${elementsText}
    
    Instructions supplémentaires de l'utilisateur:
    ${prompt}
    
    Format de retour:
    - Sépare clairement le titre avec un # au début
    - Utilise des paragraphes courts et aérés
    - Ne mentionne pas dans l'histoire qu'elle est générée par IA
    `;
    
    console.log("Sending request to Mistral API with prompt:", mistralPrompt);
    
    // Call Mistral API
    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.MISTRAL_API_KEY || 'sk-...'}` // Replace with actual API key in production
      },
      body: JSON.stringify({
        model: "mistral-large-latest", // Use appropriate model
        messages: [
          {
            role: "user",
            content: mistralPrompt
          }
        ],
        temperature: 0.7,
        top_p: 0.9,
        max_tokens: 4000
      })
    });
    
    if (!response.ok) {
      console.error("Mistral API error:", await response.text());
      throw new Error(`Mistral API error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Received response from Mistral API:", data);
    
    // Extract generated story from the Mistral response
    const generatedFullStory = data.choices[0].message.content;
    
    // Create a shorter preview for the UI
    // Extract title and first few paragraphs for the preview
    const lines = generatedFullStory.split('\n');
    let title = "Histoire Générée";
    let contentStart = 0;
    
    // Find the title (starts with #)
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('# ')) {
        title = lines[i].substring(2);
        contentStart = i + 1;
        break;
      }
    }
    
    // Create preview with first few paragraphs (about 30% of the full story)
    const previewParagraphs = Math.min(Math.ceil(lines.length * 0.3), 10);
    const storyPreview = [
      `# ${title}`,
      ...lines.slice(contentStart, contentStart + previewParagraphs),
      '',
      `${childAge <= 5 ? '⭐ Une aventure magique avec des mots simples, parfaite pour les tout-petits !' : 
       childAge <= 8 ? '⭐ Une histoire captivante avec des personnages attachants, idéale pour les apprentis lecteurs !' : 
       childAge <= 12 ? '⭐ Un récit palpitant rempli de rebondissements, parfait pour développer l\'imagination !' : 
       '⭐ Une aventure épique aux multiples dimensions, conçue pour stimuler la réflexion et l\'empathie !'}`,
      '',
      `[Suite de l'histoire disponible après achat...]`,
      '',
      `Cette histoire complète fait ${pageCount} pages, spécialement adaptée pour les enfants de ${childAge} ans.`
    ].join('\n');
    
    // Create prompts for illustrations based on story content
    // Extract key scenes from the story by looking for vivid descriptive paragraphs
    const storySegments = extractKeyScenes(generatedFullStory, 5);
    
    // Select a random segment for illustration
    const randomIndex = Math.floor(Math.random() * storySegments.length);
    const selectedSegment = storySegments[randomIndex];
    
    // Generate illustration for the selected scene
    const illustrationUrl = await generateIllustration(selectedSegment.prompt);
    
    return {
      fullStory: generatedFullStory,
      storyPreview: storyPreview,
      illustrationUrl: illustrationUrl
    };
  } catch (error) {
    console.error("Error generating story:", error);
    // Fallback to a simple story in case of error
    return generateFallbackStory(pageCount, childAge);
  }
};

// Helper function to extract key scenes from the story for illustrations
function extractKeyScenes(story: string, count: number) {
  const paragraphs = story.split('\n').filter(p => p.trim() !== '' && !p.startsWith('#'));
  const scenes = [];
  
  // Find paragraphs that are likely to be descriptive scenes
  // Look for longer paragraphs that aren't dialogue (don't start with - or ")
  const descriptiveParagraphs = paragraphs.filter(p => 
    p.length > 100 && !p.trimStart().startsWith('-') && !p.trimStart().startsWith('"')
  );
  
  // If we don't have enough descriptive paragraphs, use regular paragraphs
  const sourceParagraphs = descriptiveParagraphs.length >= count ? descriptiveParagraphs : paragraphs;
  
  // Select evenly distributed paragraphs across the story
  const step = Math.max(1, Math.floor(sourceParagraphs.length / count));
  
  for (let i = 0; i < count && i * step < sourceParagraphs.length; i++) {
    const paragraph = sourceParagraphs[i * step];
    // Create a prompt that's suitable for image generation
    // Limit to 150 chars to avoid overly complex prompts
    const text = paragraph.slice(0, 150);
    scenes.push({
      text: text,
      prompt: `Une illustration de style enfantin: ${text}`
    });
  }
  
  // Ensure we have at least some scenes
  if (scenes.length === 0) {
    scenes.push({
      text: "Un enfant partant à l'aventure dans un monde magique",
      prompt: "Une illustration colorée d'un enfant partant à l'aventure dans un monde magique"
    });
  }
  
  return scenes;
}

// Fallback function in case the API fails
function generateFallbackStory(pageCount: number, childAge: number) {
  const title = "L'Aventure Magique";
  const intro = "Il était une fois, dans un monde rempli de merveilles et de magie, un jeune héros nommé Alex. Alex avait toujours rêvé de partir à l'aventure, de découvrir des terres inconnues et de vivre des expériences extraordinaires.";
  
  // Simple story structure as fallback
  const generatedFullStory = `# ${title}

${intro}

Un jour, alors qu'il se promenait dans la forêt près de chez lui, il découvrit un vieux livre mystérieux, caché sous un rocher couvert de mousse. En l'ouvrant, une lumière éblouissante en jaillit, et une voix douce murmura: "Toi qui as trouvé ce livre, tu es l'élu. Tu dois retrouver les trois cristaux de pouvoir pour sauver notre monde."

Sans hésiter, Alex accepta cette mission. Armé de son courage et de sa détermination, il partit à la recherche du premier cristal. Son voyage le mena à travers des montagnes escarpées, des déserts brûlants et des océans tumultueux.

[... Histoire complète sur ${pageCount} pages ...]

Et c'est ainsi que le jeune héros comprit que la véritable magie ne résidait pas dans les objets enchantés, mais dans le cœur de chacun.

Fin.`;

  // Preview with more detail
  const generatedPreview = `# ${title}

${intro}

Un jour, alors qu'il se promenait dans la forêt près de chez lui, il découvrit un vieux livre mystérieux, caché sous un rocher couvert de mousse. En l'ouvrant, une lumière éblouissante en jaillit, et une voix douce murmura: "Toi qui as trouvé ce livre, tu es l'élu. Tu dois retrouver les trois cristaux de pouvoir pour sauver notre monde."

${childAge <= 5 ? '⭐ Une aventure magique avec des mots simples, parfaite pour les tout-petits !' : 
 childAge <= 8 ? '⭐ Une histoire captivante avec des personnages attachants, idéale pour les apprentis lecteurs !' : 
 childAge <= 12 ? '⭐ Un récit palpitant rempli de rebondissements, parfait pour développer l\'imagination !' : 
 '⭐ Une aventure épique aux multiples dimensions, conçue pour stimuler la réflexion et l\'empathie !'}

[Suite de l'histoire disponible après achat...]

Cette histoire complète fait ${pageCount} pages, spécialement adaptée pour les enfants de ${childAge} ans.`;

  return {
    fullStory: generatedFullStory,
    storyPreview: generatedPreview,
    illustrationUrl: null
  };
}
