
import React from 'react';
import StoryPreview from '@/components/StoryPreview';
import BookPreview from '@/components/BookPreview';

interface StoryPreviewSectionProps {
  storyPreview: string;
  isGenerating: boolean;
  pageCount: number;
  childAge?: number;
  illustrationUrl: string | null;
  illustrations: string[];
  onShare: () => void;
  onReset: () => void;
  showBookPreview: boolean;
  onToggleBookPreview: () => void;
  onContinue: () => void;
  heroName?: string;
}

const StoryPreviewSection: React.FC<StoryPreviewSectionProps> = ({
  storyPreview,
  isGenerating,
  pageCount,
  childAge = 6,
  illustrationUrl,
  illustrations,
  onShare,
  onReset,
  showBookPreview,
  onToggleBookPreview,
  onContinue,
  heroName
}) => {
  if (showBookPreview && storyPreview) {
    return (
      <div className="max-w-6xl mx-auto">
        <BookPreview 
          storyTitle={storyPreview.split('\n')[0]?.replace('# ', '') || "Mon Histoire"}
          heroName={heroName || "notre héros"}
          storyContent={storyPreview.split('\n').filter(line => !line.startsWith('#') && line.trim() !== '')}
          illustrations={illustrations}
          onContinue={onContinue}
        />
        <div className="text-center mt-6">
          <button onClick={onToggleBookPreview} className="text-purple-600 hover:text-purple-700">
            Revenir à l'aperçu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-2 order-1 lg:order-2">
      <StoryPreview
        storyPreview={storyPreview}
        isGenerating={isGenerating}
        pageCount={pageCount}
        childAge={childAge}
        illustrationUrl={illustrationUrl}
        illustrations={illustrations}
        onShare={onShare}
        onReset={onReset}
      />
      
      {storyPreview && (
        <div className="mt-8 text-center">
          <button 
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-lg shadow-md"
            onClick={onToggleBookPreview}
          >
            Prévisualiser le livre
          </button>
          <p className="text-sm text-gray-500 mt-2">
            Visualise ton histoire en format livre avec {illustrations.length} illustrations
          </p>
        </div>
      )}
    </div>
  );
};

export default StoryPreviewSection;
