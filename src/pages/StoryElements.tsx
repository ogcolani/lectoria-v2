
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Heart, Star, Wand2, Sparkles, Zap, Lightbulb } from 'lucide-react';

// Import newly created components
import ProgressSection from '@/components/story-elements/ProgressSection';
import ValuesSection, { ValueItem } from '@/components/story-elements/ValuesSection';
import ElementsSection, { StoryElement } from '@/components/story-elements/ElementsSection';
import StoryPreviewSidebar from '@/components/story-elements/StoryPreviewSidebar';
import NavigationButtons from '@/components/story-elements/NavigationButtons';
import HelpSection from '@/components/story-elements/HelpSection';
import { useLectoriaStore } from '@/store/useLectoriaStore';

const StoryElements = () => {
  // Utiliser le store Zustand
  const { 
    selectedValues,
    selectedStoryElements,
    setSelectedValues,
    setSelectedStoryElements,
    setProgress
  } = useLectoriaStore();
  
  useEffect(() => {
    // Initialiser la progression pour cette étape
    setProgress(60);
  }, [setProgress]);
  
  // Define the available values and story elements for reuse
  const availableValues: ValueItem[] = [
    { id: 'courage', label: 'Courage', icon: <Heart className="h-5 w-5 text-purple-600" /> },
    { id: 'perseverance', label: 'Persévérance', icon: <Zap className="h-5 w-5 text-purple-600" /> },
    { id: 'amitie', label: 'Amitié', icon: <Heart className="h-5 w-5 text-purple-600" /> },
    { id: 'curiosite', label: 'Curiosité', icon: <Lightbulb className="h-5 w-5 text-purple-600" /> },
    { id: 'respect', label: 'Respect', icon: <Star className="h-5 w-5 text-purple-600" /> },
    { id: 'creativite', label: 'Créativité', icon: <Wand2 className="h-5 w-5 text-purple-600" /> }
  ];
  
  const storyElements: StoryElement[] = [
    { id: 'magicObject', label: 'Un objet magique', icon: <Wand2 className="h-5 w-5 text-purple-600" /> },
    { id: 'friend', label: 'Un ami fidèle', icon: <Heart className="h-5 w-5 text-purple-600" /> },
    { id: 'villain', label: 'Un méchant à affronter', icon: <Zap className="h-5 w-5 text-purple-600" /> },
    { id: 'challenge', label: 'Une épreuve difficile', icon: <Star className="h-5 w-5 text-purple-600" /> },
    { id: 'surprise', label: 'Un rebondissement surprise', icon: <Sparkles className="h-5 w-5 text-purple-600" /> },
    { id: 'lesson', label: 'Une leçon à apprendre', icon: <Lightbulb className="h-5 w-5 text-purple-600" /> }
  ];

  // Get the selected value labels for passing to the next page
  const getSelectedValueLabels = () => {
    return selectedValues.map(valueId => {
      const value = availableValues.find(v => v.id === valueId);
      return value ? value.label : valueId;
    });
  };

  // Get the selected element labels for passing to the next page
  const getSelectedElementLabels = () => {
    return selectedStoryElements.map(elementId => {
      const element = storyElements.find(e => e.id === elementId);
      return element ? element.label : elementId;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-white">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
            Personnalise ton histoire
          </span>
        </h1>
        
      <ProgressSection 
        progress={useLectoriaStore(state => state.progress)} 
        currentStep={3}
        totalSteps={5} 
      />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <StoryPreviewSidebar 
            values={selectedValues} 
            elements={selectedStoryElements} 
            availableValues={availableValues} 
            storyElements={storyElements} 
          />
          
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 order-1 lg:order-2">
            <h2 className="text-2xl font-bold mb-6">
              Donne vie à ton histoire
            </h2>
            
            <div className="space-y-8">
              <ValuesSection selectedValues={selectedValues} setSelectedValues={setSelectedValues} />
              <ElementsSection selectedElements={selectedStoryElements} setSelectedElements={setSelectedStoryElements} />
            </div>
            
            <NavigationButtons 
              nextHref="/generation-histoire"
              backHref="/personnalisation-hero"
              values={getSelectedValueLabels()} 
              elements={getSelectedElementLabels()} 
            />
          </div>
        </div>
        
        <HelpSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default StoryElements;
