
import React from 'react';

const StoryHero: React.FC = () => {
  return (
    <div className="w-full relative">
      <div className="mx-auto rounded-2xl overflow-hidden">
        <img 
          src="/lovable-uploads/c39cb5d5-3715-4928-a188-d8c36abcf531.png" 
          alt="Personnage de l'histoire" 
          className="w-full object-cover" 
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-100 to-transparent h-1/4 rounded-b-2xl"></div>
    </div>
  );
};

export default StoryHero;
