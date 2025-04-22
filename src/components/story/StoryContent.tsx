
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { RefreshCwIcon, BookOpenIcon, ChevronLeft, ChevronRight, Image } from 'lucide-react';
import StoryIllustration from '../StoryIllustration';
import { Card, CardContent } from '@/components/ui/card';

interface StoryContentProps {
  storyPreview: string;
  isGenerating: boolean;
  illustrationUrl: string | null;
  illustrations?: string[];
  currentIllustrationIndex?: number;
  onIllustrationChange?: (index: number) => void;
}

const StoryContent: React.FC<StoryContentProps> = ({
  storyPreview,
  isGenerating,
  illustrationUrl,
  illustrations = [],
  currentIllustrationIndex = 0,
  onIllustrationChange = () => {},
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  
  // Reset current page when a new story is generated
  useEffect(() => {
    if (storyPreview) {
      setCurrentPage(0);
    }
  }, [storyPreview]);
  
  // Function to parse the story into pages with actual content
  const parseStoryIntoPages = (text: string) => {
    if (!text) return [];
    
    // Get all paragraphs
    const paragraphs = text.split('\n').filter(p => p.trim() !== '');
    
    // Create pages with fewer paragraphs per page for a cleaner layout
    const pages = [];
    let titleFound = false;
    
    // Find the title first
    const titleIndex = paragraphs.findIndex(p => p.startsWith('# '));
    let title = "Mon Histoire";
    
    if (titleIndex !== -1) {
      title = paragraphs[titleIndex].substring(2);
      titleFound = true;
    }
    
    // First page is title only
    pages.push({
      title: title,
      content: [],
      isTitle: true
    });
    
    // Create content pages with actual story content
    const contentParagraphs = paragraphs.filter(p => 
      !p.startsWith('# ') && 
      !p.startsWith('[Suite') && 
      !p.startsWith('⭐')
    );
    
    // For each content page, add 1-2 paragraphs
    for (let i = 0; i < Math.min(contentParagraphs.length, 9); i += 2) {
      const pageContent = [];
      pageContent.push(contentParagraphs[i]);
      
      if (i + 1 < contentParagraphs.length) {
        pageContent.push(contentParagraphs[i + 1]);
      }
      
      pages.push({
        title: title,
        content: pageContent,
        isTitle: false
      });
    }
    
    // Add a final page with "Suite de l'histoire" message
    pages.push({
      title: "Obtenir l'histoire complète",
      content: ["Tu veux lire la suite ? Passe à l'étape suivante pour continuer ou recevoir ton livre complet."],
      isTitle: false,
      isFinal: true
    });
    
    return pages;
  };

  // Get parsed pages
  const pages = parseStoryIntoPages(storyPreview);
  
  // Handle page navigation
  const goToNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
      
      // Change illustration when changing content pages
      if (illustrations.length > 0 && currentPage > 0 && currentPage < pages.length - 2) {
        const nextIllustrationIndex = Math.min(currentPage, illustrations.length - 1);
        onIllustrationChange(nextIllustrationIndex);
      }
    }
  };
  
  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      
      // Change illustration when going back
      if (illustrations.length > 0 && currentPage > 1 && currentPage < pages.length - 1) {
        const prevIllustrationIndex = Math.max(currentPage - 2, 0);
        onIllustrationChange(prevIllustrationIndex);
      }
    }
  };
  
  // Function to navigate between illustrations
  const changeIllustration = (direction: 'next' | 'prev') => {
    if (direction === 'next' && currentIllustrationIndex < illustrations.length - 1) {
      onIllustrationChange(currentIllustrationIndex + 1);
    } else if (direction === 'prev' && currentIllustrationIndex > 0) {
      onIllustrationChange(currentIllustrationIndex - 1);
    }
  };

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <RefreshCwIcon className="h-12 w-12 text-purple-500 animate-spin mb-4" />
        <p className="text-center text-purple-700 font-medium">
          L'IA génère ton histoire et les illustrations...
        </p>
        <p className="text-center text-gray-500 mt-2">
          Cela peut prendre quelques instants
        </p>
      </div>
    );
  }
  
  if (storyPreview && pages.length > 0) {
    const currentPageData = pages[currentPage];
    
    return (
      <div className="flex flex-col h-full">
        {/* Page count and navigation */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">
            Page {currentPage + 1} sur {pages.length}
          </span>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={goToPrevPage}
              disabled={currentPage === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={goToNextPage}
              disabled={currentPage === pages.length - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Book-like layout */}
        <Card className="flex-1 overflow-hidden border-0 shadow-lg bg-white">
          <CardContent className="p-0 h-full flex flex-col">
            {currentPageData.isTitle ? (
              <div className="bg-gradient-to-r from-purple-100 to-pink-50 h-full flex flex-col items-center justify-center p-8 text-center">
                <h2 className="text-3xl font-bold text-purple-800 mb-6">
                  {currentPageData.title}
                </h2>
                <p className="text-purple-600 italic">Une histoire magique attend...</p>
                
                {/* Display first illustration on title page if available */}
                {illustrations.length > 0 && (
                  <div className="mt-8 w-2/3 h-48 rounded-lg overflow-hidden shadow-lg">
                    <img 
                      src={illustrations[0]} 
                      alt="Page de couverture" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            ) : currentPageData.isFinal ? (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 h-full flex flex-col items-center justify-center p-8 text-center">
                <h3 className="text-xl font-bold text-purple-800 mb-4">
                  {currentPageData.title}
                </h3>
                <p className="text-gray-500 italic mb-6">{currentPageData.content[0]}</p>
                
                {/* Illustration grid pour la page finale */}
                {illustrations.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mb-6 w-full max-w-md">
                    {illustrations.slice(0, 6).map((img, idx) => (
                      <div key={idx} className="aspect-square rounded-md overflow-hidden border border-purple-100">
                        <img src={img} alt={`Illustration ${idx+1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
                
                <Link to="/offres-cadeaux">
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    Obtenir l'histoire complète
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="h-full flex flex-col md:flex-row">
                {/* Illustration with navigation controls */}
                <div className="w-full md:w-1/2 h-48 md:h-auto relative">
                  <StoryIllustration 
                    imageUrl={illustrations[currentPage - 1] || illustrationUrl} 
                    isGenerating={isGenerating} 
                    altText={`Illustration pour ${currentPageData.title}`}
                  />
                  
                  {/* Navigation pour les illustrations si on en a plusieurs */}
                  {illustrations.length > 1 && (
                    <div className="absolute bottom-2 right-2 flex space-x-1">
                      <Button 
                        variant="secondary" 
                        size="icon" 
                        className="h-8 w-8 opacity-80 hover:opacity-100"
                        onClick={() => changeIllustration('prev')}
                        disabled={currentIllustrationIndex === 0}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="bg-white/70 text-xs text-gray-700 px-2 py-1 rounded flex items-center">
                        {currentIllustrationIndex + 1}/{illustrations.length}
                      </span>
                      <Button 
                        variant="secondary" 
                        size="icon" 
                        className="h-8 w-8 opacity-80 hover:opacity-100"
                        onClick={() => changeIllustration('next')}
                        disabled={currentIllustrationIndex === illustrations.length - 1}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
                
                {/* Text content */}
                <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
                  <div className="prose prose-purple max-w-none">
                    {currentPageData.content.map((paragraph, idx) => (
                      <p key={idx} className="mb-4 text-gray-700 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Page navigation for mobile - bottom */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={goToPrevPage}
            disabled={currentPage === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Précédent
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={goToNextPage}
            disabled={currentPage === pages.length - 1}
          >
            Suivant <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <BookOpenIcon className="h-16 w-16 text-purple-300 mb-4" />
      <p className="text-center text-gray-500">
        Clique sur "Générer mon histoire" pour créer une histoire personnalisée avec illustrations.
      </p>
    </div>
  );
};

export default StoryContent;
