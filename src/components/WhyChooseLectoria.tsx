
import React from 'react';
import { Check } from 'lucide-react';

const FeatureItem = ({ title, description }: { title: string; description: string }) => (
  <div className="flex space-x-4 animate-fade-in">
    <div className="flex-shrink-0">
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100">
        <Check className="w-6 h-6 text-purple-600" />
      </div>
    </div>
    <div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const WhyChooseLectoria = () => {
  return (
    <section id="why-choose-us" className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">🎯 Bien plus qu'un livre… une expérience unique</h2>
        
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 mt-12">
          <FeatureItem 
            title="Un cadeau unique & intelligent"
            description="Chaque enfant est unique, son histoire aussi. Lectoria propose une aventure à son image."
          />
          <FeatureItem 
            title="Simple et rapide à créer"
            description="Personnalisez en 2 minutes, commandez, recevez. Pas plus compliqué que ça."
          />
          <FeatureItem 
            title="Livraison rapide à domicile ou eBook immédiat"
            description="Gagnez du temps et faites plaisir facilement."
          />
          <FeatureItem 
            title="Paiement 100% sécurisé"
            description="Via Stripe. Support client humain et réactif."
          />
          <FeatureItem 
            title="Un souvenir émotionnel qui dure"
            description="Bien plus qu'un jouet. Un livre qu'on relira ensemble pendant des années."
          />
        </div>
      </div>
    </section>
  );
};

export default WhyChooseLectoria;
