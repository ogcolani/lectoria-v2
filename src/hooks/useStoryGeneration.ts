
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { generateStoryService } from '@/services/storyService';
import { IllustrationStyle } from '@/services/illustrationService';
import { useNavigate } from 'react-router-dom';

interface UseStoryGenerationProps {
  values: string[];
  elements: string[];
  heroInfo: {
    heroName: string;
    heroGender: string;
    heroAge: string;
    heroTrait: string;
  };
}

export const useStoryGeneration = ({ values, elements, heroInfo }: UseStoryGenerationProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(80);
  const [storyPreview, setStoryPreview] = useState('');
  const [fullStory, setFullStory] = useState('');
  const [prompt, setPrompt] = useState('');
  const [pageCount, setPageCount] = useState(24);
  const [illustrationUrl, setIllustrationUrl] = useState<string | null>(null);
  const [illustrations, setIllustrations] = useState<string[]>([]);
  const [illustrationStyle, setIllustrationStyle] = useState<IllustrationStyle>('storybook-cute');
  const [showBookPreview, setShowBookPreview] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const generateStory = async () => {
    setIsGenerating(true);
    setIllustrationUrl(null);
    setIllustrations([]);
    
    try {
      const childAge = heroInfo.heroAge ? parseInt(heroInfo.heroAge) : 6;

      const result = await generateStoryService({
        prompt,
        pageCount,
        childAge,
        values,
        elements,
        illustrationStyle,
        heroName: heroInfo.heroName,
        heroGender: heroInfo.heroGender,
        heroAge: heroInfo.heroAge,
        heroTrait: heroInfo.heroTrait
      });
      
      setFullStory(result.fullStory);
      setStoryPreview(result.storyPreview);
      setIllustrationUrl(result.illustrationUrl);
      
      if (result.illustrations && result.illustrations.length > 0) {
        setIllustrations(result.illustrations);
      }
      
      setProgress(100);
      
      toast({
        title: "Histoire générée !",
        description: `Ton histoire personnalisée est prête avec ${result.illustrations?.length || 0} illustrations. Découvre un aperçu et commande le livre complet !`,
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

  const handleContinue = () => {
    navigate('/offres-cadeaux');
  };

  const handleShare = () => {
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

  const toggleBookPreview = () => {
    setShowBookPreview(!showBookPreview);
  };

  return {
    isGenerating,
    progress,
    storyPreview,
    fullStory,
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
  };
};
