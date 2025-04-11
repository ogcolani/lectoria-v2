
export const generateStoryService = async (prompt: string, pageCount: number, childAge: number = 6) => {
  // Simuler un délai de génération
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  const vocabularyLevel = childAge <= 5 ? 'très simple' : 
                         childAge <= 8 ? 'simple' : 
                         childAge <= 12 ? 'intermédiaire' : 'avancé';
  
  const storyLength = `Cette histoire complète fait environ ${pageCount} pages, adaptée au niveau de lecture ${vocabularyLevel} d'un enfant de ${childAge} ans.`;
  
  // Histoire complète (qui serait beaucoup plus longue dans une implémentation réelle)
  const generatedFullStory = `# L'Incroyable Aventure

Il était une fois, dans un monde rempli de merveilles et de magie, un jeune héros nommé Alex. Alex avait toujours rêvé de partir à l'aventure, de découvrir des terres inconnues et de vivre des expériences extraordinaires.

Un jour, alors qu'il se promenait dans la forêt près de chez lui, il découvrit un vieux livre mystérieux, caché sous un rocher couvert de mousse. En l'ouvrant, une lumière éblouissante en jaillit, et une voix douce murmura: "Toi qui as trouvé ce livre, tu es l'élu. Tu dois retrouver les trois cristaux de pouvoir pour sauver notre monde."

Sans hésiter, Alex accepta cette mission. Armé de son courage et de sa détermination, il partit à la recherche du premier cristal. Son voyage le mena à travers des montagnes escarpées, des déserts brûlants et des océans tumultueux.

${childAge <= 5 ? 'Il vit beaucoup d\'animaux rigolos.' : 
 childAge <= 8 ? 'Il rencontra des créatures merveilleuses qui l\'aidèrent dans son voyage.' : 
 childAge <= 12 ? 'En chemin, il fit la connaissance d\'alliés improbables qui devinrent ses plus fidèles compagnons.' : 
 'Durant son périple, il se lia d\'amitié avec des êtres aux capacités extraordinaires, formant une alliance hétéroclite mais redoutablement efficace.'}

[... Histoire complète sur ${pageCount} pages ...]

Et c'est ainsi que le jeune héros comprit que la véritable magie ne résidait pas dans les objets enchantés, mais dans le cœur de chacun.

Fin.`;

  // Aperçu de l'histoire - version plus détaillée avec quelques lignes supplémentaires
  const generatedPreview = `# L'Incroyable Aventure

Il était une fois, dans un monde rempli de merveilles et de magie, un jeune héros nommé Alex. Alex avait toujours rêvé de partir à l'aventure, de découvrir des terres inconnues et de vivre des expériences extraordinaires.

Un jour, alors qu'il se promenait dans la forêt près de chez lui, il découvrit un vieux livre mystérieux, caché sous un rocher couvert de mousse. En l'ouvrant, une lumière éblouissante en jaillit, et une voix douce murmura: "Toi qui as trouvé ce livre, tu es l'élu. Tu dois retrouver les trois cristaux de pouvoir pour sauver notre monde."

Sans hésiter, Alex accepta cette mission. Armé de son courage et de sa détermination, il partit à la recherche du premier cristal. Son voyage le mena à travers des montagnes escarpées, des déserts brûlants et des océans tumultueux.

Le premier cristal se trouvait au sommet de la plus haute montagne du royaume, gardé par un ancien dragon aux écailles d'argent. Alex gravit la montagne pendant des jours, bravant le froid et les tempêtes de neige.

Arrivé au sommet, il découvrit que le dragon n'était pas une créature féroce comme le racontaient les légendes, mais un sage gardien qui attendait l'arrivée de l'élu depuis des siècles...

${childAge <= 5 ? '⭐ Une aventure magique avec des mots simples, parfaite pour les tout-petits !' : 
 childAge <= 8 ? '⭐ Une histoire captivante avec des personnages attachants, idéale pour les apprentis lecteurs !' : 
 childAge <= 12 ? '⭐ Un récit palpitant rempli de rebondissements, parfait pour développer l\'imagination !' : 
 '⭐ Une aventure épique aux multiples dimensions, conçue pour stimuler la réflexion et l\'empathie !'}

[Suite de l'histoire disponible après achat...]

Cette histoire complète fait ${pageCount} pages, spécialement adaptée pour les enfants de ${childAge} ans.`;
  
  return {
    fullStory: generatedFullStory,
    storyPreview: generatedPreview
  };
};
