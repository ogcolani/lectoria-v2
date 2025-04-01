
import React from 'react';
import { Star } from 'lucide-react';

const TestimonialCard = ({ quote, name, relation, stars = 5 }: { quote: string; name: string; relation: string; stars?: number }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 animate-fade-in">
    <div className="flex mb-4">
      {[...Array(stars)].map((_, i) => (
        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
      ))}
    </div>
    <blockquote className="text-gray-700 mb-4 italic">"{quote}"</blockquote>
    <div className="font-medium">
      {name}, <span className="text-gray-500">{relation}</span>
    </div>
  </div>
);

const Testimonials = () => {
  return (
    <section id="testimonials" className="section-padding bg-lectoria-purple/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">💛 Ils ont créé un moment magique</h2>
        
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <TestimonialCard 
            quote="J'ai vu les yeux de ma fille s'illuminer en découvrant son prénom dans l'histoire."
            name="Sophie"
            relation="maman de Jade (6 ans)"
          />
          <TestimonialCard 
            quote="Mon fils ne se lasse pas de demander cette histoire chaque soir. C'est devenu notre rituel préféré."
            name="Thomas"
            relation="papa de Lucas (4 ans)"
          />
          <TestimonialCard 
            quote="Un cadeau d'anniversaire qui a fait mouche ! Ma nièce était émerveillée d'être l'héroïne de sa propre aventure."
            name="Marie"
            relation="tante de Léa (7 ans)"
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
