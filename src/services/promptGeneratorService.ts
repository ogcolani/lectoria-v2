
import { generateWithMistral } from './mistralService';

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
    console.log("Génération d'un prompt optimisé avec Mistral...");
    
    // Construction du prompt pour optimiser le prompt utilisateur
    const optimizationPrompt = `
Tu es un expert en écriture d'histoires pour enfants. Ta mission est d'optimiser le prompt suivant pour créer une histoire captivante et personnalisée.

INFORMATIONS DU PERSONNAGE PRINCIPAL:
- Nom: ${heroName || "Personnage principal"}
- Âge: ${heroAge || "Non spécifié"}
- Genre: ${heroGender || "Non spécifié"}
- Traits de caractère: ${heroTrait || "Traits variés"}
- Description: ${heroDescription || "À développer"}
- Porte des lunettes: ${hasGlasses ? "Oui" : "Non"}

PARAMÈTRES DE L'HISTOIRE:
- Idée de base de l'utilisateur: "${userPrompt}"
- Âge cible: ${childAge} ans
- Nombre de pages: ${pageCount}
- Valeurs à transmettre: ${values.join(", ") || "Valeurs universelles"}
- Éléments à inclure: ${elements.join(", ") || "Éléments créatifs"}
- Style d'illustration: ${illustrationStyle}

TÂCHE:
Créé un prompt détaillé et optimisé qui permettra de générer une histoire personnalisée parfaite pour un enfant de ${childAge} ans. Le prompt doit être précis, créatif et inclure tous les éléments personnalisés.

Le prompt optimisé doit:
1. Intégrer naturellement le personnage principal avec toutes ses caractéristiques
2. Développer l'idée de base de manière créative et adaptée à l'âge
3. Inclure les valeurs et éléments de manière organique dans l'histoire
4. Spécifier le ton et le style appropriés pour l'âge cible
5. Être suffisamment détaillé pour guider la création d'une histoire de ${pageCount} pages

Réponds uniquement avec le prompt optimisé, sans explications supplémentaires.
`;

    const optimizedPrompt = await generateWithMistral({
      prompt: optimizationPrompt,
      temperature: 0.8,
      maxTokens: 2000
    });

    console.log("Prompt optimisé généré avec succès");
    return optimizedPrompt;
    
  } catch (error) {
    console.error("Erreur lors de l'optimisation du prompt avec Mistral:", error);
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
