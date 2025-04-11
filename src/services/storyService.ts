
import { generateIllustration } from './illustrationService';

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

Le premier cristal se trouvait au sommet de la plus haute montagne du royaume, gardé par un ancien dragon aux écailles d'argent. Alex gravit la montagne pendant des jours, bravant le froid et les tempêtes de neige.

Arrivé au sommet, il découvrit que le dragon n'était pas une créature féroce comme le racontaient les légendes, mais un sage gardien qui attendait l'arrivée de l'élu depuis des siècles.

"Tu as prouvé ton courage en arrivant jusqu'ici," dit le dragon d'une voix profonde. "Mais le cristal ne peut être obtenu par la force. Il te faut résoudre une énigme."

Alex réfléchit longtemps à l'énigme posée par le dragon. Finalement, il trouva la solution et le cristal s'illumina d'une lueur bleue avant de flotter jusqu'à lui.

Avec le premier cristal en sa possession, Alex se dirigea vers le désert pour trouver le deuxième. La chaleur était insupportable, mais il ne perdit jamais espoir.

Au cœur du désert, il rencontra une voyageuse mystérieuse qui lui offrit de l'eau et lui indiqua le chemin vers une oasis cachée. "Le cristal est gardé par un esprit ancien," l'avertit-elle.

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

Arrivé au sommet, il découvrit que le dragon n'était pas une créature féroce comme le racontaient les légendes, mais un sage gardien qui attendait l'arrivée de l'élu depuis des siècles.

"Tu as prouvé ton courage en arrivant jusqu'ici," dit le dragon d'une voix profonde. "Mais le cristal ne peut être obtenu par la force. Il te faut résoudre une énigme."

Alex réfléchit longtemps à l'énigme posée par le dragon. Finalement, il trouva la solution et le cristal s'illumina d'une lueur bleue avant de flotter jusqu'à lui.

Avec le premier cristal en sa possession, Alex se dirigea vers le désert pour trouver le deuxième. La chaleur était insupportable, mais il ne perdit jamais espoir.

Au cœur du désert, il rencontra une voyageuse mystérieuse qui lui offrit de l'eau et lui indiqua le chemin vers une oasis cachée. "Le cristal est gardé par un esprit ancien," l'avertit-elle.

${childAge <= 5 ? '⭐ Une aventure magique avec des mots simples, parfaite pour les tout-petits !' : 
 childAge <= 8 ? '⭐ Une histoire captivante avec des personnages attachants, idéale pour les apprentis lecteurs !' : 
 childAge <= 12 ? '⭐ Un récit palpitant rempli de rebondissements, parfait pour développer l\'imagination !' : 
 '⭐ Une aventure épique aux multiples dimensions, conçue pour stimuler la réflexion et l\'empathie !'}

[Suite de l'histoire disponible après achat...]

Cette histoire complète fait ${pageCount} pages, spécialement adaptée pour les enfants de ${childAge} ans.`;

  // Créer des prompts spécifiques pour chaque partie de l'histoire
  const storySegments = [
    {
      text: "Un jeune héros trouvant un livre mystérieux dans une forêt enchantée avec une lumière brillante",
      prompt: "Une illustration magique d'un jeune héros trouvant un livre mystérieux dans une forêt enchantée avec une lumière brillante"
    },
    {
      text: "Un voyage à travers des montagnes escarpées",
      prompt: "Un jeune aventurier gravissant des montagnes majestueuses et escarpées dans un monde fantastique"
    },
    {
      text: "Un dragon sage gardien d'un cristal bleu",
      prompt: "Un dragon aux écailles d'argent, sage gardien, et un cristal bleu brillant flottant dans l'air"
    },
    {
      text: "Un désert brûlant et une voyageuse mystérieuse",
      prompt: "Un jeune héros traversant un désert brûlant, rencontrant une voyageuse mystérieuse près d'une oasis"
    },
    {
      text: "Un cristal lumineux et des alliés improbables",
      prompt: "Un cristal magique émettant une lumière vive, entouré de créatures fantastiques alliées"
    }
  ];
  
  // Sélectionner un segment aléatoire pour l'illustration principale
  const randomIndex = Math.floor(Math.random() * storySegments.length);
  const selectedSegment = storySegments[randomIndex];
  
  // Générer l'illustration correspondant au segment choisi
  const illustrationUrl = await generateIllustration(selectedSegment.prompt);
  
  return {
    fullStory: generatedFullStory,
    storyPreview: generatedPreview,
    illustrationUrl: illustrationUrl
  };
};
