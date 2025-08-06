// Service pour gérer le mode TEST et les APIs mock
import { useLectoriaStore } from '@/store/useLectoriaStore';

// Histoire mock pour le mode TEST
const MOCK_STORY = `## Page 1
Il était une fois un petit dragon nommé NicoTest qui vivait dans un royaume magique.

## Page 2  
NicoTest était âgé de 7 ans et adorait explorer les forêts enchantées.

## Page 3
Un jour, il découvrit un trésor caché derrière une cascade scintillante.

## Page 4
Grâce à sa passion pour les dragons, il comprit que le trésor était magique.

## Page 5
NicoTest devint le gardien du trésor et protégea le royaume pour toujours.

**FIN**`;

const MOCK_ILLUSTRATION_URL = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop';

// Types pour les paramètres d'histoire
interface StoryParams {
  heroName: string;
  heroAge: string;
  heroTrait: string;
  prompt: string;
  pageCount: number;
}

// Vérifier si on est en mode TEST
export const isTestMode = (): boolean => {
  return false; // Mode demo supprimé
};

// Hash email et IP pour la sécurité en staging
export const hashSensitiveData = async (data: string): Promise<string> => {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

// API mock pour la génération d'histoire
export const generateTestStory = async (params: StoryParams): Promise<{
  story: string;
  illustrationUrl: string;
}> => {
  // Simuler un délai d'API
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const customizedStory = MOCK_STORY
    .replace(/NicoTest/g, params.heroName || 'NicoTest')
    .replace(/7 ans/g, `${params.heroAge || '7'} ans`)
    .replace(/dragons/g, params.heroTrait || 'dragons');
    
  return {
    story: customizedStory,
    illustrationUrl: MOCK_ILLUSTRATION_URL
  };
};

// Wrapper pour les appels API conditionnels
export const conditionalApiCall = async <T>(
  testModeHandler: () => Promise<T>,
  productionHandler: () => Promise<T>
): Promise<T> => {
  if (isTestMode()) {
    console.log('🧪 MODE TEST: Utilisation des données mock');
    return await testModeHandler();
  } else {
    return await productionHandler();
  }
};

// Logs sécurisés pour le staging
export const secureLog = async (message: string, data?: any) => {
  const isDevelopment = import.meta.env.DEV || import.meta.env.VITE_ENV === 'staging';
  
  if (isDevelopment) {
    const timestamp = new Date().toISOString();
    const logData = data ? await hashSensitiveData(JSON.stringify(data)) : '';
    console.log(`[DEV-${timestamp}] ${message}`, logData ? `(hash: ${logData.substring(0, 8)}...)` : '');
  } else {
    console.log(message, data);
  }
};