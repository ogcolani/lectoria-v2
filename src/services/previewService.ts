
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
  
  // Create a shorter preview (about 20% of the full story)
  const previewParagraphs = Math.min(Math.ceil(lines.length * 0.2), 5);
  return [
    `# ${title}`,
    ...lines.slice(contentStart, contentStart + previewParagraphs),
    '',
    '⭐ Un aperçu de ton histoire personnalisée !',
    '',
    'Pour découvrir la suite de cette aventure unique...',
    '',
    `Histoire complète en ${pageCount} pages, adaptée aux ${childAge} ans`
  ].join('\n');
};

