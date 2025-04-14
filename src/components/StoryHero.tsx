
import React from 'react';

interface StoryHeroProps {
  gender?: 'garçon' | 'fille';
}

const StoryHero: React.FC<StoryHeroProps> = ({ gender = 'garçon' }) => {
  // Default to boy if no gender is selected
  const heroImage = gender === 'fille' 
    ? "/lovable-uploads/c39cb5d5-3715-4928-a188-d8c36abcf531.png" 
    : "/lovable-uploads/42d2ab14-7e86-4008-9f16-3a830a09c095.png";
  
  const altText = gender === 'fille' ? "Héroïne de l'histoire" : "Héros de l'histoire";

  return (
    <div className="w-full relative">
      <div className="mx-auto rounded-2xl overflow-hidden">
        <img 
          src={heroImage} 
          alt={altText} 
          className="w-full object-cover" 
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-100 to-transparent h-1/4 rounded-b-2xl"></div>
    </div>
  );
};

export default StoryHero;
