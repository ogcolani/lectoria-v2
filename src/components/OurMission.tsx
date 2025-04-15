import React from 'react';
import { BookOpen } from 'lucide-react';
const OurMission = () => {
  return <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl shadow-sm max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <BookOpen className="w-16 h-16 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-center">
            Notre mission
          </h3>
          <p className="text-gray-700 mb-6 text-center">Chez Lectoria, nous croyons que chaque enfant mérite une histoire qui lui ressemble. C'est pourquoi nous utilisons l'intelligence artificielle pour créer des livres personnalisés
 qui reflètent les intérêts, les valeurs et les rêves de votre enfant.

        </p>
          <p className="text-gray-700 text-center">Au-delà du divertissement, nos histoires transmettent des valeurs importantes comme la persévérance, l'empathie et la curiosité, tout en renforçant le lien parent-enfant 
à travers des moments de lecture partagés.
        </p>
        </div>
      </div>
    </section>;
};
export default OurMission;