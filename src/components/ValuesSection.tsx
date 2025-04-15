
import React from 'react';
import { Zap, Gift, Sprout } from 'lucide-react';

const ValuesSection = () => {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">⚡ Personnalisation magique en 30 secondes</h3>
              <p className="text-gray-600">
                Créez un livre unique en quelques clics : prénom, apparence, style d'aventure… l'IA fait le reste. Une expérience fluide, rapide et captivante.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center mb-4">
                <Gift className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">🎁 Le cadeau parfait pour émerveiller les enfants</h3>
              <p className="text-gray-600">
                Bien plus qu'un livre : une aventure où ils deviennent les héros de l'histoire. Chaque page éveille leur imagination et crée un souvenir inoubliable.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Sprout className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">🌱 Des valeurs qui résonnent profondément</h3>
              <p className="text-gray-600">
                Quand un enfant se reconnaît dans une histoire, il apprend mieux. Nos récits personnalisés transmettent avec douceur des valeurs comme le courage, la persévérance ou la bienveillance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
