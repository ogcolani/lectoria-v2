
import React from 'react';
import StoryHero from '@/components/StoryHero';
import { Sparkles } from 'lucide-react';
import { ValueItem } from './ValuesSection';
import { StoryElement } from './ElementsSection';

interface StoryPreviewSidebarProps {
  values: string[];
  elements: string[];
  availableValues: ValueItem[];
  storyElements: StoryElement[];
  heroGender?: 'garçon' | 'fille';
  hasGlasses?: boolean;
}

const StoryPreviewSidebar: React.FC<StoryPreviewSidebarProps> = ({
  values,
  elements,
  availableValues,
  storyElements,
  heroGender = 'garçon',
  hasGlasses = false
}) => {
  // Get custom value label from ID
  const getCustomLabel = (id: string) => {
    if (id.startsWith('custom-')) {
      return id.substring(7).split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
    }
    return '';
  };

  return (
    <div className="lg:col-span-1 flex flex-col items-center justify-start bg-purple-100 rounded-2xl p-6 order-2 lg:order-1">
      <div className="mb-4 text-center">
        <h3 className="text-xl font-bold mb-2">Ton aventure</h3>
        <p className="text-sm text-gray-600">Voici ce que tu as choisi pour ton histoire !</p>
      </div>
      <div className="w-full max-w-[220px]">
        <StoryHero gender={heroGender} hasGlasses={hasGlasses} />
      </div>
      <div className="mt-6 p-4 bg-white rounded-xl shadow-sm w-full">
        <h4 className="font-bold text-lg mb-3">Éléments de ton histoire</h4>
        
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Valeurs choisies :</p>
          {values.length > 0 ? (
            <p className="text-sm text-gray-600 pl-3 mb-2">
              {values.map(id => {
                if (id.startsWith('custom-')) {
                  return getCustomLabel(id);
                }
                const value = availableValues.find(v => v.id === id);
                return value?.label;
              }).filter(Boolean).join(", ")}
            </p>
          ) : (
            <p className="text-sm text-gray-500 pl-3">Aucune valeur sélectionnée</p>
          )}
        </div>
        
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Éléments d'histoire :</p>
          {elements.length > 0 ? (
            <p className="text-sm text-gray-600 pl-3">
              {elements.map(id => {
                if (id.startsWith('custom-')) {
                  return getCustomLabel(id);
                }
                const element = storyElements.find(e => e.id === id);
                return element?.label;
              }).filter(Boolean).join(", ")}
            </p>
          ) : (
            <p className="text-sm text-gray-500 pl-3">Aucun élément sélectionné</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryPreviewSidebar;
