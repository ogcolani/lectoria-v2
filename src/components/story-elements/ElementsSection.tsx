
import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface ElementsSectionProps {
  selectedElements: string[];
  setSelectedElements: React.Dispatch<React.SetStateAction<string[]>>;
}

const ElementsSection: React.FC<ElementsSectionProps> = ({ 
  selectedElements, 
  setSelectedElements 
}) => {
  const [customElement, setCustomElement] = useState('');
  const [elementOptions, setElementOptions] = useState([
    "Forêt enchantée", "Château magique", "Océan mystérieux", "Montagne sacrée", 
    "Vaisseau spatial", "Potion magique", "Carte au trésor", "Animal qui parle"
  ]);

  const addCustomElement = () => {
    if (customElement && !elementOptions.includes(customElement)) {
      // Update the options array
      setElementOptions([...elementOptions, customElement]);
      
      // Select the new element
      setSelectedElements([...selectedElements, customElement]);
      
      // Reset the input
      setCustomElement('');
    }
  };

  const handleElementChange = (element: string) => {
    if (selectedElements.includes(element)) {
      // Remove if already selected
      setSelectedElements(selectedElements.filter(e => e !== element));
    } else {
      // Add if not already selected (max 3)
      if (selectedElements.length < 3) {
        setSelectedElements([...selectedElements, element]);
      }
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold mb-4">Éléments de l'histoire</h3>
      <p className="text-sm text-gray-600 mb-4">
        Choisis jusqu'à 3 éléments que tu souhaites inclure dans ton histoire
      </p>
      
      <RadioGroup className="grid grid-cols-2 gap-4">
        {elementOptions.map((element) => (
          <div 
            key={element} 
            className={`flex items-center px-4 py-2 rounded-lg border cursor-pointer transition-colors ${
              selectedElements.includes(element) 
                ? 'bg-purple-100 border-purple-500' 
                : 'bg-white border-gray-200 hover:bg-gray-50'
            }`}
            onClick={() => handleElementChange(element)}
          >
            <RadioGroupItem 
              value={element} 
              id={`element-${element}`} 
              className="mr-2"
              checked={selectedElements.includes(element)}
            />
            <FormLabel 
              htmlFor={`element-${element}`} 
              className={`cursor-pointer font-medium ${
                selectedElements.includes(element) ? 'text-purple-800' : 'text-gray-700'
              }`}
            >
              {element}
            </FormLabel>
          </div>
        ))}
      </RadioGroup>
      
      <div className="pt-4 border-t">
        <p className="text-sm font-medium mb-2">Ajouter un élément personnalisé:</p>
        <div className="flex gap-2">
          <Input 
            placeholder="Ex: Dragon gentil, Maison volante..." 
            value={customElement}
            onChange={(e) => setCustomElement(e.target.value)}
            className="flex-1"
            maxLength={30}
          />
          <Button 
            onClick={addCustomElement}
            variant="outline"
            type="button"
            disabled={!customElement || elementOptions.includes(customElement)}
          >
            <Plus className="h-4 w-4 mr-1" /> Ajouter
          </Button>
        </div>
      </div>
      
      <div className="text-sm text-gray-500 pt-2">
        {selectedElements.length > 0 ? (
          <p>Éléments sélectionnés: {selectedElements.join(', ')}</p>
        ) : (
          <p>Aucun élément sélectionné. Choisis jusqu'à 3 éléments.</p>
        )}
      </div>
    </div>
  );
};

export default ElementsSection;
