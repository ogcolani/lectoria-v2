
import React from 'react';
import { Link } from 'react-router-dom';

const Benefits = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          Choisissez votre format préféré
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12 max-w-5xl mx-auto">
          <Link to="/creation-livre" className="group">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                <img 
                  src="/lovable-uploads/42d2ab14-7e86-4008-9f16-3a830a09c095.png" 
                  alt="Book Icon" 
                  className="w-10 h-10 object-contain opacity-30"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Format papier</h3>
              <p className="text-gray-600 mb-4">Livre imprimé en haute qualité avec pages épaisses et couverture rigide</p>
            </div>
          </Link>
          
          <Link to="/creation-livre" className="group relative transform scale-110 z-10">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm">
              Le plus populaire
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:bg-yellow-200 transition-colors">
                <img 
                  src="/lovable-uploads/42d2ab14-7e86-4008-9f16-3a830a09c095.png" 
                  alt="Pack Icon" 
                  className="w-12 h-12 object-contain opacity-30"
                />
              </div>
              <h3 className="text-2xl font-bold mb-2">Pack complet</h3>
              <p className="text-gray-600 mb-4">Le meilleur des deux mondes - livre papier + ebook avec 10% de réduction</p>
            </div>
          </Link>
          
          <Link to="/creation-livre" className="group">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-pink-200 transition-colors">
                <img 
                  src="/lovable-uploads/42d2ab14-7e86-4008-9f16-3a830a09c095.png" 
                  alt="Ebook Icon" 
                  className="w-10 h-10 object-contain opacity-30"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Ebook PDF</h3>
              <p className="text-gray-600 mb-4">Livraison instantanée par email, lisible sur tous les appareils</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
