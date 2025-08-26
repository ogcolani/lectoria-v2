
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
  orderId?: string | null;
  orderStatus?: string | null;
  preview?: {
    title: string;
    pages: Array<{ page_number: number; text: string }>;
    totalPages: number;
    previewPageCount: number;
    isPreview: boolean;
  } | null;
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
  heroName,
  orderId,
  orderStatus,
  preview
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

  // Show full story preview (actually just secure preview)
  if (showFullStory && (storyPreview || preview)) {
    return (
      <div className="lg:col-span-2 order-1 lg:order-2">
        <FullStoryPreview
          storyPreview={storyPreview}
          isGenerating={isGenerating}
          illustrations={illustrations}
          heroName={heroName}
          pageCount={pageCount}
          preview={preview}
          orderStatus={orderStatus}
        />
        <div className="text-center mt-6 space-x-4">
          <Button 
            onClick={() => setShowFullStory(false)}
            variant="outline"
          >
            Retour à l'aperçu
          </Button>
          {orderId && orderStatus !== 'paid' && (
            <Button 
              onClick={() => window.open(`/checkout?orderId=${orderId}`, '_blank')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Commander le livre
            </Button>
          )}
          <Button 
            onClick={onToggleBookPreview}
            variant="outline"
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
          preview={preview}
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
          preview={preview}
        />
      )}
      
      {(storyPreview || preview) && (
        <div className="mt-8 text-center space-x-4">
          <Button 
            onClick={() => setShowFullStory(true)}
            variant="outline"
            className="flex items-center gap-2 mx-auto mb-4"
          >
            <Eye className="h-4 w-4" />
            Voir l'aperçu paginé
          </Button>
          
          <div className="flex justify-center space-x-4 mb-4">
            {orderId && orderStatus !== 'paid' && (
              <Button 
                onClick={() => window.open(`/checkout?orderId=${orderId}`, '_blank')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Commander le livre
              </Button>
            )}
            
            {!simpleExcerpt && (
              <Button 
                onClick={onToggleBookPreview}
                variant="outline"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Prévisualiser le livre
              </Button>
            )}
          </div>
          
          {orderStatus === 'paid' && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 font-medium">✅ Commande payée ! Votre livre est en cours d'impression.</p>
            </div>
          )}
          
          {!simpleExcerpt && (
            <p className="text-sm text-gray-500 mt-2">
              Ceci est un aperçu (≈15%). Le livre complet contient {preview?.totalPages || pageCount} pages.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default StoryPreviewSection;
