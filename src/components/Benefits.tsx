import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useIsMobile } from '@/hooks/use-mobile';
const Benefits = () => {
  const isMobile = useIsMobile();
  const formats = [{
    title: "Format papier",
    icon: "/lovable-uploads/42d2ab14-7e86-4008-9f16-3a830a09c095.png",
    description: "Livre imprimé en haute qualité avec pages épaisses et couverture rigide",
    bgColor: "bg-purple-100",
    hoverBgColor: "group-hover:bg-purple-200"
  }, {
    title: "Pack Livre + eBook",
    icon: "/lovable-uploads/42d2ab14-7e86-4008-9f16-3a830a09c095.png",
    description: "Le meilleur des deux mondes - livre papier + ebook avec 10% de réduction",
    isPopular: true,
    bgColor: "bg-yellow-100",
    hoverBgColor: "group-hover:bg-yellow-200"
  }, {
    title: "Ebook PDF",
    icon: "/lovable-uploads/42d2ab14-7e86-4008-9f16-3a830a09c095.png",
    description: "Livraison instantanée par email, lisible sur tous les appareils",
    bgColor: "bg-pink-100",
    hoverBgColor: "group-hover:bg-pink-200"
  }];
  const FormatCard = ({
    format,
    index
  }) => <Link to="/creation-livre" className="group relative">
      {format.isPopular}
      <div className="flex flex-col items-center text-center p-4">
        {format.isPopular && <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm">
            Le plus populaire
          </div>}
        <div className={`w-20 h-20 ${format.bgColor} rounded-full flex items-center justify-center mb-4 ${format.hoverBgColor} transition-colors`}>
          <img src={format.icon} alt={`${format.title} Icon`} className="w-10 h-10 object-contain opacity-30" />
        </div>
        <h3 className="text-xl font-bold mb-2">{format.title}</h3>
        <p className="text-gray-600 mb-4">{format.description}</p>
      </div>
    </Link>;
  return <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          Choisissez votre format préféré
        </h2>
        
        {isMobile ? <div className="relative w-full max-w-sm mx-auto">
            <Carousel opts={{
          align: "center",
          loop: true
        }} className="w-full">
              <CarouselContent>
                {formats.map((format, index) => <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <FormatCard format={format} index={index} />
                  </CarouselItem>)}
              </CarouselContent>
              <div className="flex justify-center gap-4 mt-6">
                <CarouselPrevious className="static transform-none" />
                <CarouselNext className="static transform-none" />
              </div>
            </Carousel>
          </div> : <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12 max-w-5xl mx-auto">
            {formats.map((format, index) => <div key={index} className={`relative ${format.isPopular ? 'transform scale-110 z-10' : ''}`}>
                <FormatCard format={format} index={index} />
              </div>)}
          </div>}
      </div>
    </section>;
};
export default Benefits;