
import React from 'react';
import Button from './Button';

const HeroNew = () => {
  return (
    <section className="w-full bg-gradient-to-b from-purple-50 via-white to-purple-50 pt-16 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center">
            Le seul livre personnalisé qui fait <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
              rêver votre enfant à l'aide d'IA génial !
            </span>
          </h1>
          
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Un cadeau inoubliable qui booste son imagination et ses valeurs essentielles
          </p>
          
          <div className="mt-8 mb-12 flex justify-center">
            <Button size="lg" className="px-8 py-4">
              Créer mon livre personnalisé
            </Button>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80"
                  alt="Livre personnalisé"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="font-bold">Livre Aventure</h3>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-white">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">BEST-SELLER</span>
                  <span className="text-lg font-bold text-purple-600">49,90 €</span>
                </div>
                <Button variant="outline" className="w-full mt-3">Choisir</Button>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105 ring-2 ring-purple-400">
              <div className="absolute top-0 right-4 bg-purple-600 text-white px-3 py-1 text-sm font-medium rounded-b-lg">
                -10%
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1471440671318-55bdbb772f93?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Pack complet"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="font-bold">Pack Premium</h3>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-white">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">PACK</span>
                  <div>
                    <span className="text-sm line-through text-gray-400 mr-2">55,00 €</span>
                    <span className="text-lg font-bold text-purple-600">49,90 €</span>
                  </div>
                </div>
                <Button className="w-full mt-3">Choisir</Button>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Ebook"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="font-bold">E-Book</h3>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-white">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">LIVRAISON IMMÉDIATE</span>
                  <span className="text-lg font-bold text-purple-600">14,90 €</span>
                </div>
                <Button variant="outline" className="w-full mt-3">Choisir</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroNew;
