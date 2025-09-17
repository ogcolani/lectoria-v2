import React, { useState, useEffect } from 'react';
import { ShoppingCart, ChevronDown, ChevronUp, CheckCircle, User, Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useLectoriaStore } from '@/store/useLectoriaStore';

interface LimitedStoryPreviewProps {
  storyPreview: string;
  isGenerating: boolean;
  pageCount: number;
  childAge?: number;
  illustrationUrl: string | null;
  illustrations?: string[];
  heroName?: string;
  preview?: {
    title: string;
    pages: Array<{ page_number: number; text: string }>;
    totalPages: number;
    previewPageCount: number;
    isPreview: boolean;
  } | null;
}

const LimitedStoryPreview: React.FC<LimitedStoryPreviewProps> = ({
  storyPreview,
  isGenerating,
  pageCount,
  childAge = 6,
  illustrationUrl,
  illustrations = [],
  heroName,
  preview
}) => {
  const navigate = useNavigate();
  const [expandedParagraphs, setExpandedParagraphs] = useState(4);
  const [isExpanding, setIsExpanding] = useState(false);
  
  // Get personalization data from store
  const {
    heroGender,
    heroAge: storeHeroAge,
    heroTrait,
    selectedValues,
    selectedStoryElements
  } = useLectoriaStore();

  // Create personalization indicators
  const getPersonalizationElements = () => {
    const elements = [];
    
    if (heroName) {
      elements.push({ 
        icon: User, 
        label: `Héros: ${heroName}`, 
        color: 'text-blue-600' 
      });
    }
    
    if (storeHeroAge || childAge) {
      elements.push({ 
        icon: Sparkles, 
        label: `${storeHeroAge || childAge} ans`, 
        color: 'text-green-600' 
      });
    }
    
    if (heroTrait) {
      elements.push({ 
        icon: Heart, 
        label: `Traits: ${heroTrait}`, 
        color: 'text-purple-600' 
      });
    }
    
    if (selectedValues && selectedValues.length > 0) {
      elements.push({ 
        icon: CheckCircle, 
        label: `${selectedValues.length} valeur${selectedValues.length > 1 ? 's' : ''}`, 
        color: 'text-orange-600' 
      });
    }
    
    if (selectedStoryElements && selectedStoryElements.length > 0) {
      elements.push({ 
        icon: CheckCircle, 
        label: `${selectedStoryElements.length} élément${selectedStoryElements.length > 1 ? 's' : ''}`, 
        color: 'text-pink-600' 
      });
    }
    
    return elements;
  };

  const personalizationElements = getPersonalizationElements();

  // Parse story content - use preview data if available, otherwise fallback to storyPreview
  const parseStoryContent = (text: string) => {
    // Si on a les vraies données de L2000, les utiliser
    if (preview && preview.pages && preview.pages.length > 0) {
      const title = preview.title || "Mon Histoire";
      const paragraphs = preview.pages.map(page => page.text).filter(text => text && text.trim() !== '');
      
      return { title, paragraphs };
    }
    
    // Fallback vers l'ancien système si pas de preview
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
  
  // Pour les vraies données de L2000, montrer toutes les pages preview disponibles
  // Sinon utiliser l'ancien système de 20%
  const excerptLength = preview && preview.pages 
    ? preview.pages.length  // Toutes les pages preview de L2000
    : Math.max(Math.ceil(paragraphs.length * 0.20), 5); // Ancien système 20%
    
  const excerptParagraphs = paragraphs.slice(0, excerptLength);
  const remainingParagraphs = preview && preview.pages 
    ? [] // Pas de contenu masqué pour les vraies données preview
    : paragraphs.slice(excerptLength); // Ancien système avec contenu masqué
  
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

  if (!storyPreview && !preview) {
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
          {preview ? 
            `Aperçu (${preview.previewPageCount}/${preview.totalPages} pages) • Généré par L2000` :
            `Aperçu • Histoire complète: ${pageCount} pages, adaptée aux ${childAge} ans`
          }
          {illustrations.length > 0 && ` • ${illustrations.length} illustrations`}
        </p>
      </div>

      {/* Personalization Banner */}
      {personalizationElements.length > 0 && (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border-b border-green-100 p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-green-800 font-semibold text-sm">
              {preview ? "✨ Histoire générée par votre agent L2000" : "✨ Histoire personnalisée selon vos choix"}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {personalizationElements.map((element, index) => {
              const IconComponent = element.icon;
              return (
                <div 
                  key={index}
                  className="flex items-center gap-1 bg-white/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs border border-white/50 shadow-sm"
                >
                  <IconComponent className={`h-3 w-3 ${element.color}`} />
                  <span className="text-gray-700 font-medium">{element.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

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