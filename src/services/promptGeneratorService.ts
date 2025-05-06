
interface PromptGeneratorServiceParams {
  heroName?: string;
  heroAge?: string;
  heroGender?: string;
  heroTrait?: string;
  heroDescription?: string;
  hasGlasses?: boolean;
  userPrompt: string;
  childAge: number;
  pageCount: number;
  values: string[];
  elements: string[];
  illustrationStyle: string;
}

export const generateOptimizedPrompt = async ({
  heroName,
  heroAge,
  heroGender,
  heroTrait,
  heroDescription,
  hasGlasses,
  userPrompt,
  childAge,
  pageCount,
  values,
  elements,
  illustrationStyle
}: PromptGeneratorServiceParams) => {
  // Note: cet endpoint sera remplacé par votre API clé réelle
  const apiEndpoint = 'YOUR_API_KEY_PLACEHOLDER'; // À remplacer avec la clé fournie
  
  try {
    console.log("Préparation de la requête vers l'IA de génération de prompts");
    
    // Construction du contexte pour l'IA génératrice de prompts
    const promptContext = {
      task: "Générer un prompt détaillé pour créer une histoire pour enfant",
      hero: {
        name: heroName || "personnage principal",
        age: heroAge || "âge non spécifié",
        gender: heroGender || "non spécifié",
        trait: heroTrait || "traits non spécifiés",
        description: heroDescription || "",
        hasGlasses: hasGlasses || false
      },
      story: {
        userIdea: userPrompt || "Thème non spécifié",
        targetAge: childAge,
        pageCount: pageCount,
        values: values.length > 0 ? values : ["Aucune valeur spécifiée"],
        elements: elements.length > 0 ? elements : ["Aucun élément spécifié"]
      },
      visual: {
        illustrationStyle: illustrationStyle || "storybook-cute"
      }
    };

    // Note: Cette fonction est un placeholder qui sera remplacée par l'appel API réel
    // quand vous me fournirez la clé API
    console.log("Contexte pour la génération de prompt:", promptContext);
    
    // En attendant l'intégration de l'API réelle, nous simulons la réponse
    // Cette partie sera remplacée par un appel fetch vers l'API choisie
    const simulatedResponse = `
# Instructions pour la génération d'une histoire pour enfant

## Personnage principal
- Nom: ${heroName || "Personnage sans nom"}
- Âge: ${heroAge || "Non spécifié"}
- Genre: ${heroGender || "Non spécifié"}
- Traits de caractère: ${heroTrait || "Non spécifiés"}
- Description physique: ${heroDescription || "Non spécifiée"}
- Porte des lunettes: ${hasGlasses ? "Oui" : "Non"}

## Paramètres de l'histoire
- Idée principale: ${userPrompt || "Une aventure passionnante"}
- Âge cible: ${childAge} ans
- Longueur: ${pageCount} pages
- Valeurs à transmettre: ${values.join(", ") || "Aucune spécifiée"}
- Éléments à inclure: ${elements.join(", ") || "Aucun spécifié"}

## Style visuel
- Style d'illustration: ${illustrationStyle}

## Instructions pour Mistral
- Créer une histoire captivante adaptée à un enfant de ${childAge} ans
- L'histoire doit comporter ${pageCount} pages bien structurées
- Le personnage principal nommé ${heroName || "le héros"} doit être au centre de l'histoire
- Inclure les éléments suivants dans l'intrigue: ${elements.join(", ")}
- Transmettre ces valeurs importantes: ${values.join(", ")}
- Adapter le vocabulaire et la complexité narrative à un enfant de ${childAge} ans
- Format: texte structuré en paragraphes clairs avec un titre attrayant

## Instructions pour les illustrations (Stability AI)
- Générer ${pageCount} illustrations au style ${illustrationStyle}
- Chaque illustration doit correspondre à un moment clé de l'histoire
- Le personnage principal doit apparaître régulièrement et ressembler à la description
- Les couleurs doivent être vives et attrayantes pour les enfants
- Éviter les scènes effrayantes ou trop complexes
`;

    // Pour l'instant nous retournons une version simulée,
    // à remplacer par la réponse de l'API
    return simulatedResponse;
    
  } catch (error) {
    console.error("Erreur lors de la génération du prompt optimisé:", error);
    throw new Error("Impossible de générer le prompt optimisé. Veuillez réessayer.");
  }
};
