
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ImageIcon, Info } from 'lucide-react';
import { IllustrationStyle } from '@/services/illustrationService';
import StoryIdeas from './story-generator/StoryIdeas';
import PageCountSelector from './story-generator/PageCountSelector';
import IllustrationStyleSelector from './story-generator/IllustrationStyleSelector';
import { storyIdeas } from './story-generator/storyIdeasData';
import { useLectoriaStore } from '@/store/useLectoriaStore';
import HeroSummary from './story-generator/HeroSummary';
import StoryPrompt from './story-generator/StoryPrompt';
import GenerateButton from './story-generator/GenerateButton';
import { formatStoryIdea } from './story-generator/formatStoryIdea';

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
  const [activeTab, setActiveTab] = useState("prompt");
  
  // Récupérer les données du store
  const storeData = useLectoriaStore();
  const { heroName } = storeData;
  
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
    onPromptChange(formatStoryIdea(ideaText, storeData));
  };

  // Prevent default form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  // Handle tab change without page reload
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Générateur d'histoire</h2>
      
      {/* Afficher un résumé des informations déjà saisies */}
      <HeroSummary />
      
      <form onSubmit={handleSubmit}>
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="prompt">Histoire</TabsTrigger>
            <TabsTrigger value="style">Style visuel</TabsTrigger>
          </TabsList>
          
          <TabsContent value="prompt">
            <div className="space-y-6">
              <StoryPrompt 
                prompt={prompt}
                onPromptChange={onPromptChange}
                isGenerating={isGenerating}
                heroName={heroName}
              />
              
              <PageCountSelector 
                pageCount={pageCount}
                onPageCountChange={onPageCountChange}
                isGenerating={isGenerating}
              />
              
              <div className="mt-8">
                <GenerateButton 
                  onGenerate={onGenerate}
                  isGenerating={isGenerating}
                />
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
      </form>
    </div>
  );
};

export default StoryGenerator;
