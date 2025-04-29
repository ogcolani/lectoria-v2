
/**
 * Helper function to extract key scenes from the story for illustrations
 * @param story The full generated story
 * @param pageCount The number of pages in the story
 * @returns An array of scene objects with text and prompt properties
 */
export function extractKeyScenes(story: string, pageCount: number) {
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
