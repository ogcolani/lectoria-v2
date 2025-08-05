import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useLectoriaStore } from '@/store/useLectoriaStore';

interface EnhancedStoryPreviewProps {
  storyPreview: string;
  isGenerating: boolean;
  illustrations: string[];
  heroName?: string;
  pageCount: number;
}

const EnhancedStoryPreview: React.FC<EnhancedStoryPreviewProps> = ({
  storyPreview,
  isGenerating,
  illustrations,
  heroName = '',
  pageCount
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const { simpleExcerpt } = useLectoriaStore();

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevPage();
      } else if (e.key === 'ArrowRight') {
        goToNextPage();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPage]);

  // Reset current page when new story
  useEffect(() => {
    if (storyPreview) {
      setCurrentPage(0);
    }
  }, [storyPreview]);

  // Parse story into clean excerpts
  const parseStoryExcerpts = (text: string) => {
    if (!text) return [];

    const lines = text.split('\n').filter(line => line.trim() !== '');
    
    // Find title
    const titleIndex = lines.findIndex(line => line.startsWith('# '));
    const title = titleIndex !== -1 ? lines[titleIndex].substring(2).trim() : "Mon Histoire";
    
    // Get content paragraphs (exclude title, metadata)
    const contentLines = lines.filter(line => 
      !line.startsWith('# ') && 
      !line.startsWith('⭐') && 
      !line.includes('Histoire complète en') &&
      !line.includes('Pour découvrir') &&
      line.trim() !== ''
    );

    // Create excerpts (2-3 lines each)
    const excerpts = [];
    for (let i = 0; i < Math.min(contentLines.length, 15); i += 2) {
      const excerpt = [];
      excerpt.push(contentLines[i]);
      if (i + 1 < contentLines.length) {
        excerpt.push(contentLines[i + 1]);
      }
      if (i + 2 < contentLines.length && excerpt.length < 3) {
        excerpt.push(contentLines[i + 2]);
      }
      
      if (excerpt.length > 0) {
        excerpts.push({
          title,
          content: excerpt.join(' ').replace(/[#*]/g, '').trim(),
          pageNumber: excerpts.length + 1
        });
      }
    }

    return excerpts.slice(0, Math.min(8, pageCount - 1)); // Limit excerpts
  };

  const excerpts = parseStoryExcerpts(storyPreview);
  const totalPages = Math.max(excerpts.length, pageCount);

  const goToNextPage = () => {
    if (currentPage < excerpts.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Get current illustration
  const getCurrentIllustration = () => {
    if (illustrations.length === 0) return null;
    return illustrations[Math.min(currentPage, illustrations.length - 1)];
  };

  // Remove markdown and clean text
  const cleanText = (text: string) => {
    return text
      .replace(/[#*]/g, '')
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .trim();
  };

  if (isGenerating) {
    return (
      <div className="max-w-[600px] mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="animate-pulse">
          <div className="h-[200px] bg-gray-200 rounded-xl mb-6"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
        <p className="text-purple-600 font-medium mt-6">
          Génération de votre histoire personnalisée...
        </p>
      </div>
    );
  }

  if (!storyPreview || excerpts.length === 0) {
    return (
      <div className="max-w-[600px] mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
        <BookOpen className="h-16 w-16 text-purple-300 mx-auto mb-4" />
        <p className="text-gray-500">
          Votre aperçu d'histoire apparaîtra ici...
        </p>
      </div>
    );
  }

  const currentExcerpt = excerpts[currentPage];
  const progressPercentage = ((currentPage + 1) / totalPages) * 100;

  return (
    <div className="max-w-[600px] mx-auto">
      {/* Header with progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-2xl font-bold text-gray-900">Aperçu</h2>
          <span className="text-sm text-gray-600 font-medium">
            {currentPage + 1} / {totalPages} pages
          </span>
        </div>
        
        {/* Progress bar with gradient */}
        <div className="relative">
          <Progress 
            value={progressPercentage} 
            className="h-3 bg-gray-200"
          />
          <div 
            className="absolute top-0 left-0 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Story card */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Illustration with page badge */}
        <div className="relative aspect-[4/3] bg-gray-100">
          {getCurrentIllustration() ? (
            <img 
              src={getCurrentIllustration()} 
              alt={`Illustration page ${currentPage + 1}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
              <BookOpen className="h-16 w-16 text-purple-300" />
            </div>
          )}
          
          {/* Page badge */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 shadow-sm">
            <span className="text-sm font-medium text-gray-700">
              Page {currentPage + 1}/{totalPages}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-6 p-4">
          {/* Story text */}
          <div className="mb-6">
            <p 
              className="text-lg leading-relaxed text-gray-800"
              style={{ 
                fontSize: '18px', 
                lineHeight: '1.4',
                minHeight: '76px' // ~3 lines minimum
              }}
            >
              {cleanText(currentExcerpt.content)}
            </p>
          </div>

          {/* Educational context */}
          <div className="text-sm text-gray-600 border-t pt-4">
            <p>
              📚 Valeur travaillée : Persévérance · Illustration générée par IA (SDXL)
            </p>
          </div>
        </div>
      </div>

      {/* Navigation - Parent-friendly */}
      <div className="flex justify-between items-center mt-6 md:flex-row flex-col md:space-y-0 space-y-3">
        <Button
          variant="outline"
          size="lg"
          onClick={goToPrevPage}
          disabled={currentPage === 0}
          className="flex items-center gap-2 px-6 md:w-auto w-full justify-center"
        >
          <ChevronLeft className="h-5 w-5" />
          Page précédente
        </Button>

        <Button
          size="lg"
          onClick={goToNextPage}
          disabled={currentPage === excerpts.length - 1}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 flex items-center gap-2 px-6 md:w-auto w-full justify-center"
        >
          Page suivante
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile responsive classes via Tailwind */}
      <div className="hidden">
        {/* Mobile styles handled via Tailwind responsive classes */}
      </div>
    </div>
  );
};

export default EnhancedStoryPreview;