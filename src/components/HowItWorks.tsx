import React from 'react';
import { Star, BookOpen, PenTool, Truck } from 'lucide-react';
const HowItWorks = () => {
  return <section id="how-it-works" className="py-16 bg-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          Comment ça fonctionne
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left column - Steps */}
          <div className="space-y-6 my-[24px]">
            <div className="bg-white p-6 rounded-xl shadow-sm flex">
              <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Imaginez son héros</h3>
                <p className="text-gray-600">Décrivez-le en quelques mots.</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm flex">
              <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Choisissez</h3>
                <p className="text-gray-600">Sélectionnez une aventure

puis laissez vous porter par la magie 
              </p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm flex">
              <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Validez</h3>
                <p className="text-gray-600">Vérifiez votre histoire et passez commande</p>
              </div>
            </div>
            
            
          </div>
          
          {/* Right column - Preview */}
          <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
            <div className="w-full max-w-xs">
              <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80" alt="Livre personnalisé" className="w-full rounded-lg shadow-md mb-4" />
              <div className="flex justify-between items-center mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />)}
                </div>
                <span className="text-sm text-gray-500">4.9/5</span>
              </div>
              <div className="flex justify-between mt-6">
                <div className="flex items-center">
                  <BookOpen className="w-5 h-5 text-purple-600 mr-2" />
                  <span className="text-sm">24 pages</span>
                </div>
                <div className="flex items-center">
                  <PenTool className="w-5 h-5 text-purple-600 mr-2" />
                  <span className="text-sm">Haute qualité</span>
                </div>
                <div className="flex items-center">
                  <Truck className="w-5 h-5 text-purple-600 mr-2" />
                  <span className="text-sm">3-5 jours</span>
                </div>
              </div>
            </div>
            
            <div className="w-full border-t border-gray-200 my-6"></div>
            
            <div className="progress-bar w-full bg-gray-200 rounded-full h-3 mt-4 overflow-hidden">
              <div className="bg-purple-600 h-3 rounded-full" style={{
              width: '75%'
            }}></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">3/4 étapes complétées</p>
          </div>
        </div>
      </div>
    </section>;
};
export default HowItWorks;