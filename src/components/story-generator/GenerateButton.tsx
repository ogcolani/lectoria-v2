
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface GenerateButtonProps {
  onGenerate: () => void;
  isGenerating: boolean;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({
  onGenerate,
  isGenerating
}) => {
  return (
    <Button
      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
      size="lg"
      onClick={onGenerate}
      disabled={isGenerating}
      type="button"
    >
      {isGenerating ? (
        <>
          <Sparkles className="mr-2 h-4 w-4 animate-spin" />
          Génération en cours...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Générer mon histoire
        </>
      )}
    </Button>
  );
};

export default GenerateButton;
