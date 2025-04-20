
import React, { useState } from 'react';
import StoryActions from './story/StoryActions';
import StoryContent from './story/StoryContent';

interface StoryPreviewProps {
  storyPreview: string;
  isGenerating: boolean;
  pageCount: number;
  childAge?: number;
  illustrationUrl: string | null;
  illustrations?: string[]; // Ajout de toutes les illustrations
  onShare: () => void;
  onReset: () => void;
}

const StoryPreview: React.FC<StoryPreviewProps> = ({
  storyPreview,
  isGenerating,
  pageCount,
  childAge = 6,
  illustrationUrl,
  illustrations = [], // Tableau de toutes les illustrations
  onShare,
  onReset,
}) => {
  // État pour suivre l'illustration actuelle à afficher
  const [currentIllustrationIndex, setCurrentIllustrationIndex] = useState(0);
  
  // Récupérer l'URL de l'illustration actuelle
  const currentIllustration = illustrations && illustrations.length > 0 
    ? illustrations[currentIllustrationIndex] 
    : illustrationUrl;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">
            {storyPreview ? "Aperçu de ton histoire" : "Ton aperçu apparaîtra ici"}
          </h2>
          {storyPreview && (
            <p className="text-gray-500 text-sm mt-1">
              Histoire complète: {pageCount} pages, adapté aux {childAge} ans
              {illustrations.length > 0 && ` • ${illustrations.length} illustrations`}
            </p>
          )}
        </div>
        
        <StoryActions 
          position="top"
          storyPreview={storyPreview}
          pageCount={pageCount}
          childAge={childAge}
          onShare={onShare}
          onReset={onReset}
        />
      </div>
      
      <div className="min-h-[60vh] bg-purple-50 rounded-xl p-6 overflow-auto">
        <StoryContent 
          storyPreview={storyPreview}
          isGenerating={isGenerating}
          illustrationUrl={currentIllustration}
          illustrations={illustrations}
          onIllustrationChange={setCurrentIllustrationIndex}
          currentIllustrationIndex={currentIllustrationIndex}
        />
      </div>
      
      <StoryActions 
        position="bottom"
        storyPreview={storyPreview}
        pageCount={pageCount}
        childAge={childAge}
        onShare={onShare}
        onReset={onReset}
      />
    </div>
  );
};

export default StoryPreview;
