import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ChevronRight, ChevronLeft, User, Heart, Wand2, Palette } from 'lucide-react';
import CartoonCharacter from '@/components/CartoonCharacter';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  heroName: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  heroAge: z.string().min(1, { message: "L'âge est requis" }),
  heroDescription: z.string().optional(),
  heroTrait: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const PersonnalisationHero = () => {
  const [progress, setProgress] = useState(40);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      heroName: '',
      heroAge: '',
      heroDescription: '',
      heroTrait: '',
    }
  });
  
  const onSubmit = (data: FormValues) => {
    console.log("Données du héros:", data);
    // Ici vous pourriez stocker les données dans un contexte global ou localStorage
    // pour les utiliser dans les étapes suivantes
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
        
        <div className="mb-10 max-w-xl mx-auto">
          <div className="flex justify-between text-sm font-medium text-gray-500 mb-2">
            <span>Étape 2 sur 5</span>
            <span>{progress}% complété</span>
          </div>
          <Progress value={progress} className="h-2 bg-gray-200" />
        </div>

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
              {form.watch('heroTrait') && (
                <div className="mt-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full inline-block text-xs font-medium">
                  <Heart className="inline-block w-3 h-3 mr-1" /> 
                  {form.watch('heroTrait')}
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
                      <FormLabel>Trait de caractère principal</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Courageux, Curieux, Créatif..." {...field} />
                      </FormControl>
                      <FormDescription>
                        Ce trait sera mis en avant dans l'histoire
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-3 gap-4 mt-6">
                  <Card className="p-4 cursor-pointer hover:bg-purple-50 transition-colors border-2 border-transparent hover:border-purple-200">
                    <div className="flex flex-col items-center text-center">
                      <User className="h-8 w-8 text-purple-600 mb-2" />
                      <span className="text-sm font-medium">Personnage</span>
                    </div>
                  </Card>
                  
                  <Card className="p-4 cursor-pointer hover:bg-purple-50 transition-colors border-2 border-transparent hover:border-purple-200">
                    <div className="flex flex-col items-center text-center">
                      <Palette className="h-8 w-8 text-purple-600 mb-2" />
                      <span className="text-sm font-medium">Apparence</span>
                    </div>
                  </Card>
                  
                  <Card className="p-4 cursor-pointer hover:bg-purple-50 transition-colors border-2 border-transparent hover:border-purple-200">
                    <div className="flex flex-col items-center text-center">
                      <Wand2 className="h-8 w-8 text-purple-600 mb-2" />
                      <span className="text-sm font-medium">Pouvoirs</span>
                    </div>
                  </Card>
                </div>
                  
                <div className="flex justify-between items-center pt-4 border-t mt-8">
                  <Link to="/creation-livre">
                    <Button variant="outline" type="button">
                      <ChevronLeft className="mr-2 h-4 w-4" /> Retour
                    </Button>
                  </Link>
                  <Link to="/story-elements">
                    <Button 
                      type="button"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      Continuer <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
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
