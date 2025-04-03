
import React from 'react';
import { Star } from 'lucide-react';

const SocialProof = () => {
  return (
    <section className="py-20 bg-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-4">
          Ce que pensent nos clients
        </h2>
        
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex justify-center mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
            ))}
          </div>
          <p className="text-center text-lg text-gray-600">
            Plus de 10 000 enfants ravis avec une note moyenne de 4.9/5
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="mb-4 flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-600 italic mb-4">
              "Le livre est magnifique, les illustrations sont splendides et mon fils adore être le héros de l'histoire !"
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                <span className="font-bold text-purple-600">M</span>
              </div>
              <div>
                <p className="font-medium">Marie</p>
                <p className="text-sm text-gray-500">Maman de Tom, 6 ans</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="mb-4 flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-600 italic mb-4">
              "Un cadeau original qui a vraiment fait la différence. Livraison rapide et service client impeccable !"
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                <span className="font-bold text-purple-600">P</span>
              </div>
              <div>
                <p className="font-medium">Pierre</p>
                <p className="text-sm text-gray-500">Oncle de Léa, 5 ans</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="mb-4 flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-600 italic mb-4">
              "C'est devenu notre livre préféré pour le rituel du soir. Ma fille le réclame tous les jours !"
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                <span className="font-bold text-purple-600">S</span>
              </div>
              <div>
                <p className="font-medium">Sophie</p>
                <p className="text-sm text-gray-500">Maman de Chloé, 4 ans</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
