
import React from 'react';
import { Sparkles } from 'lucide-react';

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
    <div className="relative w-full h-64 bg-purple-50 rounded-lg overflow-hidden mb-6 border-2 border-purple-100">
      {isGenerating ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-purple-50">
          <Sparkles className="h-10 w-10 text-purple-400 animate-pulse mb-2" />
          <p className="text-sm text-purple-700 font-medium">Génération de l'illustration...</p>
        </div>
      ) : imageUrl ? (
        <img 
          src={imageUrl} 
          alt={altText} 
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-purple-50">
          <p className="text-sm text-gray-500">
            L'illustration apparaîtra ici après la génération de l'histoire
          </p>
        </div>
      )}
    </div>
  );
};

export default StoryIllustration;
