// Service d'illustration basé sur Stable Diffusion XL (SDXL) local
// Dans une implémentation réelle, ce service communiquerait avec une instance locale 
// d'Automatic1111 ou ComfyUI pour générer des images

// Options de style pour les illustrations
export type IllustrationStyle = 'storybook-cute' | 'fantasy-vibrant' | 'comic-style' | 'realistic';

interface IllustrationOptions {
  characterLoRA?: string;  // Chemin vers un fichier LoRA du personnage
  negativePrompt?: string; // Ce qu'on ne veut pas voir dans l'image
  steps?: number;          // Nombre d'étapes de génération (20-40 recommandé)
  seed?: number;           // Graine pour la reproductibilité
  style?: IllustrationStyle; // Style visuel de l'illustration
}

/**
 * Simule la génération d'illustrations par Stable Diffusion en cohérence avec le texte de l'histoire
 * Dans une version réelle, cette fonction appellerait l'API locale de Stable Diffusion
 */
export const generateIllustration = async (
  prompt: string, 
  options: IllustrationOptions = {}
): Promise<string> => {
  // Valeurs par défaut
  const {
    characterLoRA = 'hero_child_lora.safetensors',
    negativePrompt = 'deformed, ugly, bad anatomy, disfigured, poorly drawn face, extra limbs',
    steps = 30,
    style = 'storybook-cute'
  } = options;
  
  // Simule un délai réaliste pour la génération d'image (3-5 secondes)
  const generationTime = 3000 + Math.random() * 2000;
  await new Promise(resolve => setTimeout(resolve, generationTime));
  
  console.log(`[SDXL Simulation] Generating illustration with prompt: "${prompt}"`);
  console.log(`[SDXL Simulation] Using style: ${style}`);
  console.log(`[SDXL Simulation] Using character LoRA: ${characterLoRA}`);
  
  // Cette partie simule ce qui serait réellement un appel API à Automatic1111 ou ComfyUI
  // Dans une implémentation réelle, on utiliserait fetch() pour appeler l'API locale:
  /*
  const response = await fetch('http://127.0.0.1:7860/sdapi/v1/txt2img', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt: `${prompt}, ${getStylePrompt(style)}, children's book illustration`,
      negative_prompt: negativePrompt,
      steps: steps,
      loras: [{ name: characterLoRA, strength: 0.8 }]
    })
  });
  const result = await response.json();
  // Traitement de l'image en base64 retournée par l'API...
  */
  
  // Pour la simulation, on sélectionne une image parmi un ensemble d'images de qualité
  // Nous ajoutons plus d'images pour avoir plus de variété
  const placeholderImages = getPlaceholderImages();
  
  // Sélection d'image plus sophistiquée basée sur le prompt et le style
  let imageIndex = selectImageBasedOnPrompt(prompt, style, placeholderImages.length);
  
  // Image URL (dans une implémentation réelle, ce serait l'URL de l'image générée)
  return placeholderImages[imageIndex];
};

/**
 * Génère plusieurs illustrations pour une histoire complète
 * @param storySegments Segments de l'histoire pour lesquels générer des illustrations
 * @param style Style d'illustration à utiliser
 * @returns Un tableau d'URLs d'images générées
 */
export const generateStoryIllustrations = async (
  storySegments: { text: string; prompt: string }[], 
  style: IllustrationStyle = 'storybook-cute'
): Promise<string[]> => {
  // Pour éviter de surcharger l'instance Stable Diffusion locale,
  // on génère les images séquentiellement plutôt qu'en parallèle
  const illustrations: string[] = [];
  
  console.log(`[SDXL Batch] Generating ${storySegments.length} illustrations for story`);
  
  for (let i = 0; i < storySegments.length; i++) {
    const segment = storySegments[i];
    console.log(`[SDXL Batch] Generating illustration ${i+1}/${storySegments.length}`);
    
    // Options pour cette illustration spécifique
    // Nous utilisons une même seed de base pour maintenir la cohérence visuelle
    // mais la modifions légèrement pour chaque image
    const baseSeed = 123456789;
    const options = {
      style,
      seed: baseSeed + i,
      steps: 30 + (i % 10) // Varier légèrement les steps pour plus de diversité
    };
    
    // Générer l'illustration
    const imageUrl = await generateIllustration(segment.prompt, options);
    illustrations.push(imageUrl);
  }
  
  return illustrations;
};

// Fonctions utilitaires pour la sélection d'images

/**
 * Retourne un ensemble d'images placeholder pour la simulation
 */
