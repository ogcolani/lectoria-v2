
import React, { useState } from 'react';
import Character3D from './3d/Character3D';

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
  // Si le rendu 3D ne fonctionne pas, on a une solution de repli avec les images 2D
  const [fallbackTo2D, setFallbackTo2D] = useState(false);
  
  // Images 2D de secours
  const heroImage = gender === 'fille' 
    ? "/lovable-uploads/c39cb5d5-3715-4928-a188-d8c36abcf531.png" 
    : "/lovable-uploads/42d2ab14-7e86-4008-9f16-3a830a09c095.png";
  
  const altText = gender === 'fille' ? "Héroïne de l'histoire" : "Héros de l'histoire";
  
  // Gérer les erreurs potentielles du rendu 3D
  const handleRenderError = () => {
    console.error("Erreur lors du rendu 3D, utilisation de l'image 2D à la place");
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
