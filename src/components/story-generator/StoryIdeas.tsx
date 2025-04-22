
import React from 'react';
import { Button } from '@/components/ui/button';
import { Lightbulb, RefreshCw } from 'lucide-react';
import { StoryIdea } from './storyIdeasData';
import { useLocation } from 'react-router-dom';

interface StoryIdeasProps {
  currentIdeas: StoryIdea[];
  onIdeaClick: (ideaText: string) => void;
  onRefresh: () => void;
}

const StoryIdeas: React.FC<StoryIdeasProps> = ({
  currentIdeas,
  onIdeaClick,
  onRefresh,
}) => {
  const location = useLocation();
  const state = location.state || {};
  const { heroGender, heroAge } = state;

  // Filter ideas based on gender and age if available
  const filteredIdeas = currentIdeas.filter(idea => {
    if (heroGender && idea.gender !== 'both' && idea.gender !== heroGender) {
      return false;
    }
    
    if (heroAge) {
      const age = parseInt(heroAge);
      if (idea.minAge && age < idea.minAge) return false;
      if (idea.maxAge && age > idea.maxAge) return false;
    }
    
    return true;
  });

  return (
    <div className="mt-4 border-t pt-4">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-start">
          <Lightbulb className="h-4 w-4 text-amber-500 mt-0.5 mr-2" />
          <span className="text-sm text-gray-600">Idées d'inspiration</span>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onRefresh}
          className="text-gray-500 hover:text-gray-700"
        >
          <RefreshCw className="h-4 w-4 mr-1" />
          Autres idées
        </Button>
      </div>
      <div className="mt-2 space-y-2">
        {filteredIdeas.length > 0 ? (
          filteredIdeas.map((idea, index) => (
            <Button 
              key={index}
              variant="outline" 
              size="sm" 
              className="mr-2 text-xs"
              onClick={() => onIdeaClick(idea.text)}
            >
              {idea.label}
            </Button>
          ))
        ) : (
          <p className="text-sm text-gray-500">
            Aucune idée ne correspond aux critères actuels. Essayez de rafraîchir pour voir d'autres suggestions.
          </p>
        )}
      </div>
    </div>
  );
};

export default StoryIdeas;

