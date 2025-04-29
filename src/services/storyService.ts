
import { generateWithMistral } from './mistralService';
import { formatStoryPrompt } from './utils/promptUtils';
import { generateStoryPreview } from './previewService';
import { IllustrationStyle } from './illustrationService';
import { extractKeyScenes } from './utils/extractionService';
import { generateFallbackStory } from './utils/fallbackService';
import { generateStoryIllustrations } from './illustrationService';

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
  heroDescription?: string;
  hasGlasses?: boolean;
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
  heroTrait,
  heroDescription,
  hasGlasses
}: StoryGenerationParams) => {
  try {
    // Format the prompt with all available information
    const formattedPrompt = formatStoryPrompt(
      prompt,
      childAge,
      pageCount,
      values,
      elements,
      { heroName, heroGender, heroAge, heroTrait, heroDescription, hasGlasses, illustrationStyle }
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
    // Assurez-vous que le fallback utilise également le prompt de l'utilisateur
    return generateFallbackStory(pageCount, childAge, prompt, heroName, elements);
  }
};
