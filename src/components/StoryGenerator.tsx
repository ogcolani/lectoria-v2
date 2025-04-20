import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Sparkles, Upload, Lightbulb, Info, ImageIcon, RefreshCw } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { IllustrationStyle } from '@/services/illustrationService';

// Liste complète des suggestions d'histoires
const storyIdeas = [
  { text: "Une aventure dans une forêt enchantée où les arbres parlent et cachent un trésor ancien.", label: "Forêt enchantée" },
  { text: "Un voyage sous-marin à la découverte d'une cité perdue et de ses habitants.", label: "Monde sous-marin" },
  { text: "Un enfant qui découvre qu'il peut parler aux animaux et les aide à résoudre leurs problèmes.", label: "Amis animaux" },
  { text: "Une quête magique dans les étoiles à la recherche d'une constellation disparue.", label: "Aventure spatiale" },
  { text: "L'histoire d'un petit dragon qui apprend à faire de la pâtisserie plutôt que de cracher du feu.", label: "Dragon pâtissier" },
  { text: "Un voyage dans le temps pour rencontrer des dinosaures amicaux.", label: "Dinos du passé" },
  { text: "Une école secrète où les enfants apprennent à faire pousser des bonbons magiques.", label: "École des bonbons" },
  { text: "L'aventure d'un nuage qui veut devenir arc-en-ciel.", label: "Nuage coloré" },
  { text: "Un cirque magique où les acrobates volent vraiment et les clowns peuvent se transformer.", label: "Cirque enchanté" }
];

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

const StoryGenerator = ({
  prompt,
  pageCount,
  isGenerating,
  illustrationStyle = 'storybook-cute',
  onPromptChange,
  onPageCountChange,
  onGenerate,
  onStyleChange = () => {}
}: StoryGeneratorProps) => {
  // État pour suivre les suggestions actuellement affichées
  const [currentIdeasIndex, setCurrentIdeasIndex] = useState(0);
  
  // Fonction pour obtenir les 3 suggestions suivantes
  const getNextIdeas = () => {
    setCurrentIdeasIndex((prevIndex) => (prevIndex + 3) % storyIdeas.length);
  };
  
  // Obtenir les 3 suggestions actuelles
  const getCurrentIdeas = () => {
    const ideas = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIdeasIndex + i) % storyIdeas.length;
      ideas.push(storyIdeas[index]);
    }
    return ideas;
  };

  // Styles d'illustration disponibles
  const illustrationStyles: { id: IllustrationStyle; label: string; description: string }[] = [
    { 
      id: 'storybook-cute', 
      label: 'Album Enfantin',
      description: 'Style doux et coloré, parfait pour les jeunes enfants' 
    },
    { 
      id: 'fantasy-vibrant', 
      label: 'Fantaisie Vibrante',
      description: 'Couleurs vives et détails magiques pour les histoires fantastiques' 
    },
    { 
      id: 'comic-style', 
      label: 'Bande Dessinée',
      description: 'Style BD avec traits nets et couleurs contrastées' 
    },
    { 
      id: 'realistic', 
      label: 'Semi-Réaliste',
      description: 'Plus de détails et de textures, pour un rendu plus mature' 
    }
  ];
  
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
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="pageCount" className="text-base font-medium">
                  Longueur du livre
                </Label>
                <span className="text-sm font-medium">{pageCount} pages</span>
              </div>
              <Slider
                id="pageCount"
                defaultValue={[pageCount]}
                min={10}
                max={40}
                step={2}
                onValueChange={(value) => onPageCountChange(value[0])}
                disabled={isGenerating}
                className="py-2"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Court</span>
                <span>Moyen</span>
                <span>Long</span>
              </div>
            </div>
            
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

            <div className="mt-4 border-t pt-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-start">
                  <Lightbulb className="h-4 w-4 text-amber-500 mt-0.5 mr-2" />
                  <span className="text-sm text-gray-600">Idées d'inspiration</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={getNextIdeas}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Autres idées
                </Button>
              </div>
              <div className="mt-2 space-y-2">
                {getCurrentIdeas().map((idea, index) => (
                  <Button 
                    key={index}
                    variant="outline" 
                    size="sm" 
                    className="mr-2 text-xs"
                    onClick={() => onPromptChange(idea.text)}
                  >
                    {idea.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="style">
          <div className="space-y-4">
            <div className="flex items-center mb-4">
              <ImageIcon className="h-5 w-5 text-purple-600 mr-2" />
              <h3 className="text-base font-medium">Style des illustrations</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {illustrationStyles.map((style) => (
                <Card 
                  key={style.id}
                  className={`cursor-pointer transition border-2 hover:border-purple-300 ${
                    illustrationStyle === style.id ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
                  }`}
                  onClick={() => onStyleChange(style.id)}
                >
                  <CardContent className="p-4">
                    <div className="font-medium">{style.label}</div>
                    <p className="text-xs text-gray-500 mt-1">{style.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
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
