
import { useLectoriaStore } from '@/store/useLectoriaStore';

/**
 * Vérifie si une session utilisateur est valide selon les critères suivants :
 * - Le prénom du héros existe et contient au moins 2 caractères
 * - Un aperçu d'histoire existe et contient au moins 20 caractères
 */
export function isSessionValid(state: ReturnType<typeof useLectoriaStore.getState>): boolean {
  return (
    Boolean(state.heroName) &&
    state.heroName.trim().length > 1 &&
    Boolean(state.storyPreview) &&
    state.storyPreview.trim().length > 20
  );
}
