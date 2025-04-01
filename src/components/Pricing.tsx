
import React from 'react';
import Button from './Button';

const PricingCard = ({ 
  title, 
  price, 
  description, 
  features,
  ctaText,
  popular = false
}: { 
  title: string; 
  price: string; 
  description: string;
  features: string[];
  ctaText: string;
  popular?: boolean;
}) => (
  <div className={`
    relative rounded-2xl p-6 
    ${popular ? 'bg-gradient-to-b from-purple-50 to-white border-2 border-purple-200 shadow-lg' : 'bg-white border border-gray-200 shadow-sm'}
    flex flex-col justify-between animate-fade-in
  `}>
    {popular && (
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-medium">
        Le plus populaire
      </div>
    )}
    <div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <div className="mb-4">
        <span className="text-3xl font-bold">{price}</span>
      </div>
      <p className="text-gray-600 mb-6">{description}</p>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
    <Button 
      variant={popular ? 'primary' : 'outline'} 
      className="w-full mt-4"
    >
      {ctaText}
    </Button>
  </div>
);

const Pricing = () => {
  return (
    <section id="pricing" className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">📦 Nos formats disponibles</h2>
        
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <PricingCard 
            title="eBook PDF"
            price="9,99 €"
            description="Envoi immédiat par email"
            features={[
              "Accès instantané",
              "Format PDF haute résolution",
              "Compatible tous appareils",
              "Impression à domicile possible"
            ]}
            ctaText="Choisir l'eBook"
          />
          <PricingCard 
            title="Livre imprimé"
            price="39,99 €"
            description="Livraison rapide à domicile"
            features={[
              "Couverture rigide de qualité",
              "Impression professionnelle",
              "Papier premium",
              "Envoi sous 24h après création"
            ]}
            popular={true}
            ctaText="Choisir le livre"
          />
          <PricingCard 
            title="Pack Livre + eBook"
            price="44,99 €"
            description="Pour le lire partout, tout le temps"
            features={[
              "Livre physique de qualité",
              "eBook en complément",
              "Accès immédiat à la version digitale",
              "Économisez 5€ sur l'ensemble"
            ]}
            ctaText="Choisir ce pack"
          />
        </div>
      </div>
    </section>
  );
};

export default Pricing;
