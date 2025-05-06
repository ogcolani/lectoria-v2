
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Progress } from '@/components/ui/progress';
import InfoSection from '@/components/InfoSection';
import StoryGenerationForm from '@/components/story-generation/StoryGenerationForm';
import StoryPreviewSection from '@/components/story-generation/StoryPreviewSection';
import { useStoryGeneration } from '@/hooks/useStoryGeneration';
import SessionRecovery from '@/components/session/SessionRecovery';
import { useLectoriaStore } from '@/store/useLectoriaStore';
import { useToast } from '@/components/ui/use-toast';

const GenerationHistoire = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const {
    isGenerating,
    progress,
    storyPreview,
    prompt,
    pageCount,
    illustrationUrl,
    illustrations,
    illustrationStyle,
    showBookPreview,
    useOptimizedPrompts,
    setPrompt,
    setPageCount,
    setIllustrationStyle,
    generateStory,
    handleShare,
    resetStory,
    toggleBookPreview,
    toggleOptimizedPrompts
  } = useStoryGeneration();
  
  // Récupérer des données supplémentaires du store
  const { 
    heroName, 
    heroAge, 
    heroGender, 
    heroTrait,
    selectedValues,
    selectedStoryElements 
  } = useLectoriaStore(state => state);
  
  // Vérifier si des données essentielles sont manquantes
  useEffect(() => {
    // Vérification des données du héros
    if (!heroName) {
      console.warn('Attention: Aucun nom de héros défini. Ceci peut affecter la qualité de l\'histoire générée.');
      
      // Toast d'information si aucun nom n'est défini
      toast({
        title: "Information manquante",
        description: "Aucun nom de héros n'a été défini. Tu peux retourner à l'étape précédente pour le configurer.",
        variant: "default",
      });
    }
    
    // Log complet des données disponibles pour la génération
    console.log('Données disponibles pour la génération:', {
      heroName,
      heroAge,
      heroGender,
      heroTrait,
      selectedValues,
      selectedStoryElements
    });
  }, [heroName, heroAge, heroGender, heroTrait, selectedValues, selectedStoryElements, toast]);
  
  const handleContinue = () => {
    navigate('/choix-format');
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {!showBookPreview && (
            <StoryGenerationForm
              prompt={prompt}
              pageCount={pageCount}
              isGenerating={isGenerating}
              illustrationStyle={illustrationStyle}
              useOptimizedPrompts={useOptimizedPrompts}
              onPromptChange={setPrompt}
              onPageCountChange={setPageCount}
              onGenerate={generateStory}
              onStyleChange={setIllustrationStyle}
              onToggleOptimizedPrompts={toggleOptimizedPrompts}
            />
          )}
          
          <StoryPreviewSection
            storyPreview={storyPreview}
            isGenerating={isGenerating}
            pageCount={pageCount}
            childAge={heroAge ? parseInt(heroAge) : 6}
            illustrationUrl={illustrationUrl}
            illustrations={illustrations}
            onShare={handleShare}
            onReset={resetStory}
            showBookPreview={showBookPreview}
            onToggleBookPreview={toggleBookPreview}
            onContinue={handleContinue}
            heroName={heroName}
          />
        </div>
        
        <InfoSection />
      </main>
      
      <Footer />
      <SessionRecovery />
    </div>
  );
};

export default GenerationHistoire;
