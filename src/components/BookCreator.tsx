
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from '@/components/ui/dialog';
import { Scroll, Sparkles, Rocket, BookOpen, Laugh } from 'lucide-react';

const BookCreator = () => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(1);

  const handleNextStep = () => {
    setStep(prev => prev + 1);
    setProgress(prev => prev + 33); // Approximation pour 3 étapes
  };

  return (
    <section id="book-creator" className="py-16 bg-[#f9f3e0] rounded-lg my-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-navy-900 mb-8">
          SON AVENTURE COMMENCE ICI
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h3 className="text-xl font-bold">COMMENT ÇA MARCHE ?</h3>
            <ol className="space-y-6">
              <li className="flex gap-3">
                <span className="font-bold text-purple-600">1.</span>
                <div>
                  <span className="font-bold">Choisissez un style de lecture :</span>
                  <p>aventure, fantastique, conte de fées...</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-purple-600">2.</span>
                <div>
                  <span className="font-bold">Personnalisez le personnage :</span>
                  <p>prénom et son apparence.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-purple-600">3.</span>
                <div>
                  <span className="font-bold">Ajoutez des valeurs essentielles :</span>
                  <p>courage, bienveillance, ou même l'honnêteté.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-purple-600">4.</span>
                <div>
                  <span className="font-bold">Adaptez l'histoire et rendez-la unique</span>
                </div>
              </li>
            </ol>
            <div className="text-center sm:text-left">
              <p className="font-semibold mt-4">En quelques minutes, votre livre est prêt !</p>
              <p>Offrez une aventure inoubliable à votre enfant !</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="mb-8 relative">
              <img 
                src="https://images.unsplash.com/photo-1507034589631-9433cc6bc453?ixlib=rb-4.0.3&auto=format&fit=crop&w=2900&q=80" 
                alt="Personnage dans une forêt magique" 
                className="rounded-lg shadow-lg w-full max-w-md h-auto object-cover"
              />
              
              <div className="absolute top-4 right-4 bg-white/90 p-3 rounded-lg shadow-md">
                <h4 className="text-lg font-bold text-purple-800">Niveau 1</h4>
                <p className="text-gray-700">choisir le type d'histoire</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6 w-full max-w-md">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <div className="bg-gray-200 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-300 transition-colors">
                    <Sparkles className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                    <p className="text-xs font-bold">FANTASTIQUE</p>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <p>Des histoires avec magie et créatures extraordinaires.</p>
                </HoverCardContent>
              </HoverCard>

              <HoverCard>
                <HoverCardTrigger asChild>
                  <div className="bg-gray-200 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-300 transition-colors">
                    <Rocket className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                    <p className="text-xs font-bold">AVENTURE</p>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <p>Des voyages passionnants et des découvertes incroyables.</p>
                </HoverCardContent>
              </HoverCard>

              <HoverCard>
                <HoverCardTrigger asChild>
                  <div className="bg-gray-200 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-300 transition-colors">
                    <Scroll className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                    <p className="text-xs font-bold">CONTE DE FÉE</p>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <p>Des histoires enchantées avec princes, princesses et créatures magiques.</p>
                </HoverCardContent>
              </HoverCard>

              <HoverCard>
                <HoverCardTrigger asChild>
                  <div className="bg-gray-200 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-300 transition-colors">
                    <Laugh className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                    <p className="text-xs font-bold">HUMOUR</p>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <p>Des histoires amusantes qui feront rire votre enfant.</p>
                </HoverCardContent>
              </HoverCard>
            </div>

            <div className="w-full max-w-md space-y-4">
              <div className="space-y-2">
                <Progress value={progress} className="h-2" />
                <p className="text-center">{progress}%</p>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="w-full bg-[#e05f77] hover:bg-[#d94b65]">
                    NIVEAU 2<br />
                    PERSONNALISATION PERSONNAGE
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Personnalisation du personnage</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <p>Cette fonctionnalité sera bientôt disponible !</p>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookCreator;
