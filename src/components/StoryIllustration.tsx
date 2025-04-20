
import React from 'react';
import { Sparkles, ImageIcon } from 'lucide-react';

interface StoryIllustrationProps {
  imageUrl: string | null;
  isGenerating: boolean;
  altText: string;
}

const StoryIllustration: React.FC<StoryIllustrationProps> = ({ 
  imageUrl, 
  isGenerating,
  altText
}) => {
  return (
    <div className="relative w-full h-full bg-purple-50 overflow-hidden rounded-lg shadow-inner">
      {isGenerating ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-purple-50">
          <Sparkles className="h-10 w-10 text-purple-400 animate-pulse mb-2" />
          <p className="text-sm text-purple-700 font-medium">Génération de l'illustration...</p>
        </div>
      ) : imageUrl ? (
        <img 
          src={imageUrl} 
          alt={altText} 
          className="w-full h-full object-cover transition-opacity duration-300"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-purple-50">
          <ImageIcon className="h-10 w-10 text-purple-200 mb-2" />
          <p className="text-sm text-gray-500">
            L'illustration apparaîtra ici
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Génère une histoire pour voir les illustrations
          </p>
        </div>
      )}
      
      {/* Overlay de style pour les illustrations */}
      {imageUrl && (
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/40 to-transparent flex items-end">
          <span className="text-white text-xs p-2">Illustration générée par IA • SDXL</span>
        </div>
      )}
    </div>
  );
};

export default StoryIllustration;
