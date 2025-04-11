
export const generateIllustration = async (prompt: string): Promise<string> => {
  // Simulate a delay for the illustration generation
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // This is just a simulation - in a real app, this would make an API call to Stable Diffusion XL
  // For now, we'll return a random placeholder image based on the prompt to simulate multiple illustrations
  const placeholderImages = [
    '/placeholder.svg',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    'https://images.unsplash.com/photo-1486718448742-163732cd1544',
    'https://images.unsplash.com/photo-1473177104440-ffee2f376098',
    'https://images.unsplash.com/photo-1500375592092-40eb2168fd21',
    'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843',
    'https://images.unsplash.com/photo-1517022812141-23620dba5c23',
    'https://images.unsplash.com/photo-1582562124811-c09040d0a901'
  ];
  
  // Randomly select an image to simulate different illustrations for different pages
  const imageIndex = Math.floor(Math.random() * placeholderImages.length);
  
  return placeholderImages[imageIndex];
};
