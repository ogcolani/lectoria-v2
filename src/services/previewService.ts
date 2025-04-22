
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
  
  // Create preview with first few paragraphs (about 30% of the full story)
  const previewParagraphs = Math.min(Math.ceil(lines.length * 0.3), 10);
  return [
    `# ${title}`,
    ...lines.slice(contentStart, contentStart + previewParagraphs),
    '',
    `${childAge <= 5 ? '⭐ Une aventure magique avec des mots simples, parfaite pour les tout-petits !' : 
     childAge <= 8 ? '⭐ Une histoire captivante avec des personnages attachants, idéale pour les apprentis lecteurs !' : 
     childAge <= 12 ? '⭐ Un récit palpitant rempli de rebondissements, parfait pour développer l\'imagination !' : 
     '⭐ Une aventure épique aux multiples dimensions, conçue pour stimuler la réflexion et l\'empathie !'}`,
    '',
    `[Suite de l'histoire disponible après achat...]`,
    '',
    `Cette histoire complète fait ${pageCount} pages, spécialement adaptée pour les enfants de ${childAge} ans.`
  ].join('\n');
};
