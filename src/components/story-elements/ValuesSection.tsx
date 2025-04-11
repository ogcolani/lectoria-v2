
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Heart, Zap, Star, Wand2, Lightbulb, Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export interface ValueItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface ValuesSectionProps {
  values: string[];
  onValuesChange: (values: string[]) => void;
}

const ValuesSection: React.FC<ValuesSectionProps> = ({ values, onValuesChange }) => {
  const [customValue, setCustomValue] = useState('');
  const { toast } = useToast();

  const availableValues: ValueItem[] = [
    { id: 'courage', label: 'Courage', icon: <Heart className="h-5 w-5 text-purple-600" /> },
    { id: 'perseverance', label: 'Persévérance', icon: <Zap className="h-5 w-5 text-purple-600" /> },
    { id: 'amitie', label: 'Amitié', icon: <Heart className="h-5 w-5 text-purple-600" /> },
    { id: 'curiosite', label: 'Curiosité', icon: <Lightbulb className="h-5 w-5 text-purple-600" /> },
    { id: 'respect', label: 'Respect', icon: <Star className="h-5 w-5 text-purple-600" /> },
    { id: 'creativite', label: 'Créativité', icon: <Wand2 className="h-5 w-5 text-purple-600" /> }
  ];

  const handleValueToggle = (id: string) => {
    onValuesChange(current => {
      // Limit to 3 selections
      if (current.includes(id)) {
        return current.filter(value => value !== id);
      } else {
        if (current.length >= 3) {
          toast({
            title: "Maximum 3 valeurs",
            description: "Tu ne peux choisir que 3 valeurs pour ton histoire.",
            variant: "destructive"
          });
          return current;
        }
        return [...current, id];
      }
    });
  };

  const addCustomValue = () => {
    if (!customValue.trim()) return;
    
    // Create a custom ID
    const customId = `custom-${customValue.trim().toLowerCase().replace(/\s+/g, '-')}`;
    
    if (values.length >= 3) {
      toast({
        title: "Maximum 3 valeurs",
        description: "Tu ne peux choisir que 3 valeurs pour ton histoire.",
        variant: "destructive"
      });
      return;
    }
    
    if (!values.includes(customId)) {
      onValuesChange([...values, customId]);
      setCustomValue('');
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Choisis jusqu'à 3 valeurs pour ton histoire</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {availableValues.map((value) => (
          <Card 
            key={value.id}
            className={`cursor-pointer hover:shadow-md transition-all p-4 ${values.includes(value.id) ? 'ring-2 ring-purple-500 bg-purple-50' : ''}`}
            onClick={() => handleValueToggle(value.id)}
          >
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <Checkbox 
                  id={`value-${value.id}`} 
                  checked={values.includes(value.id)}
                  onCheckedChange={() => handleValueToggle(value.id)}
                />
              </div>
              <div className="flex items-center gap-2">
                {value.icon}
                <Label htmlFor={`value-${value.id}`} className="cursor-pointer">
                  {value.label}
                </Label>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="mt-4">
        <Label htmlFor="custom-value" className="mb-2 block text-sm font-medium">
          Ou ajoute ta propre valeur personnalisée :
        </Label>
        <div className="flex gap-2">
          <Input 
            id="custom-value"
            placeholder="Ex: Honnêteté, Générosité..."
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            className="flex-1"
          />
          <Button 
            onClick={addCustomValue}
            variant="outline"
            className="gap-1"
          >
            <Plus className="h-4 w-4" /> Ajouter
          </Button>
        </div>
      </div>
      
      <p className="text-sm text-gray-500 mt-2">Ces valeurs seront mises en avant dans l'histoire.</p>
    </div>
  );
};

export default ValuesSection;
