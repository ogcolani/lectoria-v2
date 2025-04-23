
import React, { useState, useRef, useEffect } from 'react';
import Character3D from './3d/Character3D';
import { useToast } from '@/components/ui/use-toast';
import { IllustrationStyle } from '@/services/illustrationService';
import CartoonCharacter from './CartoonCharacter';

interface StoryHeroProps {
  gender?: 'garçon' | 'fille';
  hasGlasses?: boolean;
  use3D?: boolean;
  illustrationStyle?: IllustrationStyle;
}

const StoryHero: React.FC<StoryHeroProps> = ({ 
  gender = 'garçon', 
  hasGlasses = false,
  use3D = true,
  illustrationStyle = 'storybook'
}) => {
  // Toast pour notifier des erreurs éventuelles
  const { toast } = useToast();
  
  // État pour suivre si on doit utiliser l'image 2D au lieu du 3D
  const [fallbackTo2D, setFallbackTo2D] = useState(false);
  
  // Référence pour éviter de montrer plusieurs toasts
  const hasShownErrorToast = useRef(false);
  
  // Images 2D de secours (upload de l'image fournie pour 'garçon')
  const heroImage = gender === 'fille' 
    ? "/lovable-uploads/c39cb5d5-3715-4928-a188-d8c36abcf531.png" // Garder l'image de fille existante 
    : "/lovable-uploads/1bf9c8d5-7083-47c4-ba3f-8b73bd96e07c.png"; // Utiliser l'image téléchargée
  
  const altText = gender === 'fille' ? "Héroïne de l'histoire" : "Héros de l'histoire";
  
  // Gérer les erreurs potentielles du rendu 3D
  const handleRenderError = () => {
    if (!fallbackTo2D && !hasShownErrorToast.current) { 
      console.error("Erreur lors du rendu 3D, utilisation de l'image 2D à la place");
      toast({
        title: "Problème d'affichage 3D",
        description: "Nous utilisons une image 2D en remplacement.",
        variant: "destructive",
      });
      setFallbackTo2D(true);
      hasShownErrorToast.current = true;
    }
  };

  // Détermine le type de rendu à utiliser en fonction du style et des propriétés
  const renderCharacter = () => {
    if (illustrationStyle === 'comics') {
      return <CartoonCharacter gender={gender} hasGlasses={hasGlasses} />;
    } else if (illustrationStyle === 'fantasy') {
      // Pour le style fantasy, on utilise une image statique pour l'exemple
      return (
        <div className="w-full h-full aspect-square bg-[#362C3E] relative rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[#362C3E] to-[#715E92] opacity-80"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <img 
              src="/lovable-uploads/42d2ab14-7e86-4008-9f16-3a830a09c095.png"
              alt={altText}
              className="w-3/4 max-h-full object-contain mix-blend-lighten"
            />
            <div className="absolute bottom-0 left-0 right-0 flex justify-center p-3 bg-gradient-to-t from-[#362C3E] to-transparent">
              <span className="text-xs text-purple-300 font-medium">Style Fantasy Semi-Réaliste</span>
            </div>
          </div>
        </div>
      );
    } else {
      // Pour le style storybook (default), on utilise le rendu 3D ou fallback
      if (use3D && !fallbackTo2D) {
        return (
          <div className="aspect-square">
            <Character3D 
              gender={gender} 
              hasGlasses={hasGlasses} 
              height="100%" 
              width="100%" 
            />
          </div>
        );
      } else {
        return (
          <img 
            src={heroImage} 
            alt={altText} 
            className="w-full object-cover" 
            onError={handleRenderError}
          />
        );
      }
    }
  };

  return (
    <div className="w-full relative">
      <div className="mx-auto rounded-2xl overflow-hidden">
        {renderCharacter()}
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-100 to-transparent h-1/4 rounded-b-2xl"></div>
    </div>
  );
};

export default StoryHero;
