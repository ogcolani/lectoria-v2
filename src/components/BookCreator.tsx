
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Scroll, Sparkles, Rocket, BookOpen, Laugh } from 'lucide-react';

const BookCreator = () => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(1);
  
  const handleNextStep = () => {
    setStep(prev => prev + 1);
    setProgress(prev => prev + 33); // Approximation pour 3 étapes
  };
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Créez votre livre personnalisé</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Suivez ces quelques étapes pour créer un livre unique où votre enfant devient le héros
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <span>Informations</span>
              <span>Personnalisation</span>
              <span>Finalisation</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Dialog>
              <DialogTrigger asChild>
                <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
                      <Scroll className="w-7 h-7 text-purple-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-center mb-2">Histoire Personnalisée</h3>
                  <p className="text-sm text-gray-600 text-center">
                    Choisissez le thème et les valeurs de l'histoire
                  </p>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Histoire Personnalisée</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p>Choisissez parmi nos thèmes d'aventure et les valeurs que vous souhaitez transmettre.</p>
                </div>
              </DialogContent>
            </Dialog>
            
            <Dialog>
              <DialogTrigger asChild>
                <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Sparkles className="w-7 h-7 text-yellow-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-center mb-2">Héros sur Mesure</h3>
                  <p className="text-sm text-gray-600 text-center">
                    Personnalisez les traits et l'apparence du héros
                  </p>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Héros sur Mesure</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p>Décrivez votre enfant pour que nous puissions créer un héros qui lui ressemble.</p>
                </div>
              </DialogContent>
            </Dialog>
            
            <Dialog>
              <DialogTrigger asChild>
                <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center">
                      <BookOpen className="w-7 h-7 text-pink-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-center mb-2">Format et Livraison</h3>
                  <p className="text-sm text-gray-600 text-center">
                    Choisissez le format du livre et les options de livraison
                  </p>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Format et Livraison</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p>Sélectionnez le format qui vous convient le mieux et les options de livraison disponibles.</p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="text-center">
            <Button onClick={handleNextStep} className="px-8">
              Commencer l'aventure
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookCreator;
