
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface BookPreviewProps {
  storyTitle: string;
  heroName: string;
  storyContent: string[];
  illustrations: string[];
  onContinue: () => void;
}

const BookPreview: React.FC<BookPreviewProps> = ({
  storyTitle,
  heroName,
  storyContent,
  illustrations,
  onContinue
}) => {
  const navigate = useNavigate();
  
  // Assurer qu'il y a au moins une illustration
  const coverImage = illustrations && illustrations.length > 0 
    ? illustrations[0]
    : 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158';
  
  return (
    <div className="w-full max-w-4xl mx-auto my-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-purple-800">
          Aperçu de ton livre
        </h2>
        <p className="text-gray-600">
          Feuillette les pages pour découvrir le début de l'histoire
        </p>
      </div>
      
      <Carousel className="w-full bg-white rounded-xl shadow-lg p-4">
        <CarouselContent>
          {/* Page 1: Couverture */}
          <CarouselItem>
            <Card className="border-0 shadow-none">
              <CardContent className="p-0">
                <div className="aspect-[4/3] relative overflow-hidden rounded-lg border-8 border-purple-100 bg-gradient-to-b from-purple-50 to-pink-50">
                  {/* Image de couverture */}
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={coverImage} 
                      alt="Couverture du livre" 
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-transparent" />
                  </div>
                  
                  {/* Texte de couverture */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-8 text-center">
                    <div className="bg-white/90 rounded-lg p-6 shadow-lg transform -rotate-2">
                      <h3 className="text-2xl md:text-4xl font-bold text-purple-800 mb-2">
                        {storyTitle || "L'incroyable aventure"}
                      </h3>
                      <p className="text-lg md:text-xl text-purple-600 italic mb-4">
                        avec {heroName || "notre héros"}
                      </p>
                      <div className="text-sm text-gray-500">Une histoire personnalisée</div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-4 right-4 text-white/70 text-sm">
                    Page 1/5
                  </div>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
          
          {/* Pages de contenu (2-4) */}
          {[0, 1, 2].map((index) => (
            <CarouselItem key={`story-page-${index}`}>
              <Card className="border-0 shadow-none">
                <CardContent className="p-0">
                  <div className="aspect-[4/3] flex overflow-hidden rounded-lg border-8 border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50">
                    {/* Illustration */}
                    <div className="w-1/2 p-4 relative">
                      <div className="h-full w-full rounded-lg overflow-hidden shadow-md">
                        <img 
                          src={illustrations[index + 1] || illustrations[0] || coverImage} 
                          alt={`Illustration page ${index + 2}`} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                    
                    {/* Texte */}
                    <div className="w-1/2 p-4">
                      <ScrollArea className="h-full pr-4">
                        <div className="prose prose-sm md:prose-base prose-purple">
                          <p className="first-letter:text-3xl first-letter:font-bold first-letter:text-purple-600 first-letter:float-left first-letter:mr-1">
                            {storyContent[index] || "Il était une fois, dans un monde magique, un jeune héros qui s'appelait " + heroName + ". Ce héros était connu pour son courage et sa gentillesse..."}
                          </p>
                        </div>
                      </ScrollArea>
                    </div>
                    
                    <div className="absolute bottom-4 right-4 text-purple-800/70 text-sm">
                      Page {index + 2}/5
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
          
          {/* Page 5: Message final */}
          <CarouselItem>
            <Card className="border-0 shadow-none">
              <CardContent className="p-0">
                <div className="aspect-[4/3] relative overflow-hidden rounded-lg border-8 border-purple-100 bg-gradient-to-br from-purple-200 to-pink-100">
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                    <BookOpen className="h-16 w-16 text-purple-500 mb-6" />
                    <h3 className="text-2xl md:text-3xl font-bold text-purple-800 mb-4">
                      Tu veux lire la suite?
                    </h3>
                    <p className="text-lg text-purple-600 mb-8 max-w-md">
                      Passe à l'étape suivante pour continuer ou recevoir ton livre complet.
                    </p>
                    <Button 
                      onClick={onContinue}
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-2 rounded-full shadow-lg"
                    >
                      Continuer l'aventure
                    </Button>
                  </div>
                  
                  <div className="absolute bottom-4 right-4 text-purple-800/70 text-sm">
                    Page 5/5
                  </div>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        </CarouselContent>
        
        <div className="flex items-center justify-between mt-4">
          <CarouselPrevious className="relative -left-0 bg-white shadow-md" />
          <div className="text-center text-sm text-purple-600">
            Fais glisser pour tourner les pages
          </div>
          <CarouselNext className="relative -right-0 bg-white shadow-md" />
        </div>
      </Carousel>
      
      <div className="flex justify-center mt-8">
        <Button
          onClick={onContinue}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          Passer à l'étape suivante
        </Button>
      </div>
    </div>
  );
};

export default BookPreview;
