
import React from 'react';

const Step = ({ number, title, description }: { number: string; title: string; description: string }) => (
  <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 animate-fade-in">
    <div className="w-12 h-12 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full font-bold text-lg mb-4">
      {number}
    </div>
    <h3 className="text-xl font-bold mb-2 text-center">{title}</h3>
    <p className="text-gray-600 text-center">{description}</p>
  </div>
);

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="section-padding bg-lectoria-gray/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">✨ Un livre unique en 3 étapes simples</h2>
        
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <Step 
            number="1️⃣"
            title="Vous personnalisez"
            description="Prénom, goûts, univers préféré de votre enfant - c'est vous qui décidez !"
          />
          <Step 
            number="2️⃣"
            title="L'IA crée l'histoire"
            description="Texte et illustrations générés automatiquement selon vos choix."
          />
          <Step 
            number="3️⃣"
            title="Vous recevez le livre"
            description="Chez vous en version papier, ou directement par email en eBook."
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
