
import React from 'react';
import { Zap, Gift, Sprout } from 'lucide-react';

const ValuesSection = () => {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center">
                <Zap className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold leading-snug">
                ⚡ Personnalisation magique <br />en 30 secondes
              </h3>
              <p className="text-gray-600 text-sm max-w-xs leading-relaxed">
                Créez un livre unique en quelques clics. <br />
                Prénom, apparence, style d'aventure… <br />
                L'IA fait le reste, de manière fluide et captivante.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center">
                <Gift className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-lg font-semibold leading-snug">
                🎁 Le cadeau parfait pour <br />émerveiller les enfants
              </h3>
              <p className="text-gray-600 text-sm max-w-xs leading-relaxed">
                Bien plus qu'un livre : <br />une aventure unique. <br />
                Ils deviennent les héros de l'histoire, <br />
                éveillant leur imagination à chaque page.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <Sprout className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold leading-snug">
                🌱 Des valeurs qui <br />résonnent profondément
              </h3>
              <p className="text-gray-600 text-sm max-w-xs leading-relaxed">
                Quand un enfant se reconnaît <br />
                dans une histoire, il apprend mieux. <br />
                Nos récits personnalisés transmettent <br />
                avec douceur des valeurs comme <br />
                le courage, la persévérance <br />
                ou la bienveillance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
