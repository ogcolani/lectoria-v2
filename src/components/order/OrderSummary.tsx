
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import StoryIllustration from '@/components/StoryIllustration';

interface OrderSummaryProps {
  heroName: string;
  heroAge: string;
  heroGender?: 'garçon' | 'fille';
  heroDescription?: string;
  heroTrait?: string;
  selectedValues: string[];
  storyPreview: string;
  illustrationUrl: string | null;
  pageCount: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  heroName,
  heroAge,
  heroGender,
  heroDescription,
  heroTrait,
  selectedValues,
  storyPreview,
  illustrationUrl,
  pageCount
}) => {
  // Extraire le titre de l'histoire (première ligne commençant par #)
  const storyLines = storyPreview.split('\n');
  const storyTitle = storyLines.find(line => line.startsWith('# '))?.substring(2) || 'Histoire personnalisée';
  
  // Extraire les paragraphes du contenu (sans le titre et les lignes vides)
  const storyContent = storyLines
    .filter(line => !line.startsWith('# ') && line.trim() !== '')
    .slice(0, 2) // Limiter à 2 paragraphes pour l'aperçu
    .join('\n\n');
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card className="p-6 bg-purple-50 rounded-xl">
        <h3 className="text-xl font-semibold mb-4">Détails du héros</h3>
        
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Prénom:</span>
            <span className="font-medium">{heroName}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Âge:</span>
            <span className="font-medium">{heroAge} ans</span>
          </div>
          
          {heroGender && (
            <div className="flex justify-between">
              <span className="text-gray-600">Genre:</span>
              <span className="font-medium capitalize">{heroGender}</span>
            </div>
          )}
          
          {heroTrait && (
            <div className="flex justify-between">
              <span className="text-gray-600">Trait principal:</span>
              <span className="font-medium">{heroTrait}</span>
            </div>
          )}
          
          {heroDescription && (
            <div>
              <span className="text-gray-600 block mb-1">Description:</span>
              <p className="text-sm italic bg-white p-2 rounded">{heroDescription}</p>
            </div>
          )}
          
          <div>
            <span className="text-gray-600 block mb-2">Valeurs:</span>
            <div className="flex flex-wrap gap-2">
              {selectedValues.map((value) => (
                <Badge key={value} variant="outline" className="bg-white">
                  {value}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Nombre de pages:</span>
            <span className="font-medium">{pageCount} pages</span>
          </div>
        </div>
      </Card>
      
      <div className="flex flex-col space-y-4">
        <div className="h-52 overflow-hidden rounded-xl">
          <StoryIllustration 
            imageUrl={illustrationUrl} 
            isGenerating={false}
            altText={`Illustration pour l'histoire de ${heroName}`}
          />
        </div>
        
        <Card className="flex-1 p-6 bg-white">
          <h3 className="text-xl font-semibold mb-2">{storyTitle}</h3>
          <p className="text-sm text-gray-700 line-clamp-6">{storyContent}</p>
          {storyContent && (
            <div className="text-sm text-gray-500 mt-2 italic">
              Aperçu de l'histoire ({pageCount} pages au total)
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default OrderSummary;
