
import { generateWithMistral, generateStructuredStory } from './mistralService';
import { formatStoryPrompt } from './utils/promptUtils';
import { generateStoryPreview } from './previewService';
import { IllustrationStyle } from './illustrationService';
import { extractKeyScenes } from './utils/extractionService';
import { generateFallbackStory } from './utils/fallbackService';
import { generateStoryIllustrations } from './illustrationService';
import { generateOptimizedPrompt } from './promptGeneratorService';
import { conditionalApiCall, generateTestStory } from './testModeService';
import { LECTORIA_SYSTEM_PROMPT, buildUserPrompt } from '@/lib/prompts/system';
import { storyResponseSchema, type StoryResponse } from '@/lib/validators/story';

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
  useOptimizedPrompts?: boolean;
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
  hasGlasses,
  useOptimizedPrompts = true // Par défaut, nous utilisons le nouveau processus
}: StoryGenerationParams) => {
  try {
    let formattedPrompt;
    
    if (useOptimizedPrompts) {
      // Nouveau processus: utilise l'IA génératrice de prompts pour optimiser les instructions
      console.log("Utilisation du processus optimisé avec génération de prompt par IA");
      
      // Générer un prompt optimisé via le nouveau service
      const optimizedPrompt = await generateOptimizedPrompt({
        heroName,
        heroAge,
        heroGender,
        heroTrait,
        heroDescription,
        hasGlasses,
        userPrompt: prompt,
        childAge,
        pageCount,
        values,
        elements,
        illustrationStyle
      });
      
      // Utiliser ce prompt optimisé pour Mistral
      formattedPrompt = optimizedPrompt;
      
    } else {
      // Ancien processus: utilise la fonction formatStoryPrompt directement
      formattedPrompt = formatStoryPrompt(
        prompt,
        childAge,
        pageCount,
        values,
        elements,
        { heroName, heroGender, heroAge, heroTrait, heroDescription, hasGlasses, illustrationStyle }
      );
    }
    
    // Utiliser le mode TEST ou les vraies APIs selon l'environnement
    const result = await conditionalApiCall(
      // Mode TEST: utiliser les données mock
      async () => {
        const mockResult = await generateTestStory({
          heroName: heroName || '',
          heroAge: heroAge || '',
          heroTrait: heroTrait || '',
          prompt,
          pageCount
        });
        
        const storyPreview = generateStoryPreview(mockResult.story, pageCount, childAge);
        const storySegments = extractKeyScenes(mockResult.story, pageCount);
        
        return {
          fullStory: mockResult.story,
          structuredStory: null, // Mock mode doesn't have structured format yet
          storyPreview,
          illustrationUrl: mockResult.illustrationUrl,
          illustrations: [mockResult.illustrationUrl],
          storySegments,
          usedOptimizedPrompt: useOptimizedPrompts
        };
      },
      // Mode PRODUCTION: utiliser les vraies APIs
      async () => {
        console.log("Envoi de la requête à l'API Mistral avec le prompt:", formattedPrompt);
        
        // Try structured generation first (with JSON format)
        let generatedStory: StoryResponse | null = null;
        let generatedFullStory = '';
        
        try {
          // Create structured prompt for JSON output
          const structuredPrompt = buildUserPrompt({
            prenom: heroName || 'Héros',
            age: parseInt(heroAge || '7'),
            genre: heroGender === 'male' ? 'garçon' : heroGender === 'female' ? 'fille' : 'autre',
            passions: elements.join(', ') || 'aventure',
            valeurs: values.join(', ') || 'courage',
            style: illustrationStyle || 'drôle et aventure',
            univers: elements.join(', ') || 'magie',
            nbPages: pageCount,
            trancheAge: childAge <= 5 ? '3-5' : childAge <= 7 ? '5-7' : childAge <= 10 ? '7-10' : '9-12'
          });
          
          console.log("Tentative de génération structurée avec Mistral...");
          const structuredResult = await generateStructuredStory(structuredPrompt, LECTORIA_SYSTEM_PROMPT);
          
          // Parse and validate the JSON response
          const parsedStory = JSON.parse(structuredResult);
          const validatedStory = storyResponseSchema.parse(parsedStory);
          generatedStory = validatedStory;
          
          // Convert structured story back to full text for compatibility
          generatedFullStory = `# ${validatedStory.title}\n\n${validatedStory.pages.map(page => page.text).join('\n\n')}\n\n**Morale:** ${validatedStory.moral}`;
          
          console.log("Génération structurée réussie!");
          
        } catch (error) {
          console.warn("Génération structurée échouée, fallback vers l'ancien système:", error);
          
          // Fallback to the old system
          generatedFullStory = await generateWithMistral({ prompt: formattedPrompt });
        }
        
        const storyPreview = generateStoryPreview(generatedFullStory, pageCount, childAge);
        const storySegments = extractKeyScenes(generatedFullStory, pageCount);
        console.log(`Generating ${storySegments.length} illustrations for ${pageCount} story pages`);
        
        const illustrations = await generateStoryIllustrations(storySegments, illustrationStyle);
        
        return {
          fullStory: generatedFullStory,
          structuredStory: generatedStory, // New: add structured story data
          storyPreview,
          illustrationUrl: illustrations.length > 0 ? illustrations[0] : null,
          illustrations,
          storySegments,
          usedOptimizedPrompt: useOptimizedPrompts
        };
      }
    );
    
    return result;
  } catch (error) {
    console.error("Error generating story:", error);
    // Assurez-vous que le fallback utilise également le prompt de l'utilisateur
    return generateFallbackStory(pageCount, childAge, prompt, heroName, elements);
  }
};
