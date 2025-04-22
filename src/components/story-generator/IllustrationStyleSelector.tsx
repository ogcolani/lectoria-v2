
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { IllustrationStyle } from '@/services/illustrationService';

interface StyleOption {
  id: IllustrationStyle;
  label: string;
  description: string;
}

interface IllustrationStyleSelectorProps {
  selectedStyle: IllustrationStyle;
  onStyleChange: (style: IllustrationStyle) => void;
}

const illustrationStyles: StyleOption[] = [
  { 
    id: 'storybook-cute', 
    label: 'Album Enfantin',
    description: 'Style doux et coloré, parfait pour les jeunes enfants' 
  },
  { 
    id: 'fantasy-vibrant', 
    label: 'Fantaisie Vibrante',
    description: 'Couleurs vives et détails magiques pour les histoires fantastiques' 
  },
  { 
    id: 'comic-style', 
    label: 'Bande Dessinée',
    description: 'Style BD avec traits nets et couleurs contrastées' 
  },
  { 
    id: 'realistic', 
    label: 'Semi-Réaliste',
    description: 'Plus de détails et de textures, pour un rendu plus mature' 
  }
];

const IllustrationStyleSelector: React.FC<IllustrationStyleSelectorProps> = ({
  selectedStyle,
  onStyleChange
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {illustrationStyles.map((style) => (
        <Card 
          key={style.id}
          className={`cursor-pointer transition border-2 hover:border-purple-300 ${
            selectedStyle === style.id ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
          }`}
          onClick={() => onStyleChange(style.id)}
        >
          <CardContent className="p-4">
            <div className="font-medium">{style.label}</div>
            <p className="text-xs text-gray-500 mt-1">{style.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default IllustrationStyleSelector;
