
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import ProgressSection from '@/components/story-elements/ProgressSection';
import NavigationButtons from '@/components/story-elements/NavigationButtons';
import HeroPreview from '@/components/hero-customization/HeroPreview';
import BasicInfoFields from '@/components/hero-customization/BasicInfoFields';
import AppearanceOptions from '@/components/hero-customization/AppearanceOptions';
import CategoryTabs from '@/components/hero-customization/CategoryTabs';
import HelpGuide from '@/components/hero-customization/HelpGuide';
import IllustrationStyleSelector from '@/components/hero-customization/IllustrationStyleSelector';

const formSchema = z.object({
  heroName: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  heroAge: z.string().min(1, { message: "L'âge est requis" }),
  heroDescription: z.string().optional(),
  heroTrait: z.string().optional(),
  heroGender: z.enum(["garçon", "fille"], {
    required_error: "Sélectionne le genre de ton héros",
  }),
  hasGlasses: z.boolean().default(false),
  illustrationStyle: z.enum(["storybook", "fantasy", "comics"]).default("storybook")
});

type FormValues = z.infer<typeof formSchema>;
type CategoryTab = 'personnage' | 'apparence' | 'pouvoirs';

const PersonnalisationHero = () => {
  const [progress, setProgress] = useState(40);
  const [activeTab, setActiveTab] = useState<CategoryTab>('personnage');
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      heroName: '',
      heroAge: '',
      heroDescription: '',
      heroTrait: '',
      heroGender: undefined,
      hasGlasses: false,
      illustrationStyle: 'storybook'
    }
  });
  
  const onSubmit = (data: FormValues) => {
    console.log("Données du héros:", data);
    // Ici vous pourriez stocker les données dans un contexte global ou localStorage
    // pour les utiliser dans les étapes suivantes
  };

  // Function to split traits entered by the user
  const getTraits = (): string[] => {
    const traitsText = form.watch('heroTrait') || '';
    if (!traitsText.trim()) return [];
    
    // List of common French connecting words and articles to filter out
    const connectingWords = ['et', 'ou', 'avec', 'sans', 'le', 'la', 'les', 'un', 'une', 'des', 'ce', 'cette', 'ces', 'mon', 'ma', 'mes', 'ton', 'ta', 'tes', 'son', 'sa', 'ses', 'notre', 'nos', 'votre', 'vos', 'leur', 'leurs', 'de', 'du', 'à', 'au', 'aux'];
    
    // Split by commas, spaces, or semicolons
    return traitsText
      .split(/[,;\s]+/)
      .map(trait => trait.trim().toLowerCase())
      .filter(trait => 
        trait !== '' && 
        !connectingWords.includes(trait) &&
        trait.length > 1 // Only include words longer than 1 character
      )
      .map(trait => trait.charAt(0).toUpperCase() + trait.slice(1)); // Capitalize first letter
  };

  // Get the traits array
  const traits = getTraits();
  
  // Handle tab selection
  const handleTabChange = (tab: CategoryTab) => {
    setActiveTab(tab);
  };

  // Render active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'apparence':
        return <AppearanceOptions control={form.control} />;
      case 'pouvoirs':
        // For now, the powers tab is empty or could be implemented later
        return (
          <div className="space-y-6 my-6 bg-purple-50 p-4 rounded-xl">
            <h3 className="text-xl font-bold">Pouvoirs</h3>
            <p className="text-gray-600">Cette fonctionnalité sera disponible prochainement.</p>
          </div>
        );
      case 'personnage':
      default:
        return null; // The basic fields are always shown
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-white">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
            Personnalise ton héros
          </span>
        </h1>
        
        <ProgressSection progress={progress} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <HeroPreview 
            heroName={form.watch('heroName')}
            heroDescription={form.watch('heroDescription')}
            heroAge={form.watch('heroAge')}
            heroGender={form.watch('heroGender')}
            hasGlasses={form.watch('hasGlasses')}
            traits={traits}
            illustrationStyle={form.watch('illustrationStyle')}
          />
          
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 order-1 lg:order-2">
            <h2 className="text-2xl font-bold mb-6">
              Décris ton héros
            </h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <BasicInfoFields control={form.control} />
                
                {/* Déplacé après les champs de base qui contiennent le genre */}
                <IllustrationStyleSelector control={form.control} />
                
                {renderTabContent()}

                <CategoryTabs 
                  activeTab={activeTab} 
                  onTabChange={handleTabChange}
                  tabs={[
                    { id: 'personnage', label: 'Personnage' },
                    { id: 'apparence', label: 'Apparence' },
                    { id: 'pouvoirs', label: 'Pouvoirs' }
                  ]}
                />
                  
                <NavigationButtons />
              </form>
            </Form>
          </div>
        </div>
        
        <HelpGuide />
      </main>
      
      <Footer />
    </div>
  );
};

export default PersonnalisationHero;
