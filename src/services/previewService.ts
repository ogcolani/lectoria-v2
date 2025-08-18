
export const generateStoryPreview = (generatedFullStory: string, pageCount: number, childAge: number) => {
  const lines = generatedFullStory.split('\n').filter(line => line.trim() !== '');
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
  
  // Retourner l'histoire complète pour permettre l'affichage avec overlay
  // L'effet de limitation sera géré côté composant
  return generatedFullStory;
};

// Cette fonction divise le contenu en plusieurs pages pour la prévisualisation (extrait limité)
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
    .filter(line => line.trim() !== '');
  
  // Pour l'extrait : ne prendre que 3-4 pages maximum (début de l'histoire)
  const maxExcerptPages = Math.min(4, Math.ceil(paragraphs.length * 0.15));
  const paragraphsPerPage = Math.max(1, Math.ceil(paragraphs.length / maxExcerptPages));
  
  // Diviser les paragraphes en pages (seulement le début)
  for (let i = 0; i < Math.min(paragraphs.length, maxExcerptPages * paragraphsPerPage); i += paragraphsPerPage) {
    const pageContent = paragraphs.slice(i, i + paragraphsPerPage).join('\n\n');
    if (pageContent.trim()) {
      pages.push(pageContent);
    }
  }
  
  return pages;
};