function getPlaceholderImages(): string[] {
  return [
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158', // forêt enchantée
    'https://images.unsplash.com/photo-1486718448742-163732cd1544', // montagnes
    'https://images.unsplash.com/photo-1473177104440-ffee2f376098', // dragon
    'https://images.unsplash.com/photo-1500375592092-40eb2168fd21', // désert
    'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843', // livre magique
    'https://images.unsplash.com/photo-1517022812141-23620dba5c23', // cristaux lumineux
    'https://images.unsplash.com/photo-1582562124811-c09040d0a901', // héros en aventure
    'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a', // ciel nocturne avec étoiles
    'https://images.unsplash.com/photo-1580137189272-c9379f8864fd', // enfant explorant
    'https://images.unsplash.com/photo-1633219417516-45a045d8279f', // créature fantastique
    'https://images.unsplash.com/photo-1568639152391-74e45fb0e537', // château mystérieux
    'https://images.unsplash.com/photo-1511497584788-876760111969', // mer agitée
    'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85', // personnage sous la pluie
    'https://images.unsplash.com/photo-1542451542907-6cf80ff362d6', // forêt dense
    'https://images.unsplash.com/photo-1549880338-65ddcdfd017b'  // montagne brumeuse
  ];
}

/**
 * Sélectionne une image adaptée au contenu du prompt et au style choisi
 */
function selectImageBasedOnPrompt(prompt: string, style: IllustrationStyle, maxIndex: number): number {
  // Analyse sémantique simplifiée du prompt (dans une implémentation réelle,
  // on utiliserait NLP ou des embeddings pour mieux comprendre le contenu)
  const promptLower = prompt.toLowerCase();
  
  // Mots-clés à rechercher dans le prompt
  if (promptLower.includes('forêt') || promptLower.includes('foret') || promptLower.includes('arbre')) {
    return 0;
  } else if (promptLower.includes('montagne')) {
    return style === 'fantasy-vibrant' ? 14 : 1;
  } else if (promptLower.includes('dragon') || promptLower.includes('monstre') || promptLower.includes('créature')) {
    return 9;
  } else if (promptLower.includes('désert') || promptLower.includes('desert') || promptLower.includes('sable')) {
    return 3;
  } else if (promptLower.includes('livre') || promptLower.includes('magie') || promptLower.includes('sort')) {
    return 4;
  } else if (promptLower.includes('cristal') || promptLower.includes('gemme') || promptLower.includes('pierre')) {
    return 5;
  } else if (promptLower.includes('espace') || promptLower.includes('étoile') || promptLower.includes('ciel')) {
    return 7;
  } else if (promptLower.includes('château') || promptLower.includes('chateau') || promptLower.includes('palais')) {
    return 10;
  } else if (promptLower.includes('océan') || promptLower.includes('ocean') || promptLower.includes('mer')) {
    return 11;
  } else if (promptLower.includes('pluie') || promptLower.includes('orage') || promptLower.includes('tempête')) {
    return 12;
  } else if (promptLower.includes('exploration') || promptLower.includes('découverte')) {
    return 8;
  } else if (promptLower.includes('forêt dense') || promptLower.includes('jungle')) {
    return 13;
  }
  
  // Si aucun mot-clé spécifique n'est trouvé, on utilise une image plus générique
  // du héros en aventure, ou on choisit en fonction du style
  if (style === 'comic-style') {
    return 6; // héros en aventure
  } else if (style === 'fantasy-vibrant') {
    return 5; // cristaux lumineux
  } else if (style === 'realistic') {
    return 8; // enfant explorant
  }
  
  // Image par défaut ou sélection aléatoire parmi quelques options pertinentes
  const defaultOptions = [6, 8, 0, 1]; // héros, exploration, forêt, montagne
  return defaultOptions[Math.floor(Math.random() * defaultOptions.length)];
}

/**
 * Retourne un prompt stylisé en fonction du style choisi
 */
function getStylePrompt(style: IllustrationStyle): string {
  switch (style) {
    case 'storybook-cute':
      return 'cute, colorful, children\'s book illustration, soft lighting, warm colors, storybook style';
    case 'fantasy-vibrant':
      return 'vibrant colors, fantasy art, detailed, magical atmosphere, dreamlike';
    case 'comic-style':
      return 'comic book style, cel shaded, clean lines, bright colors, cartoon';
    case 'realistic':
      return 'realistic, detailed, natural lighting, photorealistic, high quality';
    default:
      return 'children\'s book illustration';
  }
}
