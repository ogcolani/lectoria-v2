
import { useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { generateStoryService } from '@/services/storyService';
import { IllustrationStyle } from '@/services/illustrationService';
import { useNavigate } from 'react-router-dom';
import { useLectoriaStore } from '@/store/useLectoriaStore';

export const useStoryGeneration = () => {
  const {
    // Données du héros
    heroName,
    heroAge,
    heroGender,
    heroTrait,
    heroDescription,
    hasGlasses,
    // Éléments d'histoire
    selectedValues,
    selectedStoryElements,
    // Données de génération
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
    // Méthodes
    setIsGenerating,
    setProgress,
    setStoryPreview,
    setFullStory,
    setPrompt,
    setPageCount,
    setIllustrationUrl,
    setIllustrations,
    setIllustrationStyle,
    setShowBookPreview,
    resetStoryData
  } = useLectoriaStore();
  
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Mettre à jour la progression pour cette étape
    setProgress(80);
  }, [setProgress]);

  // Fonction utilitaire pour vérifier si un champ a une valeur
  const hasValue = (field: any): boolean => {
    if (field === undefined || field === null) return false;
    if (typeof field === 'string') return field.trim() !== '';
    if (Array.isArray(field)) return field.length > 0;
    return true;
  };

  const generateStory = async () => {
    // Vérifier que nous avons au moins un prompt ou des informations héros
    if (!prompt.trim() && !hasValue(heroName)) {
      toast({
        title: "Information manquante",
        description: "Veuillez saisir une description d'histoire ou au moins le nom du personnage principal.",
        variant: "destructive",
      });
      return;
    }
    
    // Réinitialiser les données d'illustration avant de commencer
    setIsGenerating(true);
    setIllustrationUrl(null);
    setIllustrations([]);
    
    // Log des informations qui seront utilisées pour la génération (pour débogage)
    console.log('Génération avec les informations suivantes:', {
      heroName,
      heroAge,
      heroGender,
      heroTrait,
      heroDescription,
      hasGlasses,
      selectedValues,
      selectedStoryElements,
      prompt,
      pageCount,
      illustrationStyle
    });
    
    try {
      const childAge = heroAge ? parseInt(heroAge) : 6;

      // Auto-generate a prompt if none is provided, or enhance the existing one
      const userPrompt = prompt.trim() || `Une histoire personnalisée avec ${heroName || 'notre héros'} comme personnage principal`;
      
      // S'assurer que le prompt utilisateur est bien passé au service
      console.log("Prompt utilisé pour la génération:", userPrompt);
      
      // Utiliser toutes les informations disponibles pour la génération de l'histoire
      const result = await generateStoryService({
        prompt: userPrompt,
        pageCount,
        childAge,
        values: selectedValues,
        elements: selectedStoryElements,
        illustrationStyle,
        heroName,
        heroGender,
        heroAge,
        heroTrait,
        heroDescription,
        hasGlasses
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

  const toggleBookPreview = () => {
    setShowBookPreview(!showBookPreview);
  };

  const resetStory = () => {
    // Assurez-vous que le prompt est conservé avant de réinitialiser
    const currentPrompt = prompt;
    resetStoryData();
    // Restaurer le prompt après la réinitialisation pour permettre à l'utilisateur
    // de générer une nouvelle histoire avec le même thème
    setPrompt(currentPrompt);
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
