
import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
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
    structuredStory,
    prompt,
    pageCount,
    illustrationUrl,
    illustrations,
    illustrationStyle,
    showBookPreview,
    // Order data
    orderId,
    orderStatus,
    preview,
    // Méthodes
    setIsGenerating,
    setProgress,
    setStoryPreview,
    setFullStory,
    setStructuredStory,
    setPrompt,
    setPageCount,
    setIllustrationUrl,
    setIllustrations,
    setIllustrationStyle,
    setShowBookPreview,
    setOrderId,
    setOrderStatus,
    setPreview,
    resetStoryData,
    // Accès au store complet
    simpleExcerpt
  } = useLectoriaStore();
  
  const [useOptimizedPrompts, setUseOptimizedPrompts] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Mettre à jour la progression pour cette étape
    setProgress(80);
    
    // Load existing story if orderId is present
    if (orderId && !preview) {
      loadStoryFromOrder();
    }
  }, [setProgress, orderId, preview]);

  // Fonction utilitaire pour vérifier si un champ a une valeur
  const hasValue = (field: any): boolean => {
    if (field === undefined || field === null) return false;
    if (typeof field === 'string') return field.trim() !== '';
    if (Array.isArray(field)) return field.length > 0;
    return true;
  };

  // Load story from order using Edge Function
  const loadStoryFromOrder = async () => {
    if (!orderId) return;
    
    try {
      console.log('Loading story from order:', orderId);
      
      const { data, error } = await supabase.functions.invoke('get-story', {
        body: { orderId }
      });
      
      if (error) {
        console.error('Error loading story:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger l'histoire. Essayez de la regénérer.",
          variant: "destructive",
        });
        return;
      }
      
      if (data?.success && data?.storyPreview) {
        setPreview(data.storyPreview);
        setOrderStatus(data.orderDetails?.status || 'draft');
        console.log('Story loaded successfully');
      }
    } catch (error) {
      console.error('Error loading story from order:', error);
    }
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
    setOrderId(null);
    setOrderStatus('pending');
    setPreview(null);
    
    try {
      const childAge = heroAge ? parseInt(heroAge) : 6;
      const childName = heroName || 'notre héros';
      
      // Construire les intérêts de l'histoire
      const interests = [
        ...selectedValues,
        ...selectedStoryElements,
        heroTrait,
        heroDescription,
        prompt.trim()
      ].filter(Boolean);
      
      const payload = {
        childName,
        age: childAge,
        interests: interests.join(', ') || `Histoire avec ${childName}`,
        pages: pageCount,
        locale: 'fr'
      };
      
      // Log du payload AVANT l'appel comme demandé
      console.log("[GEN:REQUEST]", payload);
      
      // Notification pour indiquer que le processus de génération a commencé
      toast({
        title: "Génération en cours",
        description: "Création de votre histoire personnalisée...",
      });
      
      // Appel direct de l'Edge Function generate-story-public
      const response = await fetch("https://tigbprdphighswckymqr.supabase.co/functions/v1/generate-story-public", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpZ2JwcmRwaGlnaHN3Y2t5bXFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3MTU4MjYsImV4cCI6MjA3MTI5MTgyNn0.zZPQ4HMzD5vTAM6IgzN9qqJlGbYMZ527-pCa64dM9MY`
        },
        body: JSON.stringify(payload)
      });
      
      console.log("[GEN:HTTP]", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('HTTP Error:', response.status, errorText);
        toast({
          title: "Erreur",
          description: "Impossible de générer l'histoire. Veuillez réessayer.",
          variant: "destructive",
        });
        return;
      }
      
      const data = await response.json().catch(() => null);
      console.log("[GEN:RESPONSE]", data);
      
      if (!data?.ok) {
        console.error('Story generation failed:', data?.error);
        toast({
          title: "Erreur",
          description: data?.error || "La génération a échoué.",
          variant: "destructive",
        });
        return;
      }
      
      // Adapter au nouveau format de réponse
      const storyData = data.story;
      setOrderId(storyData.orderId);
      setOrderStatus(storyData.status || 'draft');
      setPreview(storyData.preview);
      
      // Pour la compatibilité avec l'UI existante, mettre aussi le preview dans storyPreview
      if (storyData.preview?.pages) {
        const previewText = storyData.preview.pages.map(p => p.text).join('\n\n');
        setStoryPreview(previewText);
      }
      
      setProgress(100);
      
      console.log('Histoire générée avec succès via Edge Function:', {
        orderId: storyData.orderId,
        preview: storyData.preview
      });
      
      toast({
        title: "Histoire générée avec succès !",
        description: `Votre aperçu (≈15%) est prêt ! Commandez le livre pour découvrir l'histoire complète.`,
        duration: 5000,
      });
    } catch (error) {
      console.error('Erreur de génération:', error);
      toast({
        title: "Erreur",
        description: "Il y a eu un problème lors de la génération de l'histoire.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Reste des fonctions existantes
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

  // Nouvelle fonction pour contrôler l'utilisation des prompts optimisés
  const toggleOptimizedPrompts = () => {
    setUseOptimizedPrompts(!useOptimizedPrompts);
    toast({
      title: useOptimizedPrompts ? "Mode standard activé" : "Mode optimisé activé",
      description: useOptimizedPrompts 
        ? "Les histoires seront générées sans optimisation de prompt" 
        : "Les histoires bénéficieront de prompts optimisés par IA",
    });
  };

  return {
    heroName,
    isGenerating,
    progress,
    storyPreview,
    fullStory,
    structuredStory,
    prompt,
    pageCount,
    illustrationUrl,
    illustrations,
    illustrationStyle,
    showBookPreview,
    useOptimizedPrompts,
    orderId,
    orderStatus,
    preview,
    setPrompt,
    setPageCount,
    setIllustrationStyle,
    generateStory,
    handleShare,
    resetStory,
    toggleBookPreview,
    handleContinue,
    toggleOptimizedPrompts,
    loadStoryFromOrder
  };
};
