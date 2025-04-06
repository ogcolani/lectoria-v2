
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, Heart, Star, Wand2, Sparkles, Zap, Lightbulb } from 'lucide-react';
import CartoonCharacter from '@/components/CartoonCharacter';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const StoryElements = () => {
  const [progress, setProgress] = useState(60);
  const [values, setValues] = useState<string[]>([]);
  const [elements, setElements] = useState<string[]>([]);
  const { toast } = useToast();
  
  const availableValues = [
    { id: 'courage', label: 'Courage', icon: <Heart className="h-5 w-5 text-purple-600" /> },
    { id: 'perseverance', label: 'Persévérance', icon: <Zap className="h-5 w-5 text-purple-600" /> },
    { id: 'amitie', label: 'Amitié', icon: <Heart className="h-5 w-5 text-purple-600" /> },
    { id: 'curiosite', label: 'Curiosité', icon: <Lightbulb className="h-5 w-5 text-purple-600" /> },
    { id: 'respect', label: 'Respect', icon: <Star className="h-5 w-5 text-purple-600" /> },
    { id: 'creativite', label: 'Créativité', icon: <Wand2 className="h-5 w-5 text-purple-600" /> }
  ];
  
  const storyElements = [
    { id: 'magicObject', label: 'Un objet magique', icon: <Wand2 className="h-5 w-5 text-purple-600" /> },
    { id: 'friend', label: 'Un ami fidèle', icon: <Heart className="h-5 w-5 text-purple-600" /> },
    { id: 'villain', label: 'Un méchant à affronter', icon: <Zap className="h-5 w-5 text-purple-600" /> },
    { id: 'challenge', label: 'Une épreuve difficile', icon: <Star className="h-5 w-5 text-purple-600" /> },
    { id: 'surprise', label: 'Un rebondissement surprise', icon: <Sparkles className="h-5 w-5 text-purple-600" /> },
    { id: 'lesson', label: 'Une leçon à apprendre', icon: <Lightbulb className="h-5 w-5 text-purple-600" /> }
  ];

  const handleValueToggle = (id: string) => {
    setValues(current => {
      // Limit to 3 selections
      if (current.includes(id)) {
        return current.filter(value => value !== id);
      } else {
        if (current.length >= 3) {
          toast({
            title: "Maximum 3 valeurs",
            description: "Tu ne peux choisir que 3 valeurs pour ton histoire.",
            variant: "destructive"
          });
          return current;
        }
        return [...current, id];
      }
    });
  };

  const handleElementToggle = (id: string) => {
    setElements(current => {
      // Limit to 3 selections
      if (current.includes(id)) {
        return current.filter(element => element !== id);
      } else {
        if (current.length >= 3) {
          toast({
            title: "Maximum 3 éléments",
            description: "Tu ne peux choisir que 3 éléments pour ton histoire.",
            variant: "destructive"
          });
          return current;
        }
        return [...current, id];
      }
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
        
        <div className="mb-10 max-w-xl mx-auto">
          <div className="flex justify-between text-sm font-medium text-gray-500 mb-2">
            <span>Étape 3 sur 5</span>
            <span>{progress}% complété</span>
          </div>
          <Progress value={progress} className="h-2 bg-gray-200" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-1 flex flex-col items-center justify-start bg-purple-100 rounded-2xl p-6 order-2 lg:order-1">
            <div className="mb-4 text-center">
              <h3 className="text-xl font-bold mb-2">Ton aventure</h3>
              <p className="text-sm text-gray-600">Voici ce que tu as choisi pour ton histoire !</p>
            </div>
            <div className="w-full max-w-[220px]">
              <CartoonCharacter />
            </div>
            <div className="mt-6 p-4 bg-white rounded-xl shadow-sm w-full">
              <h4 className="font-bold text-lg mb-3">Éléments de ton histoire</h4>
              
              {values.length > 0 ? (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Valeurs choisies :</p>
                  <div className="flex flex-wrap gap-2">
                    {values.map(id => {
                      const value = availableValues.find(v => v.id === id);
                      return value ? (
                        <div key={id} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium flex items-center gap-1">
                          {value.icon}
                          {value.label}
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500 mb-3">Choisis des valeurs pour ton histoire...</p>
              )}
              
              {elements.length > 0 ? (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Éléments d'histoire :</p>
                  <div className="flex flex-wrap gap-2">
                    {elements.map(id => {
                      const element = storyElements.find(e => e.id === id);
                      return element ? (
                        <div key={id} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium flex items-center gap-1">
                          {element.icon}
                          {element.label}
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500">Choisis des éléments pour ton histoire...</p>
              )}
            </div>
          </div>
          
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 order-1 lg:order-2">
            <h2 className="text-2xl font-bold mb-6">
              Donne vie à ton histoire
            </h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Choisis jusqu'à 3 valeurs pour ton histoire</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {availableValues.map((value) => (
                    <Card 
                      key={value.id}
                      className={`cursor-pointer hover:shadow-md transition-all p-4 ${values.includes(value.id) ? 'ring-2 ring-purple-500 bg-purple-50' : ''}`}
                      onClick={() => handleValueToggle(value.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          <Checkbox 
                            id={`value-${value.id}`} 
                            checked={values.includes(value.id)}
                            onCheckedChange={() => handleValueToggle(value.id)}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          {value.icon}
                          <Label htmlFor={`value-${value.id}`} className="cursor-pointer">
                            {value.label}
                          </Label>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">Ces valeurs seront mises en avant dans l'histoire.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Choisis jusqu'à 3 éléments d'histoire</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {storyElements.map((element) => (
                    <Card 
                      key={element.id}
                      className={`cursor-pointer hover:shadow-md transition-all p-4 ${elements.includes(element.id) ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}
                      onClick={() => handleElementToggle(element.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          <Checkbox 
                            id={`element-${element.id}`} 
                            checked={elements.includes(element.id)}
                            onCheckedChange={() => handleElementToggle(element.id)}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          {element.icon}
                          <Label htmlFor={`element-${element.id}`} className="cursor-pointer">
                            {element.label}
                          </Label>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">Ces éléments rendront ton histoire plus intéressante.</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t mt-8">
              <Link to="/personnalisation-hero">
                <Button variant="outline" type="button">
                  <ChevronLeft className="mr-2 h-4 w-4" /> Retour
                </Button>
              </Link>
              <Link to="/creer-mon-livre">
                <Button 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  Continuer <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-12 max-w-5xl mx-auto bg-purple-50 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4 text-center">Comment personnaliser ton histoire ?</h3>
          <ol className="list-decimal list-inside space-y-3 ml-4">
            <li className="text-gray-700">
              <span className="font-medium">Choisis des valeurs</span> : Sélectionne jusqu'à 3 valeurs que tu souhaites mettre en avant dans ton histoire.
            </li>
            <li className="text-gray-700">
              <span className="font-medium">Ajoute des éléments d'histoire</span> : Sélectionne jusqu'à 3 éléments qui rendront ton histoire plus intéressante.
            </li>
            <li className="text-gray-700">
              <span className="font-medium">Prévisualisation</span> : Tu peux voir un aperçu des éléments que tu as choisis sur le côté gauche.
            </li>
            <li className="text-gray-700">
              <span className="font-medium">Poursuis l'aventure</span> : Une fois que tu es satisfait de tes choix, continue vers l'étape suivante.
            </li>
          </ol>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default StoryElements;
