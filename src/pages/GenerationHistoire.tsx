
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Progress } from '@/components/ui/progress';
import InfoSection from '@/components/InfoSection';
import StoryGenerationForm from '@/components/story-generation/StoryGenerationForm';
import StoryPreviewSection from '@/components/story-generation/StoryPreviewSection';
import { useStoryGeneration } from '@/hooks/useStoryGeneration';

const GenerationHistoire = () => {
  const location = useLocation();
  const { storyValues = [], storyElements = [], heroName, heroGender, heroAge, heroTrait } = location.state || {};
  
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
    setPrompt,
    setPageCount,
    setIllustrationStyle,
    generateStory,
    handleShare,
    resetStory,
    toggleBookPreview,
    handleContinue
  } = useStoryGeneration({
    values: storyValues,
    elements: storyElements,
    heroInfo: {
      heroName: heroName || '',
      heroGender: heroGender || '',
      heroAge: heroAge || '',
      heroTrait: heroTrait || ''
    }
  });

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
              onPromptChange={setPrompt}
              onPageCountChange={setPageCount}
              onGenerate={generateStory}
              onStyleChange={setIllustrationStyle}
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
    </div>
  );
};

export default GenerationHistoire;
