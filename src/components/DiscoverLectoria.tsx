
import React from 'react';
import { Sparkles, Heart, Brain } from 'lucide-react';

const DiscoverLectoria = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Découvrez{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
              Lectoria
            </span>
          </h2>
          <p className="text-lg text-gray-600">
            Bien plus qu'un livre, une expérience magique qui transforme votre enfant en héros
          </p>
        </div>

        <div className="space-y-8">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Imagination sans limites</h3>
              <p className="text-gray-600">
                Lectoria crée des histoires uniques qui stimulent l'imagination de votre enfant et l'encouragent à rêver grand.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Confiance et estime de soi</h3>
              <p className="text-gray-600">
                En devenant le héros de son histoire, votre enfant développe sa confiance en lui et apprend à croire en ses capacités.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Brain className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Développement cognitif</h3>
              <p className="text-gray-600">
                Nos histoires sont conçues pour stimuler l'apprentissage, enrichir le vocabulaire et développer les capacités d'analyse.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoverLectoria;
