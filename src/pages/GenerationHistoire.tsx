
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';

import StoryGenerator from '@/components/StoryGenerator';
import StoryPreview from '@/components/StoryPreview';
import InfoSection from '@/components/InfoSection';
import { generateStoryService } from '@/services/storyService';

const GenerationHistoire = () => {
  const [progress, setProgress] = useState(80);
  const [isGenerating, setIsGenerating] = useState(false);
  const [fullStory, setFullStory] = useState('');
  const [storyPreview, setStoryPreview] = useState('');
  const [prompt, setPrompt] = useState('');
  const [pageCount, setPageCount] = useState(24);
  const [illustrationUrl, setIllustrationUrl] = useState<string | null>(null);
  const { toast } = useToast();

  // Fonction qui génère une histoire par l'IA Mistral
  const generateStory = async () => {
    setIsGenerating(true);
    setIllustrationUrl(null);
    
    try {
      // Dans une vraie application, cette valeur serait récupérée d'un état global ou localStorage
      const childAge = 6; 

      const result = await generateStoryService(prompt, pageCount, childAge);
      
      setFullStory(result.fullStory);
      setStoryPreview(result.storyPreview);
      setIllustrationUrl(result.illustrationUrl);
      setProgress(100);
      
      toast({
        title: "Histoire générée !",
        description: "Ton histoire personnalisée est prête avec une illustration unique. Découvre un aperçu et commande le livre complet !",
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
    setProgress(80);
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
          <div className="lg:col-span-1 order-2 lg:order-1">
            <StoryGenerator 
              prompt={prompt}
              pageCount={pageCount}
              isGenerating={isGenerating}
              onPromptChange={setPrompt}
              onPageCountChange={setPageCount}
              onGenerate={generateStory}
            />
          </div>
          
          <div className="lg:col-span-2 order-1 lg:order-2">
            <StoryPreview 
              storyPreview={storyPreview}
              isGenerating={isGenerating}
              pageCount={pageCount}
              childAge={6} // Cette valeur serait récupérée d'un état global dans une vraie application
              illustrationUrl={illustrationUrl}
              onShare={handleShare}
              onReset={resetStory}
            />
          </div>
        </div>
        
        <InfoSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default GenerationHistoire;
