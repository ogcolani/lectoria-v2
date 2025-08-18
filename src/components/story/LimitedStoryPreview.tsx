import React, { useState, useEffect } from 'react';
import { ShoppingCart, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface LimitedStoryPreviewProps {
  storyPreview: string;
  isGenerating: boolean;
  pageCount: number;
  childAge?: number;
  illustrationUrl: string | null;
  illustrations?: string[];
  heroName?: string;
}

const LimitedStoryPreview: React.FC<LimitedStoryPreviewProps> = ({
  storyPreview,
  isGenerating,
  pageCount,
  childAge = 6,
  illustrationUrl,
  illustrations = [],
  heroName
}) => {
  const navigate = useNavigate();
  const [expandedParagraphs, setExpandedParagraphs] = useState(4);
  const [isExpanding, setIsExpanding] = useState(false);

  // Parse story content
  const parseStoryContent = (text: string) => {
    if (!text) return { title: '', paragraphs: [] };

    const lines = text.split('\n').filter(line => line.trim() !== '');
    
    // Find title
    const titleIndex = lines.findIndex(line => line.startsWith('# '));
    const title = titleIndex !== -1 ? lines[titleIndex].substring(2).trim() : "Mon Histoire";
    
    // Get content paragraphs (exclude title and metadata)
    const paragraphs = lines.filter(line => 
      !line.startsWith('# ') && 
      !line.startsWith('⭐') && 
      !line.includes('Histoire complète en') &&
      !line.includes('Pour découvrir') &&
      line.trim() !== ''
    );

    return { title, paragraphs };
  };

  const { title, paragraphs } = parseStoryContent(storyPreview);
  
  // Calculate 20% of content (more substantial preview)
  const excerptLength = Math.max(Math.ceil(paragraphs.length * 0.20), 5);
  const excerptParagraphs = paragraphs.slice(0, excerptLength);
  const remainingParagraphs = paragraphs.slice(excerptLength);
  
  // Paragraphs currently visible
  const visibleParagraphs = excerptParagraphs.slice(0, expandedParagraphs);
  const hasMoreToShow = expandedParagraphs < excerptParagraphs.length;

  const handleExpandMore = () => {
    if (hasMoreToShow) {
      setIsExpanding(true);
      setTimeout(() => {
        setExpandedParagraphs(prev => Math.min(prev + 3, excerptParagraphs.length));
        setIsExpanding(false);
      }, 150);
    }
  };

  const handleCollapseAll = () => {
    setExpandedParagraphs(4);
  };

  const handleBuyBook = () => {
    navigate('/offres-cadeaux');
  };

  if (isGenerating) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
        <p className="text-purple-600 font-medium mt-6 text-center">
          Génération de votre histoire personnalisée...
        </p>
      </div>
    );
  }

  if (!storyPreview) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Ton aperçu apparaîtra ici</h2>
        <p className="text-gray-500">Génère ton histoire pour voir l'aperçu</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-500 text-sm">
          Aperçu • Histoire complète: {pageCount} pages, adaptée aux {childAge} ans
          {illustrations.length > 0 && ` • ${illustrations.length} illustrations`}
        </p>
      </div>

      {/* Story content with progressive reveal */}
      <div className="relative">
        <div className="p-6 space-y-4">
          {/* Main illustration */}
          {(illustrationUrl || illustrations[0]) && (
            <div className="mb-6 animate-fade-in">
              <img 
                src={illustrationUrl || illustrations[0]} 
                alt="Illustration de l'histoire"
                className="w-full max-w-md mx-auto rounded-lg shadow-md"
              />
            </div>
          )}

          {/* Progressive story reveal */}
          <div className="prose prose-lg max-w-none space-y-4">
            {visibleParagraphs.map((paragraph, index) => (
              <div 
                key={index} 
                className="animate-fade-in"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'both'
                }}
              >
                <p className="text-gray-800 leading-relaxed mb-4">
                  {paragraph.replace(/[#*]/g, '').trim()}
                </p>
              </div>
            ))}
          </div>

          {/* Expand/Continue buttons */}
          <div className="flex justify-center space-x-4 py-4">
            {hasMoreToShow ? (
              <Button
                onClick={handleExpandMore}
                variant="outline"
                className="flex items-center gap-2 hover-scale"
                disabled={isExpanding}
              >
                <ChevronDown className={`h-4 w-4 ${isExpanding ? 'animate-pulse' : ''}`} />
                {isExpanding ? 'Chargement...' : 'Lire la suite'}
              </Button>
            ) : (
              <div className="text-center space-y-3">
                <Button
                  onClick={handleCollapseAll}
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
                >
                  <ChevronUp className="h-4 w-4" />
                  Réduire l'aperçu
                </Button>
              </div>
            )}
          </div>

          {/* Blurred preview of remaining content */}
          {remainingParagraphs.length > 0 && (
            <div className="space-y-4 relative mt-6">
              <div className="prose prose-lg max-w-none filter blur-sm opacity-40">
                {remainingParagraphs.slice(0, 2).map((paragraph, index) => (
                  <p key={`hidden-${index}`} className="text-gray-800 leading-relaxed mb-4">
                    {paragraph.replace(/[#*]/g, '').trim()}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Final overlay gradient and CTA - only show when all excerpt is revealed */}
        {!hasMoreToShow && remainingParagraphs.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/95 to-transparent flex flex-col justify-end p-6">
            <div className="text-center space-y-4 bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 animate-scale-in">
              <p className="text-xl font-semibold text-gray-800">
                The story continues…
              </p>
              <p className="text-gray-600">
                Discover the rest in your personalized book.
              </p>
              <Button 
                onClick={handleBuyBook}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto shadow-lg hover:shadow-xl transition-all duration-200 hover-scale"
              >
                <ShoppingCart className="h-5 w-5" />
                Buy the full book
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom info */}
      <div className="p-6 bg-gray-50 border-t border-gray-100">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>📖 Personnalisé pour {heroName || 'votre enfant'}</span>
          <span>🎨 {illustrations.length} illustrations incluses</span>
        </div>
      </div>
    </div>
  );
};

export default LimitedStoryPreview;