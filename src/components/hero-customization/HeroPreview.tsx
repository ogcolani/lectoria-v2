
import React from 'react';
import StoryHero from '@/components/StoryHero';
import CharacterTraitBadge from '@/components/ui/character-trait-badge';
import { Glasses } from 'lucide-react';
import { IllustrationStyle } from './IllustrationStyleSelector';

interface HeroPreviewProps {
  heroName: string;
  heroDescription: string;
  heroAge: string;
  heroGender?: 'garçon' | 'fille';
  hasGlasses?: boolean;
  traits: string[];
  illustrationStyle?: IllustrationStyle;
}

const HeroPreview: React.FC<HeroPreviewProps> = ({
  heroName,
  heroDescription,
  heroAge,
  heroGender,
  hasGlasses,
  traits,
  illustrationStyle = 'storybook'
}) => {
  return (
    <div className="lg:col-span-1 flex flex-col items-center justify-start bg-purple-100 rounded-2xl p-6 order-2 lg:order-1">
      <div className="mb-4 text-center">
        <h3 className="text-xl font-bold mb-2">Aperçu du personnage</h3>
        <p className="text-sm text-gray-600">C'est à quoi ton héros va ressembler!</p>
      </div>
      <div className="w-full max-w-[220px]">
        <StoryHero 
          gender={heroGender} 
          hasGlasses={hasGlasses}
          illustrationStyle={illustrationStyle}
        />
      </div>
      <div className="mt-6 p-4 bg-white rounded-xl shadow-sm w-full">
        <h4 className="font-bold text-lg mb-2">{heroName || 'Ton héros'}</h4>
        <p className="text-sm text-gray-600">
          {heroDescription || 'Décris ton héros et ses caractéristiques spéciales...'}
        </p>
        {heroAge && (
          <p className="mt-2 text-sm font-medium">Âge: {heroAge} ans</p>
        )}
        {heroGender && (
          <p className="mt-2 text-sm font-medium">
            Genre: {heroGender === 'garçon' ? 'Garçon' : 'Fille'}
          </p>
        )}
        {hasGlasses && (
          <p className="mt-2 text-sm font-medium flex items-center gap-1">
            <Glasses className="h-4 w-4" />
            Porte des lunettes
          </p>
        )}
        {traits.length > 0 && (
          <div className="mt-2 flex flex-wrap">
            {traits.map((trait, index) => (
              <CharacterTraitBadge key={index} trait={trait} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroPreview;
