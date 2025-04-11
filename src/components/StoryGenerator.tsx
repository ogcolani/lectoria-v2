
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { SparklesIcon, RefreshCwIcon } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

interface StoryGeneratorProps {
  prompt: string;
  pageCount: number;
  isGenerating: boolean;
  onPromptChange: (value: string) => void;
  onPageCountChange: (value: number) => void;
  onGenerate: () => void;
}

const StoryGenerator: React.FC<StoryGeneratorProps> = ({
  prompt,
  pageCount,
  isGenerating,
  onPromptChange,
  onPageCountChange,
  onGenerate,
}) => {
  return (
    <div className="flex flex-col bg-purple-100 rounded-2xl p-6">
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">Personnalisation</h3>
        <p className="text-sm text-gray-600 mb-4">
          Adapte l'histoire aux besoins de ton enfant pour une expérience de lecture optimale.
        </p>
        
        <div className="space-y-6">
          <div>
            <Label htmlFor="pageCount" className="text-base font-medium">
              Nombre de pages: {pageCount}
            </Label>
            <Slider
              id="pageCount"
              min={24}
              max={60}
              step={5}
              value={[pageCount]}
              onValueChange={(value) => onPageCountChange(value[0])}
              className="mt-2"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>24 pages</span>
              <span>60 pages</span>
            </div>
          </div>
        </div>
      </div>
      
      <Card className="mb-4">
        <CardContent className="p-4">
          <h4 className="font-bold mb-2">Instructions pour l'IA</h4>
          <Textarea 
            placeholder="Ajoute des détails spécifiques pour ton histoire..."
            className="min-h-32 mb-3"
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
          />
          <Button 
            onClick={onGenerate} 
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            {isGenerating ? (
              <>
                <RefreshCwIcon className="mr-2 h-4 w-4 animate-spin" />
                Génération en cours...
              </>
            ) : (
              <>
                <SparklesIcon className="mr-2 h-4 w-4" />
                Générer mon histoire
              </>
            )}
          </Button>
        </CardContent>
      </Card>
      
      <div className="mt-auto">
        <p className="text-xs text-gray-500 mb-4">
          Note: L'IA Mistral utilise les informations que tu as fournies pour créer une histoire unique. Le résultat peut varier et être amélioré en ajoutant plus de détails dans tes instructions.
        </p>
      </div>
    </div>
  );
};

export default StoryGenerator;
