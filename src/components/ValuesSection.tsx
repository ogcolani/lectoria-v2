
import React from 'react';
import { Sprout, Heart, Shield } from 'lucide-react';

const ValuesSection = () => {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Sprout className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-gray-600 text-sm">Écologique et durable avec papier recyclé certifié</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-red-600" />
              </div>
              <p className="text-gray-600 text-sm">Fabriqué avec amour en France</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-gray-600 text-sm">Valeurs éducatives validées par des professionnels</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
