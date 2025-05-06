
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
  try {
    console.log("Préparation de la requête vers l'API de génération de prompts");
    
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

    // Configuration du prompt à envoyer à l'API
    const apiPrompt = JSON.stringify(promptContext);
    
    // Email pour l'API (à remplacer par votre email pour l'obtention d'une clé API)
    const apiKey = "lectoria-app@example.com"; // Remplacer par votre email
    
    // Modèle à utiliser
    const model = "gpt-3.5-turbo"; // Vous pouvez changer pour gpt-4 si nécessaire
    
    // Construction de l'URL pour l'appel API
    const apiUrl = `http://195.179.229.119/gpt/api.php?prompt=${encodeURIComponent(apiPrompt)}&api_key=${encodeURIComponent(apiKey)}&model=${encodeURIComponent(model)}`;
    
    console.log("Envoi de la requête à l'API...");
    
    // Effectuer l'appel API
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
    }
    
    // Analyser la réponse
    const data = await response.json();
    console.log("Réponse de l'API reçue:", data);
    
    // Extraire le prompt optimisé
    let optimizedPrompt = "";
    
    if (data && data.content) {
      optimizedPrompt = data.content;
    } else if (data && typeof data === 'object') {
      // Essayer de trouver le contenu dans un autre format possible
      optimizedPrompt = JSON.stringify(data);
    } else {
      throw new Error("Format de réponse inattendu");
    }
    
    // Fallback en cas d'échec
    if (!optimizedPrompt) {
      console.warn("Réponse API vide ou invalide, utilisation du fallback");
      return generateFallbackPrompt({
        heroName,
        heroAge,
        heroGender,
        heroTrait,
        userPrompt,
        childAge,
        pageCount,
        values,
        elements
      });
    }
    
    return optimizedPrompt;
    
  } catch (error) {
    console.error("Erreur lors de la génération du prompt optimisé:", error);
    console.log("Utilisation du prompt de secours...");
    
    // En cas d'erreur, utiliser la fonction de fallback
    return generateFallbackPrompt({
      heroName,
      heroAge,
      heroGender,
      heroTrait,
      userPrompt,
      childAge,
      pageCount,
      values,
      elements
    });
  }
};

// Fonction de fallback pour générer un prompt si l'API échoue
const generateFallbackPrompt = ({
  heroName,
  heroAge,
  heroGender,
  heroTrait,
  userPrompt,
  childAge,
  pageCount,
  values,
  elements
}: Partial<PromptGeneratorServiceParams>) => {
  return `
# Instructions pour la génération d'une histoire pour enfant

## Personnage principal
- Nom: ${heroName || "Personnage sans nom"}
- Âge: ${heroAge || "Non spécifié"}
- Genre: ${heroGender || "Non spécifié"}
- Traits de caractère: ${heroTrait || "Non spécifiés"}

## Paramètres de l'histoire
- Idée principale: ${userPrompt || "Une aventure passionnante"}
- Âge cible: ${childAge} ans
- Longueur: ${pageCount} pages
- Valeurs à transmettre: ${values?.join(", ") || "Aucune spécifiée"}
- Éléments à inclure: ${elements?.join(", ") || "Aucun spécifié"}

## Instructions pour Mistral
- Créer une histoire captivante adaptée à un enfant de ${childAge} ans
- L'histoire doit comporter ${pageCount} pages bien structurées
- Le personnage principal nommé ${heroName || "le héros"} doit être au centre de l'histoire
- Inclure les éléments suivants dans l'intrigue: ${elements?.join(", ") || "éléments au choix"}
- Transmettre ces valeurs importantes: ${values?.join(", ") || "valeurs au choix"}
- Adapter le vocabulaire et la complexité narrative à un enfant de ${childAge} ans
`;
};
