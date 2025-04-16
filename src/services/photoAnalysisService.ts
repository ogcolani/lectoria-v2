
import { pipeline } from '@huggingface/transformers';
import { env } from '@huggingface/transformers';

// Configure transformers.js to use browser cache
env.useBrowserCache = true;
env.allowLocalModels = false;

// Interface pour les résultats d'analyse
export interface PhotoAnalysisResult {
  hasGlasses: boolean;
  gender: 'garçon' | 'fille';
}

export const analyzePhoto = async (imageUrl: string): Promise<PhotoAnalysisResult> => {
  try {
    console.log('Démarrage de l\'analyse de la photo...');
    
    // Initialiser le pipeline de détection d'objets
    const detector = await pipeline('object-detection', 'Xenova/detr-resnet-50', {
      device: 'webgpu',
    });

    // Analyser l'image
    const results = await detector(imageUrl);
    console.log('Résultats de l\'analyse:', results);

    // Chercher les lunettes et le genre dans les résultats
    const hasGlasses = results.some((result: any) => 
      result.label.toLowerCase().includes('glasses') || 
      result.label.toLowerCase().includes('eyeglasses')
    );

    // Tentative de détection du genre (simplifiée)
    // Dans une application réelle, ceci pourrait utiliser un modèle plus spécifique
    const isPerson = results.some((result: any) => 
      result.label.toLowerCase() === 'person' || 
      result.label.toLowerCase() === 'human'
    );

    // Par défaut on met garçon, l'utilisateur pourra toujours modifier manuellement
    // En pratique, on utiliserait un modèle plus précis pour cette détection
    const gender = isPerson ? 'garçon' : 'garçon';

    return {
      hasGlasses,
      gender
    };
  } catch (error) {
    console.error('Erreur lors de l\'analyse de la photo:', error);
    // En cas d'erreur, retourner des valeurs par défaut
    return {
      hasGlasses: false,
      gender: 'garçon'
    };
  }
};
