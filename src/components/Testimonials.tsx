
import React from 'react';
import { Star } from 'lucide-react';

const TestimonialCard = ({
  quote,
  name,
  relation,
  stars = 5
}: {
  quote: string;
  name: string;
  relation: string;
  stars?: number;
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="mb-4 flex">
        {[...Array(stars)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
        ))}
      </div>
      <p className="text-gray-600 italic mb-4">{quote}</p>
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
          <span className="font-bold text-purple-600">{name.charAt(0)}</span>
        </div>
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-gray-500">{relation}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  return (
    <section className="py-20 bg-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <TestimonialCard 
            quote="Le livre est magnifique, les illustrations sont splendides et mon fils adore être le héros de l'histoire !"
            name="Marie"
            relation="Maman de Tom, 6 ans"
          />
          <TestimonialCard 
            quote="Un cadeau original qui a vraiment fait la différence. Livraison rapide et service client impeccable !"
            name="Pierre"
            relation="Oncle de Léa, 5 ans"
          />
          <TestimonialCard 
            quote="C'est devenu notre livre préféré pour le rituel du soir. Ma fille le réclame tous les jours !"
            name="Sophie"
            relation="Maman de Chloé, 4 ans"
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
