
import { useLectoriaStore } from '@/store/useLectoriaStore';

export const formatStoryIdea = (baseIdea: string, storeData: ReturnType<typeof useLectoriaStore.getState>) => {
  const { 
    selectedValues,
    selectedStoryElements,
    heroName,
    heroGender,
    heroAge,
    heroTrait
  } = storeData;
  
  let formattedIdea = baseIdea;
  
  if (selectedValues && selectedValues.length > 0) {
    formattedIdea += "\n\nL'histoire met en avant les valeurs suivantes : " + selectedValues.join(", ");
  }
  
  if (selectedStoryElements && selectedStoryElements.length > 0) {
    formattedIdea += "\n\nElements à inclure dans l'histoire : " + selectedStoryElements.join(", ");
  }
  
  // Add hero information if available
  const heroInfo = [];
  if (heroName) heroInfo.push(`Le personnage principal s'appelle ${heroName}.`);
  if (heroGender) heroInfo.push(`C'est un/une ${heroGender}.`);
  if (heroAge) heroInfo.push(`Il/Elle a ${heroAge} ans.`);
  if (heroTrait) heroInfo.push(`Ses traits de caractère sont: ${heroTrait}.`);
  
  if (heroInfo.length > 0) {
    formattedIdea += "\n\nInformations sur le héros : " + heroInfo.join(" ");
  }
  
  return formattedIdea;
};
