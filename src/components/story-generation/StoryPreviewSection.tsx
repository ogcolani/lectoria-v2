
import React, { useState } from 'react';
import StoryPreview from '@/components/StoryPreview';
import BookPreview from '@/components/BookPreview';
import EnhancedStoryPreview from '@/components/story/EnhancedStoryPreview';
import LimitedStoryPreview from '@/components/story/LimitedStoryPreview';
import FullStoryPreview from '@/components/story/FullStoryPreview';
import { Button } from '@/components/ui/button';
import { BookOpen, Eye } from 'lucide-react';
import { useLectoriaStore } from '@/store/useLectoriaStore';

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
  const { simpleExcerpt } = useLectoriaStore();
  const [showFullStory, setShowFullStory] = useState(false);
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

  // Show full story preview
  if (showFullStory && storyPreview) {
    return (
      <div className="lg:col-span-2 order-1 lg:order-2">
        <FullStoryPreview
          storyPreview={storyPreview}
          isGenerating={isGenerating}
          illustrations={illustrations}
          heroName={heroName}
          pageCount={pageCount}
        />
        <div className="text-center mt-6 space-x-4">
          <Button 
            onClick={() => setShowFullStory(false)}
            variant="outline"
          >
            Retour à l'aperçu
          </Button>
          <Button 
            onClick={onToggleBookPreview}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Prévisualiser le livre
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-2 order-1 lg:order-2">
      {simpleExcerpt ? (
        <LimitedStoryPreview
          storyPreview={storyPreview}
          isGenerating={isGenerating}
          pageCount={pageCount}
          childAge={childAge}
          illustrationUrl={illustrationUrl}
          illustrations={illustrations}
          heroName={heroName}
        />
      ) : (
        <StoryPreview
          storyPreview={storyPreview}
          isGenerating={isGenerating}
          pageCount={pageCount}
          childAge={childAge}
          illustrationUrl={illustrationUrl}
          illustrations={illustrations}
          onShare={onShare}
          onReset={onReset}
          heroName={heroName}
        />
      )}
      
      {storyPreview && (
        <div className="mt-8 text-center space-x-4">
          <Button 
            onClick={() => setShowFullStory(true)}
            variant="outline"
            className="flex items-center gap-2 mx-auto mb-4"
          >
            <Eye className="h-4 w-4" />
            Voir l'histoire complète
          </Button>
          
          {!simpleExcerpt && (
            <div className="flex justify-center space-x-4">
              <Button 
                onClick={onToggleBookPreview}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Prévisualiser le livre
              </Button>
            </div>
          )}
          
          {!simpleExcerpt && (
            <p className="text-sm text-gray-500 mt-2">
              Visualise ton histoire en format livre avec {illustrations.length} illustrations
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default StoryPreviewSection;
