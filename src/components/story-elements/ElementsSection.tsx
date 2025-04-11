
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Wand2, Heart, Zap, Star, Sparkles, Lightbulb, Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export interface StoryElement {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface ElementsSectionProps {
  elements: string[];
  onElementsChange: (elements: string[]) => void;
}

const ElementsSection: React.FC<ElementsSectionProps> = ({ elements, onElementsChange }) => {
  const [customElement, setCustomElement] = useState('');
  const { toast } = useToast();

  const storyElements: StoryElement[] = [
    { id: 'magicObject', label: 'Un objet magique', icon: <Wand2 className="h-5 w-5 text-purple-600" /> },
    { id: 'friend', label: 'Un ami fidèle', icon: <Heart className="h-5 w-5 text-purple-600" /> },
    { id: 'villain', label: 'Un méchant à affronter', icon: <Zap className="h-5 w-5 text-purple-600" /> },
    { id: 'challenge', label: 'Une épreuve difficile', icon: <Star className="h-5 w-5 text-purple-600" /> },
    { id: 'surprise', label: 'Un rebondissement surprise', icon: <Sparkles className="h-5 w-5 text-purple-600" /> },
    { id: 'lesson', label: 'Une leçon à apprendre', icon: <Lightbulb className="h-5 w-5 text-purple-600" /> }
  ];

  const handleElementToggle = (id: string) => {
    onElementsChange(current => {
      // Limit to 3 selections
      if (current.includes(id)) {
        return current.filter(element => element !== id);
      } else {
        if (current.length >= 3) {
          toast({
            title: "Maximum 3 éléments",
            description: "Tu ne peux choisir que 3 éléments pour ton histoire.",
            variant: "destructive"
          });
          return current;
        }
        return [...current, id];
      }
    });
  };

  const addCustomElement = () => {
    if (!customElement.trim()) return;
    
    // Create a custom ID
    const customId = `custom-${customElement.trim().toLowerCase().replace(/\s+/g, '-')}`;
    
    if (elements.length >= 3) {
      toast({
        title: "Maximum 3 éléments",
        description: "Tu ne peux choisir que 3 éléments pour ton histoire.",
        variant: "destructive"
      });
      return;
    }
    
    if (!elements.includes(customId)) {
      onElementsChange([...elements, customId]);
      setCustomElement('');
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Choisis jusqu'à 3 éléments d'histoire</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {storyElements.map((element) => (
          <Card 
            key={element.id}
            className={`cursor-pointer hover:shadow-md transition-all p-4 ${elements.includes(element.id) ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}
            onClick={() => handleElementToggle(element.id)}
          >
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <Checkbox 
                  id={`element-${element.id}`} 
                  checked={elements.includes(element.id)}
                  onCheckedChange={() => handleElementToggle(element.id)}
                />
              </div>
              <div className="flex items-center gap-2">
                {element.icon}
                <Label htmlFor={`element-${element.id}`} className="cursor-pointer">
                  {element.label}
                </Label>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="mt-4">
        <Label htmlFor="custom-element" className="mb-2 block text-sm font-medium">
          Ou ajoute ton propre élément d'histoire :
        </Label>
        <div className="flex gap-2">
          <Input 
            id="custom-element"
            placeholder="Ex: Un trésor caché, Une porte secrète..."
            value={customElement}
            onChange={(e) => setCustomElement(e.target.value)}
            className="flex-1"
          />
          <Button 
            onClick={addCustomElement}
            variant="outline"
            className="gap-1"
          >
            <Plus className="h-4 w-4" /> Ajouter
          </Button>
        </div>
      </div>
      
      <p className="text-sm text-gray-500 mt-2">Ces éléments rendront ton histoire plus intéressante.</p>
    </div>
  );
};

export default ElementsSection;
