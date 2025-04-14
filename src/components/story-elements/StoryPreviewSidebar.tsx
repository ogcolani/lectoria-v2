import React from 'react';
import StoryHero from '@/components/StoryHero';
import CharacterTraitBadge from '@/components/ui/character-trait-badge';
import { ValueItem } from './ValuesSection';
import { StoryElement } from './ElementsSection';
import { Sparkles } from 'lucide-react';

interface StoryPreviewSidebarProps {
  values: string[];
  elements: string[];
  availableValues: ValueItem[];
  storyElements: StoryElement[];
}

const StoryPreviewSidebar: React.FC<StoryPreviewSidebarProps> = ({
  values,
  elements,
  availableValues,
  storyElements
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
        <StoryHero />
      </div>
      <div className="mt-6 p-4 bg-white rounded-xl shadow-sm w-full">
        <h4 className="font-bold text-lg mb-3">Éléments de ton histoire</h4>
        
        {values.length > 0 ? (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Valeurs choisies :</p>
            <div className="flex flex-wrap gap-2">
              {values.map(id => {
                if (id.startsWith('custom-')) {
                  return (
                    <CharacterTraitBadge key={id} trait={getCustomLabel(id)} />
                  );
                }
                
                const value = availableValues.find(v => v.id === id);
                return value ? (
                  <div key={id} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium flex items-center gap-1">
                    {value.icon}
                    {value.label}
                  </div>
                ) : null;
              })}
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500 mb-3">Choisis des valeurs pour ton histoire...</p>
        )}
        
        {elements.length > 0 ? (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Éléments d'histoire :</p>
            <div className="flex flex-wrap gap-2">
              {elements.map(id => {
                if (id.startsWith('custom-')) {
                  return (
                    <div key={id} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      {getCustomLabel(id)}
                    </div>
                  );
                }
                
                const element = storyElements.find(e => e.id === id);
                return element ? (
                  <div key={id} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium flex items-center gap-1">
                    {element.icon}
                    {element.label}
                  </div>
                ) : null;
              })}
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500">Choisis des éléments pour ton histoire...</p>
        )}
      </div>
    </div>
  );
};

export default StoryPreviewSidebar;
