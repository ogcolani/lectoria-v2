
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartoonCharacter from '@/components/CartoonCharacter';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Sparkles, 
  Rocket, 
  Zap, 
  Laugh, 
  Scroll, 
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const CreationLivre = () => {
  const [step, setStep] = useState(1);
  const [storyType, setStoryType] = useState('');
  const [progress, setProgress] = useState(20);
  
  const handleSelectStoryType = (type: string) => {
    setStoryType(type);
  };
  
  const handleNextStep = () => {
    if (storyType) {
      setStep(prevStep => prevStep + 1);
      setProgress(prevProgress => prevProgress + 20);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-white">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
            Crée ton histoire personnalisée
          </span>
        </h1>
        
        <div className="mb-10 max-w-xl mx-auto">
          <div className="flex justify-between text-sm font-medium text-gray-500 mb-2">
            <span>Étape {step} sur 5</span>
            <span>{progress}% complété</span>
          </div>
          <Progress value={progress} className="h-2 bg-gray-200" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-1 flex flex-col items-center justify-center bg-purple-100 rounded-2xl p-6 order-2 lg:order-1">
            <div className="mb-4 text-center">
              <h3 className="text-xl font-bold mb-2">Ton personnage</h3>
              <p className="text-sm text-gray-600">Tu deviendras le héros de cette aventure !</p>
            </div>
            <div className="w-full max-w-[220px]">
              <CartoonCharacter />
            </div>
            <div className="mt-4 w-full">
              <p className="text-center text-purple-800 font-medium">
                {storyType ? `Prêt pour une histoire ${storyType} !` : "Choisis ton type d'histoire préféré !"}
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 order-1 lg:order-2">
            <h2 className="text-2xl font-bold mb-6">
              Choisis ton type d'histoire
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              <Card 
                className={`cursor-pointer hover:shadow-md transition-all ${storyType === 'aventure' ? 'ring-2 ring-purple-500 bg-purple-50' : ''}`}
                onClick={() => handleSelectStoryType('aventure')}
              >
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <Rocket className="h-10 w-10 text-purple-600 mb-3 mt-2" />
                  <h3 className="font-bold">Aventure</h3>
                  <p className="text-xs mt-1 text-gray-500">Explore des mondes inconnus</p>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer hover:shadow-md transition-all ${storyType === 'fantastique' ? 'ring-2 ring-purple-500 bg-purple-50' : ''}`}
                onClick={() => handleSelectStoryType('fantastique')}
              >
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <Sparkles className="h-10 w-10 text-purple-600 mb-3 mt-2" />
                  <h3 className="font-bold">Fantastique</h3>
                  <p className="text-xs mt-1 text-gray-500">Magie et créatures extraordinaires</p>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer hover:shadow-md transition-all ${storyType === 'science-fiction' ? 'ring-2 ring-purple-500 bg-purple-50' : ''}`}
                onClick={() => handleSelectStoryType('science-fiction')}
              >
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <Zap className="h-10 w-10 text-purple-600 mb-3 mt-2" />
                  <h3 className="font-bold">Science-Fiction</h3>
                  <p className="text-xs mt-1 text-gray-500">Voyages dans le futur</p>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer hover:shadow-md transition-all ${storyType === 'humour' ? 'ring-2 ring-purple-500 bg-purple-50' : ''}`}
                onClick={() => handleSelectStoryType('humour')}
              >
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <Laugh className="h-10 w-10 text-purple-600 mb-3 mt-2" />
                  <h3 className="font-bold">Humour</h3>
                  <p className="text-xs mt-1 text-gray-500">Histoires drôles et farfelues</p>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer hover:shadow-md transition-all ${storyType === 'féérique' ? 'ring-2 ring-purple-500 bg-purple-50' : ''}`}
                onClick={() => handleSelectStoryType('féérique')}
              >
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <Scroll className="h-10 w-10 text-purple-600 mb-3 mt-2" />
                  <h3 className="font-bold">Féérique</h3>
                  <p className="text-xs mt-1 text-gray-500">Contes et magie enchantés</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t">
              <p className="text-sm text-gray-500">À l'étape suivante, tu pourras personnaliser ton héros.</p>
              {storyType ? (
                <Link to="/personnalisation-hero">
                  <Button 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    Continuer <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <Button 
                  onClick={handleNextStep}
                  disabled={!storyType}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  Continuer <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-12 max-w-3xl mx-auto bg-purple-50 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4 text-center">Comment fonctionne la création de ton livre ?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-700 font-bold">1</span>
              </div>
              <h4 className="font-semibold mb-1">Choisis ton histoire</h4>
              <p className="text-sm text-gray-600">Sélectionne le type d'aventure que tu préfères</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-700 font-bold">2</span>
              </div>
              <h4 className="font-semibold mb-1">Personnalise ton héros</h4>
              <p className="text-sm text-gray-600">Crée un personnage qui te ressemble</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-700 font-bold">3</span>
              </div>
              <h4 className="font-semibold mb-1">Ajoute des détails</h4>
              <p className="text-sm text-gray-600">Choisis des valeurs et d'autres éléments d'histoire</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreationLivre;
