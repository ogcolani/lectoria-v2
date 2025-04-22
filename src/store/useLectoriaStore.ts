
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IllustrationStyle } from '@/services/illustrationService';

// Interface définissant la structure des données du store
interface LectoriaState {
  // Données du héros
  heroName: string;
  heroAge: string;
  heroDescription: string;
  heroTrait: string;
  heroGender: 'garçon' | 'fille' | undefined;
  hasGlasses: boolean;
  illustrationStyle: IllustrationStyle;
  
  // Éléments de l'histoire
  selectedValues: string[];
  selectedStoryElements: string[];
  
  // Données de génération d'histoire
  prompt: string;
  pageCount: number;
  isGenerating: boolean;
  progress: number;
  storyPreview: string;
  fullStory: string;
  illustrationUrl: string | null;
  illustrations: string[];
  showBookPreview: boolean;
  
  // Méthodes pour mettre à jour les données du héros
  setHeroName: (name: string) => void;
  setHeroAge: (age: string) => void;
  setHeroDescription: (description: string) => void;
  setHeroTrait: (trait: string) => void;
  setHeroGender: (gender: 'garçon' | 'fille' | undefined) => void;
  setHasGlasses: (hasGlasses: boolean) => void;
  setIllustrationStyle: (style: IllustrationStyle) => void;
  
  // Méthodes pour mettre à jour les éléments d'histoire
  setSelectedValues: (values: string[]) => void;
  setSelectedStoryElements: (elements: string[]) => void;
  
  // Méthodes pour la génération d'histoire
  setPrompt: (prompt: string) => void;
  setPageCount: (count: number) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  setProgress: (progress: number) => void;
  setStoryPreview: (preview: string) => void;
  setFullStory: (story: string) => void;
  setIllustrationUrl: (url: string | null) => void;
  setIllustrations: (urls: string[]) => void;
  setShowBookPreview: (show: boolean) => void;
  
  // Réinitialisation des données
  resetStoryData: () => void;
  resetAllData: () => void;
  
  // Session management
  hasExistingSession: () => boolean;
}

// Création du store avec le middleware persist pour le localStorage
export const useLectoriaStore = create<LectoriaState>()(
  persist(
    (set, get) => ({
      // Valeurs initiales du héros
      heroName: '',
      heroAge: '',
      heroDescription: '',
      heroTrait: '',
      heroGender: undefined,
      hasGlasses: false,
      illustrationStyle: 'storybook-cute' as IllustrationStyle,
      
      // Valeurs initiales des éléments d'histoire
      selectedValues: [],
      selectedStoryElements: [],
      
      // Valeurs initiales de génération d'histoire
      prompt: '',
      pageCount: 24,
      isGenerating: false,
      progress: 0,
      storyPreview: '',
      fullStory: '',
      illustrationUrl: null,
      illustrations: [],
      showBookPreview: false,
      
      // Méthodes de mise à jour du héros
      setHeroName: (name: string) => set({ heroName: name }),
      setHeroAge: (age: string) => set({ heroAge: age }),
      setHeroDescription: (description: string) => set({ heroDescription: description }),
      setHeroTrait: (trait: string) => set({ heroTrait: trait }),
      setHeroGender: (gender: 'garçon' | 'fille' | undefined) => set({ heroGender: gender }),
      setHasGlasses: (hasGlasses: boolean) => set({ hasGlasses: hasGlasses }),
      setIllustrationStyle: (style: IllustrationStyle) => set({ illustrationStyle: style }),
      
      // Méthodes de mise à jour des éléments d'histoire
      setSelectedValues: (values: string[]) => set({ selectedValues: values }),
      setSelectedStoryElements: (elements: string[]) => set({ selectedStoryElements: elements }),
      
      // Méthodes de mise à jour de la génération d'histoire
      setPrompt: (prompt: string) => set({ prompt: prompt }),
      setPageCount: (count: number) => set({ pageCount: count }),
      setIsGenerating: (isGenerating: boolean) => set({ isGenerating: isGenerating }),
      setProgress: (progress: number) => set({ progress: progress }),
      setStoryPreview: (preview: string) => set({ storyPreview: preview }),
      setFullStory: (story: string) => set({ fullStory: story }),
      setIllustrationUrl: (url: string | null) => set({ illustrationUrl: url }),
      setIllustrations: (urls: string[]) => set({ illustrations: urls }),
      setShowBookPreview: (show: boolean) => set({ showBookPreview: show }),
      
      // Réinitialisation des données d'histoire
      resetStoryData: () => set({
        storyPreview: '',
        fullStory: '',
        illustrationUrl: null,
        illustrations: [],
        progress: 80,
        showBookPreview: false
      }),
      
      // Réinitialisation complète
      resetAllData: () => set({
        heroName: '',
        heroAge: '',
        heroDescription: '',
        heroTrait: '',
        heroGender: undefined,
        hasGlasses: false,
        illustrationStyle: 'storybook-cute' as IllustrationStyle,
        selectedValues: [],
        selectedStoryElements: [],
        prompt: '',
        pageCount: 24,
        isGenerating: false,
        progress: 0,
        storyPreview: '',
        fullStory: '',
        illustrationUrl: null,
        illustrations: [],
        showBookPreview: false
      }),
      
      // Vérifier si une session existe déjà
      hasExistingSession: () => {
        const { heroName, storyPreview, fullStory } = get();
        return !!(heroName || storyPreview || fullStory);
      }
    }),
    {
      name: 'lectoria-storage', // nom dans le localStorage
    }
  )
);
