
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ImageIcon, Info, Sparkles } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IllustrationStyle } from '@/services/illustrationService';
import StoryIdeas from './story-generator/StoryIdeas';
import PageCountSelector from './story-generator/PageCountSelector';
import IllustrationStyleSelector from './story-generator/IllustrationStyleSelector';
import { storyIdeas } from './story-generator/storyIdeasData';

interface StoryGeneratorProps {
  prompt: string;
  pageCount: number;
  isGenerating: boolean;
  illustrationStyle?: IllustrationStyle;
  onPromptChange: (prompt: string) => void;
  onPageCountChange: (count: number) => void;
  onGenerate: () => void;
  onStyleChange?: (style: IllustrationStyle) => void;
}

const StoryGenerator: React.FC<StoryGeneratorProps> = ({
  prompt,
  pageCount,
  isGenerating,
  illustrationStyle = 'storybook-cute',
  onPromptChange,
  onPageCountChange,
  onGenerate,
  onStyleChange = () => {}
}) => {
  const [currentIdeasIndex, setCurrentIdeasIndex] = useState(0);
  const location = useLocation();
  
  const { storyValues = [], storyElements = [] } = location.state || {};
  
  const formatStoryIdea = (baseIdea: string) => {
    let formattedIdea = baseIdea;
    
    if (storyValues && storyValues.length > 0) {
      formattedIdea += "\n\nL'histoire met en avant les valeurs suivantes : " + storyValues.join(", ");
    }
    
    if (storyElements && storyElements.length > 0) {
      formattedIdea += "\n\nElements à inclure dans l'histoire : " + storyElements.join(", ");
    }
    
    return formattedIdea;
  };

  const getNextIdeas = () => {
    setCurrentIdeasIndex((prevIndex) => (prevIndex + 3) % storyIdeas.length);
  };

  const getCurrentIdeas = () => {
    const ideas = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIdeasIndex + i) % storyIdeas.length;
      ideas.push(storyIdeas[index]);
    }
    return ideas;
  };

  const handleIdeaClick = (ideaText: string) => {
    onPromptChange(formatStoryIdea(ideaText));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Générateur d'histoire</h2>
      
      <Tabs defaultValue="prompt" className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="prompt">Histoire</TabsTrigger>
          <TabsTrigger value="style">Style visuel</TabsTrigger>
        </TabsList>
        
        <TabsContent value="prompt">
          <div className="space-y-6">
            <div>
              <Label htmlFor="prompt" className="text-base font-medium mb-2 block">
                Décris ton histoire
              </Label>
              <Textarea
                id="prompt"
                placeholder="Par exemple: Une histoire d'aventure dans l'espace avec un robot ami et des planètes fantastiques..."
                className="min-h-[120px] resize-none"
                value={prompt}
                onChange={(e) => onPromptChange(e.target.value)}
                disabled={isGenerating}
              />
              <div className="mt-2 text-xs text-gray-500 flex items-start">
                <Info className="h-3.5 w-3.5 mr-1 mt-0.5 flex-shrink-0" />
                <span>Notre IA va créer une histoire unique basée sur tes instructions, les valeurs et éléments choisis précédemment.</span>
              </div>
            </div>
            
            <PageCountSelector 
              pageCount={pageCount}
              onPageCountChange={onPageCountChange}
              isGenerating={isGenerating}
            />
            
            <div className="mt-8">
              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                size="lg"
                onClick={onGenerate}
                disabled={isGenerating || !prompt.trim()}
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
            </div>

            <StoryIdeas
              currentIdeas={getCurrentIdeas()}
              onIdeaClick={handleIdeaClick}
              onRefresh={getNextIdeas}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="style">
          <div className="space-y-4">
            <div className="flex items-center mb-4">
              <ImageIcon className="h-5 w-5 text-purple-600 mr-2" />
              <h3 className="text-base font-medium">Style des illustrations</h3>
            </div>
            
            <IllustrationStyleSelector
              selectedStyle={illustrationStyle}
              onStyleChange={onStyleChange}
            />
            
            <div className="mt-4 text-xs text-gray-500 flex items-start">
              <Info className="h-3.5 w-3.5 mr-1 mt-0.5 flex-shrink-0" />
              <span>Le style choisi sera appliqué à toutes les illustrations générées pour ton histoire.</span>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StoryGenerator;
