
import React, { useState, useEffect } from 'react';
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
import { useLectoriaStore } from '@/store/useLectoriaStore';

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
  const {
    heroName,
    heroGender,
    heroAge,
    heroTrait,
    heroDescription,
    hasGlasses,
    selectedValues,
    selectedStoryElements
  } = useLectoriaStore();
  
  // Créer un résumé des informations du héros pour afficher à l'utilisateur
  const heroSummary = React.useMemo(() => {
    const summary = [];
    if (heroName) summary.push(`Personnage: ${heroName}`);
    if (heroGender) summary.push(`Genre: ${heroGender}`);
    if (heroAge) summary.push(`Âge: ${heroAge} ans`);
    if (heroTrait) summary.push(`Traits: ${heroTrait}`);
    return summary;
  }, [heroName, heroGender, heroAge, heroTrait]);
  
  // Créer un résumé des éléments d'histoire
  const elementsSummary = React.useMemo(() => {
    const summary = [];
    if (selectedValues && selectedValues.length > 0) summary.push(`Valeurs: ${selectedValues.join(', ')}`);
    if (selectedStoryElements && selectedStoryElements.length > 0) summary.push(`Éléments: ${selectedStoryElements.join(', ')}`);
    return summary;
  }, [selectedValues, selectedStoryElements]);
  
  const formatStoryIdea = (baseIdea: string) => {
    let formattedIdea = baseIdea;
    
    if (selectedValues && selectedValues.length > 0) {
      formattedIdea += "\n\nL'histoire met en avant les valeurs suivantes : " + selectedValues.join(", ");
    }
    
    if (selectedStoryElements && selectedStoryElements.length > 0) {
      formattedIdea += "\n\nElements à inclure dans l'histoire : " + selectedStoryElements.join(", ");
    }
    
    // Add hero information if available
    const heroInfo = [];
    if (heroName) heroInfo.push(`Le personnage principal s'appelle ${heroName}.`);
    if (heroGender) heroInfo.push(`C'est un/une ${heroGender}.`);
    if (heroAge) heroInfo.push(`Il/Elle a ${heroAge} ans.`);
    if (heroTrait) heroInfo.push(`Ses traits de caractère sont: ${heroTrait}.`);
    
    if (heroInfo.length > 0) {
      formattedIdea += "\n\nInformations sur le héros : " + heroInfo.join(" ");
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
      {(heroSummary.length > 0 || elementsSummary.length > 0) && (
        <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
          <h3 className="text-sm font-semibold mb-2 text-purple-800 flex items-center">
            <Info className="w-4 h-4 mr-1" />
            Informations personnalisées incluses dans ton histoire:
          </h3>
          
          {heroSummary.length > 0 && (
            <div className="mb-2">
              <h4 className="text-xs font-medium text-purple-700">Héros</h4>
              <ul className="text-xs text-gray-700 ml-4 list-disc">
                {heroSummary.map((item, index) => (
                  <li key={`hero-${index}`}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          
          {elementsSummary.length > 0 && (
            <div>
              <h4 className="text-xs font-medium text-purple-700">Éléments d'histoire</h4>
              <ul className="text-xs text-gray-700 ml-4 list-disc">
                {elementsSummary.map((item, index) => (
                  <li key={`element-${index}`}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          
          <p className="text-xs text-gray-600 mt-2 italic">Ces informations seront automatiquement intégrées dans ton histoire.</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
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
