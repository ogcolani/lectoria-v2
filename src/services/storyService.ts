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

// Simplified fallback story
function generateFallbackStory(pageCount: number, childAge: number) {
  const title = "L'Aventure Magique";
  const intro = "Il était une fois, dans un monde rempli de merveilles, un jeune héros qui rêvait de vivre une grande aventure.";
  
  const generatedFullStory = `# ${title}\n\n${intro}\n\nUn jour magique, notre héros découvrit un mystérieux livre aux pages dorées. En l'ouvrant, une douce lumière en jaillit, l'invitant à vivre sa propre histoire.`;
  
  const preview = generateStoryPreview(generatedFullStory, pageCount, childAge);
  
  // Simplified illustration placeholders
  const placeholderIllustrations = [
    'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843'
  ];

  return {
    fullStory: generatedFullStory,
    storyPreview: preview,
    illustrationUrl: placeholderIllustrations[0],
    illustrations: placeholderIllustrations,
    storySegments: [{
      text: intro,
      prompt: "Une illustration magique d'un jeune héros découvrant un livre mystérieux"
    }]
  };
}
