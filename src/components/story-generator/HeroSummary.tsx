
import React from 'react';
import { Info } from 'lucide-react';
import { useLectoriaStore } from '@/store/useLectoriaStore';

const HeroSummary: React.FC = () => {
  // Récupérer les données du store
  const {
    heroName,
    heroGender,
    heroAge,
    heroTrait,
    selectedValues,
    selectedStoryElements
  } = useLectoriaStore();
  
  // Créer un résumé des informations du héros pour afficher à l'utilisateur
  const heroSummary = React.useMemo(() => {
    const summary = [];
    if (heroName) summary.push(`Personnage: ${heroName}`);
    if (heroGender) summary.push(`Genre: ${heroGender}`);
    if (heroAge) summary.push(`Âge: ${heroAge} ans`);
    if (heroTrait) summary.push(`Traits: ${heroTrait}`);
    return summary;
  }, [heroName, heroGender, heroAge, heroTrait]);
  
  // Créer un résumé des éléments d'histoire
  const elementsSummary = React.useMemo(() => {
    const summary = [];
    if (selectedValues && selectedValues.length > 0) summary.push(`Valeurs: ${selectedValues.join(', ')}`);
    if (selectedStoryElements && selectedStoryElements.length > 0) summary.push(`Éléments: ${selectedStoryElements.join(', ')}`);
    return summary;
  }, [selectedValues, selectedStoryElements]);
  
  // If no data to display, return null
  if (heroSummary.length === 0 && elementsSummary.length === 0) {
    return null;
  }

  return (
    <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
      <h3 className="text-sm font-semibold mb-2 text-purple-800 flex items-center">
        <Info className="w-4 h-4 mr-1" />
        Informations personnalisées incluses dans ton histoire:
      </h3>
      
      {heroSummary.length > 0 && (
        <div className="mb-2">
          <h4 className="text-xs font-medium text-purple-700">Héros</h4>
          <ul className="text-xs text-gray-700 ml-4 list-disc">
            {heroSummary.map((item, index) => (
              <li key={`hero-${index}`}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      
      {elementsSummary.length > 0 && (
        <div>
          <h4 className="text-xs font-medium text-purple-700">Éléments d'histoire</h4>
          <ul className="text-xs text-gray-700 ml-4 list-disc">
            {elementsSummary.map((item, index) => (
              <li key={`element-${index}`}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      
      <p className="text-xs text-gray-600 mt-2 italic">Ces informations seront automatiquement intégrées dans ton histoire.</p>
    </div>
  );
};

export default HeroSummary;
