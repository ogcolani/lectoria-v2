
import React, { useState } from 'react';
import Character3D from './3d/Character3D';
import { useToast } from '@/components/ui/use-toast';

interface StoryHeroProps {
  gender?: 'garçon' | 'fille';
  hasGlasses?: boolean;
  use3D?: boolean;
}

const StoryHero: React.FC<StoryHeroProps> = ({ 
  gender = 'garçon', 
  hasGlasses = false,
  use3D = true 
}) => {
  // Toast pour notifier des erreurs éventuelles
  const { toast } = useToast();
  
  // État pour suivre si on doit utiliser l'image 2D au lieu du 3D
  const [fallbackTo2D, setFallbackTo2D] = useState(false);
  
  // Images 2D de secours (upload de l'image fournie pour 'garçon')
  const heroImage = gender === 'fille' 
    ? "/lovable-uploads/c39cb5d5-3715-4928-a188-d8c36abcf531.png" // Garder l'image de fille existante 
    : "/lovable-uploads/1bf9c8d5-7083-47c4-ba3f-8b73bd96e07c.png"; // Utiliser l'image téléchargée
  
  const altText = gender === 'fille' ? "Héroïne de l'histoire" : "Héros de l'histoire";
  
  // Gérer les erreurs potentielles du rendu 3D
  const handleRenderError = () => {
    console.error("Erreur lors du rendu 3D, utilisation de l'image 2D à la place");
    toast({
      title: "Problème d'affichage 3D",
      description: "Nous utilisons une image 2D en remplacement.",
      variant: "destructive",
    });
    setFallbackTo2D(true);
  };

  return (
    <div className="w-full relative">
      <div className="mx-auto rounded-2xl overflow-hidden">
        {use3D && !fallbackTo2D ? (
          <div className="aspect-square">
            <Character3D 
              gender={gender} 
              hasGlasses={hasGlasses} 
              height="100%" 
              width="100%" 
            />
          </div>
        ) : (
          <img 
            src={heroImage} 
            alt={altText} 
            className="w-full object-cover" 
            onError={handleRenderError}
          />
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-100 to-transparent h-1/4 rounded-b-2xl"></div>
    </div>
  );
};

export default StoryHero;
