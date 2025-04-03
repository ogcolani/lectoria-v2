
import React from 'react';
import Button from './Button';

const JoinAdventure = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Rejoignez-nous à chaque étape de l'aventure</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-xl">
            <div className="flex flex-col items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                alt="Enfant lisant un livre"
                className="w-32 h-32 object-cover rounded-full mb-4"
              />
              <div className="text-center">
                <h3 className="font-bold text-xl mb-2">Donner vie à l'imaginaire</h3>
                <p className="text-gray-600 mb-4">
                  LECTORIA, L'art de Personnifier les Livres
                </p>
                <Button variant="outline">En savoir plus</Button>
              </div>
            </div>
            
            <div className="text-left flex flex-col justify-center">
              <p className="mb-4">
                Profitez de -10% de réduction<br />
                avec notre code promo sur tout le site !
              </p>
              <div className="flex space-x-4 mb-4">
                <input
                  type="text"
                  value="BIENVENUE10"
                  readOnly
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <Button>Copier</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinAdventure;
