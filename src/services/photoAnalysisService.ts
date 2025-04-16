
import { pipeline } from '@huggingface/transformers';
import { env } from '@huggingface/transformers';

// Configure transformers.js to use browser cache
env.useBrowserCache = true;

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
      quantized: false,
    });

    // Analyser l'image
    const results = await detector(imageUrl);
    console.log('Résultats de l\'analyse:', results);

    // Chercher les lunettes et le genre dans les résultats
    const hasGlasses = results.some((result: any) => 
      result.label.toLowerCase().includes('glasses') || 
      result.label.toLowerCase().includes('eyeglasses')
    );

    // Par défaut on met garçon, l'utilisateur pourra toujours modifier manuellement
    const gender = 'garçon';

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
