
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';

import StoryGenerator from '@/components/StoryGenerator';
import StoryPreview from '@/components/StoryPreview';
import BookPreview from '@/components/BookPreview';
import InfoSection from '@/components/InfoSection';
import { generateStoryService } from '@/services/storyService';
import { Button } from '@/components/ui/button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IllustrationStyle } from '@/services/illustrationService';

const GenerationHistoire = () => {
  const [progress, setProgress] = useState(80);
  const [isGenerating, setIsGenerating] = useState(false);
  const [fullStory, setFullStory] = useState('');
  const [storyPreview, setStoryPreview] = useState('');
  const [prompt, setPrompt] = useState('');
  const [pageCount, setPageCount] = useState(24);
  const [illustrationUrl, setIllustrationUrl] = useState<string | null>(null);
  const [illustrations, setIllustrations] = useState<string[]>([]);
  const [illustrationStyle, setIllustrationStyle] = useState<IllustrationStyle>('storybook-cute');
  const [showBookPreview, setShowBookPreview] = useState(false);
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get story elements and values from location state if available
  const [values, setValues] = useState<string[]>([]);
  const [elements, setElements] = useState<string[]>([]);
  const [heroInfo, setHeroInfo] = useState({
    heroName: '',
    heroGender: '',
    heroAge: '',
    heroTrait: ''
  });
  
  // Load values, elements and hero info from location state on initial render
  useEffect(() => {
    if (location.state) {
      const { storyValues, storyElements, heroName, heroGender, heroAge, heroTrait } = location.state;
      if (storyValues) setValues(storyValues);
      if (storyElements) setElements(storyElements);
      
      // Set hero information
      setHeroInfo({
        heroName: heroName || '',
        heroGender: heroGender || '',
        heroAge: heroAge || '',
        heroTrait: heroTrait || ''
      });
    }
  }, [location]);

  // Fonction qui génère une histoire par l'IA Mistral
  const generateStory = async () => {
    setIsGenerating(true);
    setIllustrationUrl(null);
    setIllustrations([]);
    
    try {
      // Get child age from hero info if available, or use default
      const childAge = heroInfo.heroAge ? parseInt(heroInfo.heroAge) : 6;

      const result = await generateStoryService({
        prompt,
        pageCount,
        childAge,
        values,
        elements,
        illustrationStyle,
        // Pass hero information to the story service
        heroName: heroInfo.heroName,
        heroGender: heroInfo.heroGender,
        heroAge: heroInfo.heroAge,
        heroTrait: heroInfo.heroTrait
      });
      
      setFullStory(result.fullStory);
      setStoryPreview(result.storyPreview);
      setIllustrationUrl(result.illustrationUrl);
      
      // Stocker toutes les illustrations générées
      if (result.illustrations && result.illustrations.length > 0) {
        setIllustrations(result.illustrations);
      }
      
      setProgress(100);
      
      toast({
        title: "Histoire générée !",
        description: `Ton histoire personnalisée est prête avec ${result.illustrations?.length || 0} illustrations uniques. Découvre un aperçu et commande le livre complet !`,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Il y a eu un problème lors de la génération de l'histoire.",
        variant: "destructive",
      });
      console.error("Erreur de génération:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = () => {
    // Simuler un partage
    toast({
      title: "Partage",
      description: "Partagez l'aperçu de cette histoire avec vos proches !",
    });
  };

  const resetStory = () => {
    setStoryPreview('');
    setFullStory('');
    setIllustrationUrl(null);
    setIllustrations([]);
    setProgress(80);
    setShowBookPreview(false);
  };

  // Fonction pour changer le style d'illustration
  const handleStyleChange = (style: IllustrationStyle) => {
    setIllustrationStyle(style);
    if (storyPreview) {
      toast({
        title: "Style d'illustration modifié",
        description: "Regénère l'histoire pour voir les illustrations dans ce nouveau style !",
      });
    }
  };

  // Extraire les paragraphes de l'histoire pour le BookPreview
  const getStoryParagraphs = () => {
    if (!fullStory) return [];
    
    const paragraphs = fullStory.split('\n')
      .filter(p => p.trim() !== '' && !p.startsWith('#') && !p.startsWith('⭐'))
      .slice(0, 5);
    
    return paragraphs;
  };
  
  // Extraire le titre de l'histoire
  const getStoryTitle = () => {
    if (!fullStory) return "Mon Histoire";
    
    const lines = fullStory.split('\n');
    for (const line of lines) {
      if (line.startsWith('# ')) {
        return line.substring(2);
      }
    }
    
    return "Mon Histoire";
  };
  
  // Fonction pour passer à l'étape suivante
  const handleContinue = () => {
    navigate('/offres-cadeaux');
  };
  
  // Changer la vue entre aperçu et prévisualisation du livre
  const toggleBookPreview = () => {
    setShowBookPreview(!showBookPreview);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-white">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
            Génération de ton histoire
          </span>
        </h1>
        
        <div className="mb-10 max-w-xl mx-auto">
          <div className="flex justify-between text-sm font-medium text-gray-500 mb-2">
            <span>Étape 4 sur 5</span>
            <span>{progress}% complété</span>
          </div>
          <Progress value={progress} className="h-2 bg-gray-200" />
        </div>

        {showBookPreview && storyPreview ? (
          <div className="max-w-6xl mx-auto">
            <BookPreview 
              storyTitle={getStoryTitle()}
              heroName={heroInfo.heroName}
              storyContent={getStoryParagraphs()}
              illustrations={illustrations}
              onContinue={handleContinue}
            />
            <div className="text-center mt-6">
              <Button variant="outline" onClick={toggleBookPreview}>
                Revenir à l'aperçu
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="lg:col-span-1 order-2 lg:order-1">
              <StoryGenerator 
                prompt={prompt}
                pageCount={pageCount}
                isGenerating={isGenerating}
                onPromptChange={setPrompt}
                onPageCountChange={setPageCount}
                onGenerate={generateStory}
                illustrationStyle={illustrationStyle}
                onStyleChange={handleStyleChange}
              />
            </div>
            
            <div className="lg:col-span-2 order-1 lg:order-2">
              <StoryPreview 
                storyPreview={storyPreview}
                isGenerating={isGenerating}
                pageCount={pageCount}
                childAge={heroInfo.heroAge ? parseInt(heroInfo.heroAge) : 6}
                illustrationUrl={illustrationUrl}
                illustrations={illustrations}
                onShare={handleShare}
                onReset={resetStory}
              />
              
              {storyPreview && progress === 100 && (
                <div className="mt-8 text-center">
                  <Button 
                    size="lg" 
                    onClick={toggleBookPreview}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    Prévisualiser le livre
                  </Button>
                  <p className="text-sm text-gray-500 mt-2">
                    Visualise ton histoire en format livre avec {illustrations.length} illustrations
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
        
        <InfoSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default GenerationHistoire;
