import { generateWithMistral } from './mistralService';
import { formatStoryPrompt } from './utils/promptUtils';
import { generateStoryPreview } from './previewService';
import { generateIllustration, generateStoryIllustrations, IllustrationStyle } from './illustrationService';

// Interface for story generation parameters
interface StoryGenerationParams {
  prompt: string;
  pageCount: number;
  childAge: number;
  values?: string[];
  elements?: string[];
  illustrationStyle?: IllustrationStyle;
  heroName?: string;
  heroGender?: string;
  heroAge?: string;
  heroTrait?: string;
}

export const generateStoryService = async ({
  prompt,
  pageCount,
  childAge = 6,
  values = [],
  elements = [],
  illustrationStyle = 'storybook-cute',
  heroName,
  heroGender,
  heroAge,
  heroTrait
}: StoryGenerationParams) => {
  try {
    // Format the prompt with all available information
    const formattedPrompt = formatStoryPrompt(
      prompt,
      childAge,
      pageCount,
      values,
      elements,
      { heroName, heroGender, heroAge, heroTrait }
    );
    
    console.log("Envoi de la requête à l'API Mistral avec le prompt:", formattedPrompt);
    
    // Generate the story using Mistral
    const generatedFullStory = await generateWithMistral({ prompt: formattedPrompt });
    
    // Create the preview version of the story
    const storyPreview = generateStoryPreview(generatedFullStory, pageCount, childAge);
    
    // Extract key scenes from the story for illustrations
    const storySegments = extractKeyScenes(generatedFullStory, pageCount);
    console.log(`Generating ${storySegments.length} illustrations for ${pageCount} story pages`);
    
    // Generate all illustrations with the chosen style
    const illustrations = await generateStoryIllustrations(storySegments, illustrationStyle);
    
    return {
      fullStory: generatedFullStory,
      storyPreview,
      illustrationUrl: illustrations.length > 0 ? illustrations[0] : null,
      illustrations,
      storySegments
    };
  } catch (error) {
    console.error("Error generating story:", error);
    return generateFallbackStory(pageCount, childAge);
  }
};

// Helper function to extract key scenes from the story for illustrations
function extractKeyScenes(story: string, pageCount: number) {
  const paragraphs = story.split('\n').filter(p => p.trim() !== '' && !p.startsWith('#'));
  const scenes = [];
  
  // Determine number of illustrations to generate (1 per page or less based on length)
  const sceneCount = Math.min(pageCount, paragraphs.length, 15);
  
  // Find paragraphs that are likely to be descriptive scenes
  const descriptiveParagraphs = paragraphs.filter(p => 
    p.length > 100 && !p.trimStart().startsWith('-') && !p.trimStart().startsWith('"')
  );
  
  // If we don't have enough descriptive paragraphs, use regular paragraphs
  const sourceParagraphs = descriptiveParagraphs.length >= sceneCount ? descriptiveParagraphs : paragraphs;
  
  // Select evenly distributed paragraphs across the story
  const step = Math.max(1, Math.floor(sourceParagraphs.length / sceneCount));
  
  for (let i = 0; i < sceneCount && i * step < sourceParagraphs.length; i++) {
    const paragraph = sourceParagraphs[i * step];
    const text = paragraph.slice(0, 150);
    scenes.push({
      text,
      prompt: `Une illustration de style enfantin pour un livre: ${text}`
    });
  }
  
  // Ensure we have at least one scene
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

  // Create fallback scenes for illustrations
  const fallbackScenes = [
    {
      text: "Un enfant trouve un livre magique dans la forêt",
      prompt: "Une illustration de style enfantin d'un enfant trouvant un livre magique brillant dans une forêt mystérieuse"
    },
    {
      text: "Des montagnes escarpées sous un ciel étoilé",
      prompt: "Une illustration de style enfantin de montagnes escarpées sous un ciel étoilé magique"
    },
    {
      text: "Un désert brûlant avec des dunes dorées",
      prompt: "Une illustration de style enfantin d'un désert aux dunes dorées sous un soleil brillant"
    }
  ];
  
  // Generate some placeholder illustrations
  const placeholderIllustrations = [
    'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843', // livre magique
    'https://images.unsplash.com/photo-1486718448742-163732cd1544', // montagnes
    'https://images.unsplash.com/photo-1500375592092-40eb2168fd21'  // désert
  ];

  return {
    fullStory: generatedFullStory,
    storyPreview: generatedPreview,
    illustrationUrl: placeholderIllustrations[0],
    illustrations: placeholderIllustrations,
    storySegments: fallbackScenes
  };
}
