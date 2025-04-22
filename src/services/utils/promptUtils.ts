
interface HeroInfo {
  heroName?: string;
  heroGender?: string;
  heroAge?: string;
  heroTrait?: string;
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

  const valuesText = values.length > 0 ? `Les valeurs importantes dans cette histoire sont: ${values.join(', ')}.` : '';
  const elementsText = elements.length > 0 ? `L'histoire doit inclure les éléments suivants: ${elements.join(', ')}.` : '';
  
  const heroInfoArray = [];
  if (heroInfo.heroName) heroInfoArray.push(`Le personnage principal s'appelle ${heroInfo.heroName}.`);
  if (heroInfo.heroGender) heroInfoArray.push(`C'est un/une ${heroInfo.heroGender}.`);
  if (heroInfo.heroAge) heroInfoArray.push(`Il/Elle a ${heroInfo.heroAge} ans.`);
  if (heroInfo.heroTrait) heroInfoArray.push(`Ses traits de caractère sont: ${heroInfo.heroTrait}.`);
  const heroText = heroInfoArray.length > 0 ? heroInfoArray.join(' ') : '';

  return `
    Génère une histoire pour enfant de ${childAge} ans, qui fera environ ${pageCount} pages.
    
    Instructions spécifiques:
    - Utilise un vocabulaire ${vocabularyLevel}
    - L'histoire doit faire environ ${wordCount} mots au total
    - Crée un titre captivant
    - Inclus une introduction, un développement avec des rebondissements, et une conclusion
    ${valuesText}
    ${elementsText}
    ${heroText}
    
    Instructions supplémentaires de l'utilisateur:
    ${basePrompt}
    
    Format de retour:
    - Sépare clairement le titre avec un # au début
    - Utilise des paragraphes courts et aérés
    - Ne mentionne pas dans l'histoire qu'elle est générée par IA
  `;
};
