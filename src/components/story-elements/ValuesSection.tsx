
import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export interface ValueItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface ValuesSectionProps {
  selectedValues: string[];
  setSelectedValues: React.Dispatch<React.SetStateAction<string[]>>;
}

const ValuesSection: React.FC<ValuesSectionProps> = ({ 
  selectedValues, 
  setSelectedValues 
}) => {
  const [customValue, setCustomValue] = useState('');
  const [valueOptions, setValueOptions] = useState([
    "Courage", "Amitié", "Persévérance", "Honnêteté", 
    "Respect", "Créativité", "Compassion", "Responsabilité"
  ]);

  const addCustomValue = () => {
    if (customValue && !valueOptions.includes(customValue)) {
      // Update the options array
      setValueOptions([...valueOptions, customValue]);
      
      // Select the new value
      setSelectedValues([...selectedValues, customValue]);
      
      // Reset the input
      setCustomValue('');
    }
  };

  const handleValueChange = (value: string) => {
    if (selectedValues.includes(value)) {
      // Remove if already selected
      setSelectedValues(selectedValues.filter(v => v !== value));
    } else {
      // Add if not already selected (max 3)
      if (selectedValues.length < 3) {
        setSelectedValues([...selectedValues, value]);
      }
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold mb-4">Valeurs à mettre en avant</h3>
      <p className="text-sm text-gray-600 mb-4">
        Choisis jusqu'à 3 valeurs que tu souhaites transmettre à travers l'histoire
      </p>
      
      <RadioGroup className="grid grid-cols-2 gap-4">
        {valueOptions.map((value) => (
          <div 
            key={value} 
            className={`flex items-center px-4 py-2 rounded-lg border cursor-pointer transition-colors ${
              selectedValues.includes(value) 
                ? 'bg-purple-100 border-purple-500' 
                : 'bg-white border-gray-200 hover:bg-gray-50'
            }`}
            onClick={() => handleValueChange(value)}
          >
            <RadioGroupItem 
              value={value} 
              id={`value-${value}`} 
              className="mr-2"
              checked={selectedValues.includes(value)}
            />
            <FormLabel 
              htmlFor={`value-${value}`} 
              className={`cursor-pointer font-medium ${
                selectedValues.includes(value) ? 'text-purple-800' : 'text-gray-700'
              }`}
            >
              {value}
            </FormLabel>
          </div>
        ))}
      </RadioGroup>
      
      <div className="pt-4 border-t">
        <p className="text-sm font-medium mb-2">Ajouter une valeur personnalisée:</p>
        <div className="flex gap-2">
          <Input 
            placeholder="Ex: Patience, Équité..." 
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            className="flex-1"
            maxLength={20}
          />
          <Button 
            onClick={addCustomValue}
            variant="outline"
            type="button"
            disabled={!customValue || valueOptions.includes(customValue)}
          >
            <Plus className="h-4 w-4 mr-1" /> Ajouter
          </Button>
        </div>
      </div>
      
      <div className="text-sm text-gray-500 pt-2">
        {selectedValues.length > 0 ? (
          <p>Valeurs sélectionnées: {selectedValues.join(', ')}</p>
        ) : (
          <p>Aucune valeur sélectionnée. Choisis jusqu'à 3 valeurs.</p>
        )}
      </div>
    </div>
  );
};

export default ValuesSection;
