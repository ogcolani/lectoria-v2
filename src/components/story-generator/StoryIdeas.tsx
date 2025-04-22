
import React from 'react';
import { Button } from '@/components/ui/button';
import { Lightbulb, RefreshCw } from 'lucide-react';

interface StoryIdea {
  text: string;
  label: string;
}

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
        {currentIdeas.map((idea, index) => (
          <Button 
            key={index}
            variant="outline" 
            size="sm" 
            className="mr-2 text-xs"
            onClick={() => onIdeaClick(idea.text)}
          >
            {idea.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default StoryIdeas;
