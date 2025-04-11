
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ChevronRight, ChevronLeft, User, Heart, Wand2, Palette, Male, Female } from 'lucide-react';
import CartoonCharacter from '@/components/CartoonCharacter';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CharacterTraitBadge from '@/components/ui/character-trait-badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import ProgressSection from '@/components/story-elements/ProgressSection';
import NavigationButtons from '@/components/story-elements/NavigationButtons';

const formSchema = z.object({
  heroName: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  heroAge: z.string().min(1, { message: "L'âge est requis" }),
  heroDescription: z.string().optional(),
  heroTrait: z.string().optional(),
  heroGender: z.enum(["garçon", "fille"], {
    required_error: "Sélectionne le genre de ton héros",
  }),
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
          <div className="lg:col-span-1 flex flex-col items-center justify-start bg-purple-100 rounded-2xl p-6 order-2 lg:order-1">
            <div className="mb-4 text-center">
              <h3 className="text-xl font-bold mb-2">Aperçu du personnage</h3>
              <p className="text-sm text-gray-600">C'est à quoi ton héros va ressembler!</p>
            </div>
            <div className="w-full max-w-[220px]">
              <CartoonCharacter />
            </div>
            <div className="mt-6 p-4 bg-white rounded-xl shadow-sm w-full">
              <h4 className="font-bold text-lg mb-2">{form.watch('heroName') || 'Ton héros'}</h4>
              <p className="text-sm text-gray-600">
                {form.watch('heroDescription') || 'Décris ton héros et ses caractéristiques spéciales...'}
              </p>
              {form.watch('heroAge') && (
                <p className="mt-2 text-sm font-medium">Âge: {form.watch('heroAge')} ans</p>
              )}
              {form.watch('heroGender') && (
                <p className="mt-2 text-sm font-medium">
                  Genre: {form.watch('heroGender') === 'garçon' ? 'Garçon' : 'Fille'}
                </p>
              )}
              {traits.length > 0 && (
                <div className="mt-2 flex flex-wrap">
                  {traits.map((trait, index) => (
                    <CharacterTraitBadge key={index} trait={trait} />
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 order-1 lg:order-2">
            <h2 className="text-2xl font-bold mb-6">
              Décris ton héros
            </h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="heroName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prénom du héros</FormLabel>
                        <FormControl>
                          <Input placeholder="Comment s'appelle ton héros?" {...field} />
                        </FormControl>
                        <FormDescription>
                          Le prénom qui apparaîtra dans l'histoire
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="heroAge"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Âge</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Quel âge a ton héros?" {...field} />
                        </FormControl>
                        <FormDescription>
                          L'âge de ton personnage principal
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="heroGender"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Genre du héros</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex gap-6"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="garçon" id="garçon" />
                            <label htmlFor="garçon" className="flex items-center gap-1 cursor-pointer text-sm font-medium">
                              <Male className="h-5 w-5 text-blue-500" />
                              Garçon
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="fille" id="fille" />
                            <label htmlFor="fille" className="flex items-center gap-1 cursor-pointer text-sm font-medium">
                              <Female className="h-5 w-5 text-pink-500" />
                              Fille
                            </label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormDescription>
                        Le genre de ton personnage principal dans l'histoire
                      </FormDescription>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="heroDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Décris ton héros (ce qu'il/elle aime, ses loisirs...)" 
                          className="min-h-32"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Ces détails rendront l'histoire plus personnelle
                      </FormDescription>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="heroTrait"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Traits de caractère principaux</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Courageux, Curieux, Créatif... (séparés par des virgules)" {...field} />
                      </FormControl>
                      <FormDescription>
                        Ces traits seront mis en avant dans l'histoire
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-3 gap-4 mt-6">
                  <Card 
                    className={`p-4 cursor-pointer hover:bg-purple-50 transition-colors border-2 ${
                      activeTab === 'personnage' ? 'border-purple-500 bg-purple-50' : 'border-transparent hover:border-purple-200'
                    }`}
                    onClick={() => handleTabChange('personnage')}
                  >
                    <div className="flex flex-col items-center text-center">
                      <User className={`h-8 w-8 ${activeTab === 'personnage' ? 'text-purple-700' : 'text-purple-600'} mb-2`} />
                      <span className="text-sm font-medium">Personnage</span>
                    </div>
                  </Card>
                  
                  <Card 
                    className={`p-4 cursor-pointer hover:bg-purple-50 transition-colors border-2 ${
                      activeTab === 'apparence' ? 'border-purple-500 bg-purple-50' : 'border-transparent hover:border-purple-200'
                    }`}
                    onClick={() => handleTabChange('apparence')}
                  >
                    <div className="flex flex-col items-center text-center">
                      <Palette className={`h-8 w-8 ${activeTab === 'apparence' ? 'text-purple-700' : 'text-purple-600'} mb-2`} />
                      <span className="text-sm font-medium">Apparence</span>
                    </div>
                  </Card>
                  
                  <Card 
                    className={`p-4 cursor-pointer hover:bg-purple-50 transition-colors border-2 ${
                      activeTab === 'pouvoirs' ? 'border-purple-500 bg-purple-50' : 'border-transparent hover:border-purple-200'
                    }`}
                    onClick={() => handleTabChange('pouvoirs')}
                  >
                    <div className="flex flex-col items-center text-center">
                      <Wand2 className={`h-8 w-8 ${activeTab === 'pouvoirs' ? 'text-purple-700' : 'text-purple-600'} mb-2`} />
                      <span className="text-sm font-medium">Pouvoirs</span>
                    </div>
                  </Card>
                </div>
                  
                <NavigationButtons />
              </form>
            </Form>
          </div>
        </div>
        
        <div className="mt-12 max-w-5xl mx-auto bg-purple-50 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4 text-center">Comment personnaliser ton héros ?</h3>
          <ol className="list-decimal list-inside space-y-3 ml-4">
            <li className="text-gray-700">
              <span className="font-medium">Définis l'identité</span> : Donne un prénom et un âge à ton personnage principal.
            </li>
            <li className="text-gray-700">
              <span className="font-medium">Choisis le genre</span> : Indique si ton héros est un garçon ou une fille.
            </li>
            <li className="text-gray-700">
              <span className="font-medium">Ajoute une description</span> : Mentionne ce que ton héros aime faire, ses loisirs ou ses rêves.
            </li>
            <li className="text-gray-700">
              <span className="font-medium">Choisis un trait de caractère</span> : Ce trait sera mis en avant dans l'histoire pour rendre ton héros unique.
            </li>
            <li className="text-gray-700">
              <span className="font-medium">Personnalise l'apparence</span> : Tu pourras choisir comment ton personnage va ressembler visuellement.
            </li>
          </ol>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PersonnalisationHero;
