
import { IllustrationStyle } from '@/services/illustrationService';

interface HeroInfo {
  heroName?: string;
  heroGender?: string;
  heroAge?: string;
  heroTrait?: string;
  heroDescription?: string;
  hasGlasses?: boolean;
  illustrationStyle?: IllustrationStyle;
}

export const formatStoryPrompt = (
  basePrompt: string,
  childAge: number,
  pageCount: number,
  values: string[] = [],
  elements: string[] = [],
  heroInfo: HeroInfo = {}
) => {
  const wordCount = pageCount * 100;
  const vocabularyLevel = childAge <= 5 ? 'très simple avec des phrases courtes' : 
                         childAge <= 8 ? 'simple et accessible' : 
                         childAge <= 12 ? 'intermédiaire avec quelques mots plus recherchés' : 'riche et varié';

  // Construire la description du héros de manière plus détaillée et OBLIGATOIRE
  const heroInfoArray = [];
  if (heroInfo.heroName) heroInfoArray.push(`Le héros/héroïne principal(e) s'appelle ${heroInfo.heroName}.`);
  if (heroInfo.heroGender) heroInfoArray.push(`C'est un(e) ${heroInfo.heroGender}.`);
  if (heroInfo.heroAge) heroInfoArray.push(`Il/Elle a ${heroInfo.heroAge} ans.`);
  if (heroInfo.heroTrait) heroInfoArray.push(`Ses traits de caractère principaux sont: ${heroInfo.heroTrait}.`);
  if (heroInfo.heroDescription) heroInfoArray.push(`Description physique du personnage: ${heroInfo.heroDescription}.`);
  if (heroInfo.hasGlasses) heroInfoArray.push(`Le personnage porte des lunettes.`);
  
  // S'assurer que les informations du héros sont toujours incluses, même si minimes
  let heroText = heroInfoArray.length > 0 
    ? heroInfoArray.join(' ') 
    : "L'histoire doit avoir un personnage principal bien défini.";

  // Construire les informations sur les valeurs et éléments d'histoire
  const valuesText = values.length > 0 
    ? `Les valeurs importantes à transmettre dans cette histoire sont: ${values.join(', ')}.` 
    : '';
  
  const elementsText = elements.length > 0 
    ? `L'histoire doit absolument inclure ces éléments: ${elements.join(', ')}.` 
    : '';

  // Construction du prompt final avec une emphase sur l'incorporation des informations du héros
  // et la prise en compte explicite du prompt de l'utilisateur
  return `Tu es un expert en création d'histoires pour enfants. Je veux que tu génères une histoire captivante et personnalisée.

Instructions détaillées:
- Histoire pour enfant de ${childAge} ans
- Environ ${pageCount} pages (${wordCount} mots)
- Utilise un vocabulaire ${vocabularyLevel}

IMPORTANT - Informations sur le héros (À INCLURE OBLIGATOIREMENT):
${heroText}

IMPORTANT - Éléments narratifs (À INCLURE OBLIGATOIREMENT):
${valuesText}
${elementsText}

TRÈS IMPORTANT - Thème principal de l'histoire demandé par l'utilisateur:
${basePrompt}

Format requis:
1. Commence par le titre précédé de "# "
2. Écris l'histoire en plusieurs paragraphes courts
3. Assure-toi que chaque paragraphe soit bien séparé par une ligne vide
4. N'écris pas "Chapitre 1" ou des numéros de chapitres
5. Ne mentionne pas que c'est une histoire générée par IA
6. Crée une histoire cohérente qui intègre naturellement tous les éléments demandés
7. Assure-toi que le nom du héros (${heroInfo.heroName || 'notre héros'}) apparaît régulièrement dans l'histoire
8. Limite la longueur totale à ${wordCount} mots maximum
9. IMPORTANT: L'histoire DOIT être centrée sur ${heroInfo.heroName || 'le héros'}, inclure tous les éléments demandés ET suivre le thème principal: "${basePrompt}"`;
};
