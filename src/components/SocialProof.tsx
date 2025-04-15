
import React from 'react';
import { Star } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Review = ({ stars = 5, quote, name, relation }: { stars: number, quote: string, name: string, relation: string }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm h-full">
    <div className="mb-4 flex">
      {[...Array(stars)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />)}
    </div>
    <p className="text-gray-600 italic mb-4">
      {quote}
    </p>
    <div className="flex items-center">
      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
        <span className="font-bold text-purple-600">{name[0]}</span>
      </div>
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-gray-500">{relation}</p>
      </div>
    </div>
  </div>
);

const reviews = [
  {
    quote: "Le livre est magnifique, les illustrations sont splendides et mon fils adore être le héros de l'histoire !",
    name: "Marie",
    relation: "Maman de Tom, 6 ans",
    stars: 5
  },
  {
    quote: "Un cadeau original qui a vraiment fait la différence. Livraison rapide et service client impeccable !",
    name: "Pierre",
    relation: "Oncle de Léa, 5 ans",
    stars: 5
  },
  {
    quote: "C'est devenu notre livre préféré pour le rituel du soir. Ma fille le réclame tous les jours !",
    name: "Sophie",
    relation: "Maman de Chloé, 4 ans",
    stars: 5
  }
];

const SocialProof = () => {
  const isMobile = useIsMobile();

  return (
    <section className="py-20 bg-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-4">
          Ce que pensent nos clients
        </h2>
        
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex justify-center mb-6">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />)}
          </div>
          <p className="text-center text-lg text-gray-600">Des milliers d'enfants ravis avec une note moyenne de 4.9/5</p>
        </div>
        
        {isMobile ? (
          <div className="relative w-full max-w-sm mx-auto">
            <Carousel
              opts={{
                align: "center",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {reviews.map((review, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <Review {...review} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-4 mt-6">
                <CarouselPrevious className="static transform-none" />
                <CarouselNext className="static transform-none" />
              </div>
            </Carousel>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {reviews.map((review, index) => (
              <Review key={index} {...review} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SocialProof;
