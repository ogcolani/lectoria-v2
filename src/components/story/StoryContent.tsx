
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { RefreshCwIcon, BookOpenIcon } from 'lucide-react';
import StoryIllustration from '../StoryIllustration';

interface StoryContentProps {
  storyPreview: string;
  isGenerating: boolean;
  illustrationUrl: string | null;
}

const StoryContent: React.FC<StoryContentProps> = ({
  storyPreview,
  isGenerating,
  illustrationUrl,
}) => {
  // Function to limit the preview to only 3 paragraphs
  const getLimitedPreview = (text: string) => {
    // Get all paragraphs
    const paragraphs = text.split('\n');
    
    // Get non-empty paragraphs
    const nonEmptyParagraphs = paragraphs.filter(p => p.trim() !== '');
    
    // Take the title + first 3 paragraphs
    let limitedParagraphs = [];
    
    // Always include the title if it exists (starts with #)
    const titleIndex = paragraphs.findIndex(p => p.startsWith('# '));
    if (titleIndex !== -1) {
      limitedParagraphs.push(paragraphs[titleIndex]);
    }
    
    // Find the first 3 non-empty paragraphs that aren't the title
    const contentParagraphs = paragraphs.filter(p => !p.startsWith('# ') && p.trim() !== '');
    const selected = contentParagraphs.slice(0, 3);
    limitedParagraphs = limitedParagraphs.concat(selected);
    
    // Add a note that there's more to the story
    limitedParagraphs.push('');
    limitedParagraphs.push('[Suite de l\'histoire disponible après achat...]');
    
    return limitedParagraphs.join('\n');
  };

  // Extract story title for the illustration alt text
  const getStoryTitle = () => {
    if (!storyPreview) return "Illustration de l'histoire";
    
    const titleLine = storyPreview.split('\n').find(line => line.startsWith('# '));
    return titleLine ? titleLine.substring(2) : "Illustration de l'histoire";
  };

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <RefreshCwIcon className="h-12 w-12 text-purple-500 animate-spin mb-4" />
        <p className="text-center text-purple-700 font-medium">
          L'IA Mistral est en train de créer ton histoire...
        </p>
        <p className="text-center text-gray-500 mt-2">
          Cela peut prendre quelques instants
        </p>
      </div>
    );
  }
  
  if (storyPreview) {
    return (
      <div>
        {/* Display the story illustration */}
        <StoryIllustration 
          imageUrl={illustrationUrl} 
          isGenerating={isGenerating} 
          altText={getStoryTitle()}
        />
        
        <div className="prose prose-purple max-w-none">
          {getLimitedPreview(storyPreview).split('\n').map((paragraph, index) => (
            paragraph.startsWith('# ') ? (
              <h2 key={index} className="text-2xl font-bold text-purple-800 mb-4">
                {paragraph.substring(2)}
              </h2>
            ) : paragraph === '' ? (
              <br key={index} />
            ) : paragraph.startsWith('⭐') ? (
              <div key={index} className="my-6 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border border-purple-200">
                <p className="text-purple-800 font-medium text-lg">{paragraph}</p>
              </div>
            ) : paragraph.startsWith('[Suite') ? (
              <div key={index} className="my-6">
                <p className="text-gray-500 italic">{paragraph}</p>
                <div className="mt-8 flex justify-center">
                  <Link to="/offres-cadeaux">
                    <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      Obtenir l'histoire complète
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <p key={index} className="mb-4">{paragraph}</p>
            )
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <BookOpenIcon className="h-16 w-16 text-purple-300 mb-4" />
      <p className="text-center text-gray-500">
        Clique sur "Générer mon histoire" pour créer un aperçu de ton histoire personnalisée.
      </p>
    </div>
  );
};

export default StoryContent;
