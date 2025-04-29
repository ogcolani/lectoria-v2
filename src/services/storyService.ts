
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

// Enhanced fallback story with more content and personalization
function generateFallbackStory(
  pageCount: number, 
  childAge: number, 
  userPrompt: string = "",
  heroName?: string, 
  elements: string[] = []
) {
  const characterName = heroName || "le jeune héros";
  const hasForest = elements.includes("Forêt enchantée");
  const hasOcean = elements.includes("Océan mystérieux");
  const hasTalkingAnimal = elements.includes("Animal qui parle");
  
  // Create a more detailed title based on elements and user prompt
  let title = "L'Aventure Magique";
  
  // Utiliser le prompt de l'utilisateur pour créer un titre plus pertinent
  if (userPrompt.toLowerCase().includes("espace") || userPrompt.toLowerCase().includes("fusée")) {
    title = `${characterName} et la Conquête de l'Espace`;
  } else if (hasForest) {
    title = "Le Secret de la Forêt Enchantée";
  } else if (hasOcean) {
    title = "Le Mystère de l'Océan Profond";
  } else if (hasForest && hasOcean) {
    title = "Entre Forêt et Océan";
  }
  
  // Create a more engaging intro paragraph
  let intro = `Il était une fois, dans un monde rempli de merveilles, ${characterName} qui rêvait de vivre une grande aventure.`;
  
  // Adapter l'introduction au prompt de l'utilisateur
  if (userPrompt && userPrompt.length > 10) {
    intro = `Il était une fois ${characterName}, qui s'apprêtait à vivre une aventure extraordinaire. ${userPrompt.charAt(0).toUpperCase() + userPrompt.slice(1)}.`;
  }
  
  // Add a second paragraph with appropriate details based on elements
  let secondParagraph = `Un jour magique, ${characterName} découvrit un mystérieux livre aux pages dorées. En l'ouvrant, une douce lumière en jaillit, l'invitant à vivre sa propre histoire.`;
  
  // Customize based on elements and prompt
  if (userPrompt.toLowerCase().includes("espace") || userPrompt.toLowerCase().includes("fusée")) {
    secondParagraph = `Un jour, en regardant les étoiles depuis sa fenêtre, ${characterName} aperçut une lumière étrange dans le ciel nocturne. Cette lumière s'approcha de plus en plus, jusqu'à ce qu'il puisse distinguer les contours d'un petit vaisseau spatial brillant.`;
  } else if (hasForest) {
    secondParagraph = `Un jour, en se promenant près de chez lui, ${characterName} découvrit un sentier qu'il n'avait jamais remarqué auparavant. Ce sentier s'enfonçait dans une forêt aux arbres majestueux dont les feuilles brillaient de mille couleurs.`;
  } else if (hasOcean) {
    secondParagraph = `Lors d'une journée ensoleillée à la plage, ${characterName} trouva une bouteille échouée contenant une carte mystérieuse. Cette carte indiquait l'emplacement d'un trésor caché au fond de l'océan.`;
  }
  
  // Add a third paragraph with a talking animal if requested
  let thirdParagraph = `En avançant dans son aventure, ${characterName} ressentit un mélange d'excitation et d'appréhension. Qu'allait-il découvrir au bout du chemin?`;
  
  if (hasTalkingAnimal) {
    const animal = hasForest ? "un écureuil au pelage doré" : (hasOcean ? "un dauphin au sourire malicieux" : "un petit chat aux yeux bleus brillants");
    thirdParagraph = `Alors que ${characterName} réfléchissait à ce qu'il devait faire, ${animal} s'approcha de lui. "N'aie pas peur," dit l'animal d'une voix douce et mélodieuse. "Je serai ton guide dans cette aventure."`;
  }
  
  // Fourth paragraph advancing the story
  let fourthParagraph = `Le courage dans le cœur et l'esprit rempli de curiosité, ${characterName} décida de continuer son chemin. Cette aventure n'était que le début d'une grande histoire.`;
  
  // Fifth paragraph with a simple conclusion for the preview
  let fifthParagraph = `Quelle surprise attendait ${characterName} au bout de cette aventure? Quels amis rencontrerait-il? Quels défis devrait-il surmonter? La suite de cette histoire magique t'attend...`;
  
  // Combine all paragraphs into the full story
  const generatedFullStory = `# ${title}\n\n${intro}\n\n${secondParagraph}\n\n${thirdParagraph}\n\n${fourthParagraph}\n\n${fifthParagraph}`;
  
  // Generate preview 
  const preview = generateStoryPreview(generatedFullStory, pageCount, childAge);
  
  // Create multiple fallback illustrations based on the story elements
  const placeholderIllustrations = [
    'https://images.unsplash.com/photo-1535379453313-b2c36a4d3160',
    'https://images.unsplash.com/photo-1516203294340-5ba5f612dc6a',
    'https://images.unsplash.com/photo-1631731356432-76942743e90e',
    'https://images.unsplash.com/photo-1516466723877-e4ec1d736c8a'
  ];

  // Create story segments for potential future illustration generation
  const fallbackSegments = [
    { text: intro, prompt: `Une illustration magique de ${characterName} rêvant d'aventure` },
    { text: secondParagraph, prompt: hasForest ? `Une forêt enchantée avec ${characterName}` : 
                                     hasOcean ? `${characterName} trouvant une carte au trésor sur la plage` : 
                                     `${characterName} découvrant un livre magique` },
    { text: thirdParagraph, prompt: hasTalkingAnimal ? `${characterName} rencontrant un animal qui parle` : 
                                      `${characterName} partant à l'aventure` },
    { text: fourthParagraph, prompt: `${characterName} embarquant pour une aventure épique` }
  ];

  return {
    fullStory: generatedFullStory,
    storyPreview: preview,
    illustrationUrl: placeholderIllustrations[0],
    illustrations: placeholderIllustrations,
    storySegments: fallbackSegments
  };
}
