import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface FullStoryPreviewProps {
  storyPreview: string;
  isGenerating: boolean;
  illustrations: string[];
  heroName?: string;
  pageCount: number;
  preview?: {
    title: string;
    pages: Array<{ pageNumber: number; content: string }>;
    totalPages: number;
  } | null;
  orderStatus?: string | null;
}

const FullStoryPreview: React.FC<FullStoryPreviewProps> = ({
  storyPreview,
  isGenerating,
  illustrations,
  heroName = '',
  pageCount,
  preview,
  orderStatus
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [showFullText, setShowFullText] = useState(false);

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

  // Parse story using structured preview or fallback to text parsing (SECURE - only preview)
  const parseStoryPreview = () => {
    // Use structured preview if available
    if (preview && preview.pages && preview.pages.length > 0) {
      return {
        title: preview.title || "Mon Histoire", 
        pages: preview.pages,
        isStructured: true
      };
    }
    
    // Fallback to text parsing (legacy)
    if (!storyPreview) return { title: '', pages: [], isStructured: false };

    const lines = storyPreview.split('\n').filter(line => line.trim() !== '');
    
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

    // Create pages from preview only (SECURE - no full story access)
    const pages = [];
    if (showFullText) {
      // Show all preview content in one view
      pages.push({
        content: contentLines.join(' ').replace(/[#*]/g, '').trim(),
        pageNumber: 1
      });
    } else {
      // Create reasonable page chunks from preview
      for (let i = 0; i < contentLines.length; i += 3) {
        const pageContent = [];
        for (let j = i; j < Math.min(i + 3, contentLines.length); j++) {
          pageContent.push(contentLines[j]);
        }
        
        if (pageContent.length > 0) {
          pages.push({
            content: pageContent.join(' ').replace(/[#*]/g, '').trim(),
            pageNumber: pages.length + 1
          });
        }
      }
    }

    return { title, pages, isStructured: false };
  };

  const { title, pages, isStructured } = parseStoryPreview();
  const totalPages = showFullText ? 1 : pages.length;
  const actualTotalPages = preview?.totalPages || pageCount;

  const goToNextPage = () => {
    if (!showFullText && currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (!showFullText && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Get current illustration
  const getCurrentIllustration = () => {
    if (illustrations.length === 0) return null;
    return illustrations[Math.min(currentPage, illustrations.length - 1)];
  };

  const toggleFullText = () => {
    setShowFullText(!showFullText);
    setCurrentPage(0);
  };

  if (isGenerating) {
    return (
      <div className="max-w-[800px] mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
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

  if (!storyPreview || pages.length === 0) {
    return (
      <div className="max-w-[800px] mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
        <BookOpen className="h-16 w-16 text-purple-300 mx-auto mb-4" />
        <p className="text-gray-500">
          Votre histoire complète apparaîtra ici...
        </p>
      </div>
    );
  }

  const currentPageData = pages[currentPage] || pages[0];
  const progressPercentage = showFullText ? 100 : ((currentPage + 1) / totalPages) * 100;

  return (
    <div className="max-w-[800px] mx-auto">
      {/* Header with progress and view toggle */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Aperçu Paginé</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full font-medium">
                Aperçu ≈15%
              </span>
              {orderStatus === 'paid' && (
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                  Payé
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={toggleFullText}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              {showFullText ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {showFullText ? 'Vue paginée' : 'Vue complète'}
            </Button>
            <span className="text-sm text-gray-600 font-medium">
              {showFullText ? 'Aperçu complet' : `${currentPage + 1} / ${totalPages} pages`}
            </span>
          </div>
        </div>
        
        {/* Security notice */}
        <div className="mb-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
          <p className="text-sm text-purple-700">
            <strong>Ceci est un aperçu (≈15%).</strong> Commandez le livre pour découvrir l'histoire complète de {actualTotalPages} pages !
          </p>
        </div>
        
        {/* Progress bar */}
        {!showFullText && (
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
        )}
      </div>

      {/* Story card */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Illustration */}
        {!showFullText && (
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
        )}

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
          
          {/* Story text */}
          <div className={showFullText ? "max-h-[70vh] overflow-y-auto pr-2" : ""}>
            <p 
              className="text-lg leading-relaxed text-gray-800"
              style={{ 
                fontSize: '18px', 
                lineHeight: '1.6'
              }}
            >
              {currentPageData.content}
            </p>
          </div>

          {/* All illustrations in full text mode */}
          {showFullText && illustrations.length > 0 && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {illustrations.map((illustration, index) => (
                <div key={index} className="relative">
                  <img 
                    src={illustration} 
                    alt={`Illustration ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded px-2 py-1 text-xs font-medium">
                    Illustration {index + 1}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Navigation - Only show in paginated mode */}
      {!showFullText && (
        <div className="flex justify-between items-center mt-6">
          <Button
            variant="outline"
            size="lg"
            onClick={goToPrevPage}
            disabled={currentPage === 0}
            className="flex items-center gap-2 px-6"
          >
            <ChevronLeft className="h-5 w-5" />
            Page précédente
          </Button>

          <span className="text-sm text-gray-500">
            {heroName && `Histoire de ${heroName}`} • {actualTotalPages} pages au total • Aperçu ≈15%
          </span>

          <Button
            size="lg"
            onClick={goToNextPage}
            disabled={currentPage >= pages.length - 1}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 flex items-center gap-2 px-6"
          >
            Page suivante
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default FullStoryPreview;