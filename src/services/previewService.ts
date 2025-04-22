
export const generateStoryPreview = (generatedFullStory: string, pageCount: number, childAge: number) => {
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
  
  // Include most of the story in the preview (about 80%)
  // This ensures we have enough content to show multiple pages
  const previewParagraphs = Math.max(Math.ceil(lines.length * 0.8), 5);
  
  // Include more content for the preview
  const previewContent = [
    `# ${title}`,
    ...lines.slice(contentStart, contentStart + previewParagraphs),
    '',
    '⭐ Voici un aperçu de ton histoire personnalisée !',
    '',
    'Pour découvrir la suite et avoir ton livre complet...',
    '',
    `Histoire complète en ${pageCount} pages, adaptée aux ${childAge} ans`
  ].join('\n');
  
  return previewContent;
};
