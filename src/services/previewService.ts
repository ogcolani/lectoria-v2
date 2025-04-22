
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

// Cette fonction divise le contenu en plusieurs pages pour la prévisualisation
export const splitContentIntoPages = (content: string, imagesCount: number): string[] => {
  if (!content) return [];

  const lines = content.split('\n');
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

  // La première page est la page de titre
  const pages: string[] = [`# ${title}`];
  
  // On récupère les paragraphes réels du contenu (en ignorant les lignes vides)
  const paragraphs = lines.slice(contentStart)
    .filter(line => line.trim() !== '')
    .filter(line => !line.includes('Voici un aperçu') && !line.includes('Pour découvrir') && !line.includes('Histoire complète en'));
  
  // Nombre de paragraphes par page (généralement 1-2)
  const paragraphsPerPage = Math.max(1, Math.ceil(paragraphs.length / (imagesCount > 1 ? imagesCount - 1 : 4)));
  
  // Diviser les paragraphes en pages
  for (let i = 0; i < paragraphs.length; i += paragraphsPerPage) {
    const pageContent = paragraphs.slice(i, i + paragraphsPerPage).join('\n\n');
    if (pageContent.trim()) {
      pages.push(pageContent);
    }
  }
  
  // Ajouter une page finale invitant à continuer
  pages.push('Pour découvrir la suite de cette merveilleuse aventure, commande le livre complet !');
  
  return pages;
};
