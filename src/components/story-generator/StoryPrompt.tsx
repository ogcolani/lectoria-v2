
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Info } from 'lucide-react';

interface StoryPromptProps {
  prompt: string;
  onPromptChange: (prompt: string) => void;
  isGenerating: boolean;
  heroName?: string;
}

const StoryPrompt: React.FC<StoryPromptProps> = ({
  prompt,
  onPromptChange,
  isGenerating,
  heroName
}) => {
  return (
    <div>
      <Label htmlFor="prompt" className="text-base font-medium mb-2 block">
        Décris ton histoire
      </Label>
      <Textarea
        id="prompt"
        placeholder={heroName ? `Par exemple: Une aventure où ${heroName} découvre un monde magique...` : "Par exemple: Une histoire d'aventure dans l'espace avec un robot ami et des planètes fantastiques..."}
        className="min-h-[120px] resize-none"
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        disabled={isGenerating}
      />
      <div className="mt-2 text-xs text-gray-500 flex items-start">
        <Info className="h-3.5 w-3.5 mr-1 mt-0.5 flex-shrink-0" />
        <span>Notre IA va créer une histoire unique basée sur tes instructions et toutes les informations personnalisées des pages précédentes.</span>
      </div>
    </div>
  );
};

export default StoryPrompt;
