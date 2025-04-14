
// Simule la génération d'illustrations par Stable Diffusion en cohérence avec le texte de l'histoire
export const generateIllustration = async (prompt: string): Promise<string> => {
  // Simulate a delay for the illustration generation
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // This is just a simulation - in a real app, this would make an API call to Stable Diffusion XL
  // Les prompts sont plus cohérents avec le contenu de l'histoire
  const placeholderImages = [
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158', // forêt enchantée
    'https://images.unsplash.com/photo-1486718448742-163732cd1544', // montagnes
    'https://images.unsplash.com/photo-1473177104440-ffee2f376098', // dragon
    'https://images.unsplash.com/photo-1500375592092-40eb2168fd21', // désert
    'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843', // livre magique
    'https://images.unsplash.com/photo-1517022812141-23620dba5c23', // cristaux lumineux
    'https://images.unsplash.com/photo-1582562124811-c09040d0a901',  // héros en aventure
    'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a'   // ciel nocturne avec étoiles
  ];
  
  // Sélection d'image basée sur le prompt
  let imageIndex = 0;
  
  // Recherche d'éléments clés dans le prompt pour choisir l'image appropriée
  if (prompt.toLowerCase().includes('forêt') || prompt.toLowerCase().includes('foret')) {
    imageIndex = 0;
  } else if (prompt.toLowerCase().includes('montagne')) {
    imageIndex = 1;
  } else if (prompt.toLowerCase().includes('dragon')) {
    imageIndex = 2;
  } else if (prompt.toLowerCase().includes('désert') || prompt.toLowerCase().includes('desert')) {
    imageIndex = 3;
  } else if (prompt.toLowerCase().includes('livre')) {
    imageIndex = 4;
  } else if (prompt.toLowerCase().includes('cristal')) {
    imageIndex = 5;
  } else if (prompt.toLowerCase().includes('espace') || prompt.toLowerCase().includes('étoile') || prompt.toLowerCase().includes('etoile') || prompt.toLowerCase().includes('ciel nocturne')) {
    imageIndex = 7; // nouvelle image pour le ciel nocturne
  } else {
    imageIndex = 6; // image par défaut du héros
  }
  
  return placeholderImages[imageIndex];
};
