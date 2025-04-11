
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { RefreshCwIcon, BookOpenIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import StoryIllustration from '../StoryIllustration';
import { Card, CardContent } from '@/components/ui/card';

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
  const [currentPage, setCurrentPage] = useState(0);
  
  // Function to parse the story into pages with less text
  const parseStoryIntoPages = (text: string) => {
    if (!text) return [];
    
    // Get all paragraphs
    const paragraphs = text.split('\n').filter(p => p.trim() !== '');
    
    // Create pages with fewer paragraphs per page for a cleaner layout
    const pages = [];
    let titleFound = false;
    
    // Find the title first
    const titleIndex = paragraphs.findIndex(p => p.startsWith('# '));
    let title = "L'histoire";
    
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
    
    // Create remaining pages with just 1 paragraph per page for cleaner preview
    const startIndex = titleFound ? titleIndex + 1 : 0;
    for (let i = startIndex; i < paragraphs.length; i++) {
      // Skip special markers
      if (paragraphs[i].startsWith('[Suite') || paragraphs[i].startsWith('⭐')) {
        continue;
      }
      
      // Limit paragraph length for preview
      let paragraph = paragraphs[i];
      if (paragraph.length > 200) {
        paragraph = paragraph.substring(0, 200) + '...';
      }
      
      pages.push({
        title: title,
        content: [paragraph],
        isTitle: false
      });
      
      // Limit to 5 content pages for the preview
      if (pages.length >= 6) {
        break;
      }
    }
    
    // Add a final page with "Suite de l'histoire" message
    pages.push({
      title: "Obtenir l'histoire complète",
      content: ["Suite de l'histoire disponible après achat..."],
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
    }
  };
  
  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
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
              </div>
            ) : currentPageData.isFinal ? (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 h-full flex flex-col items-center justify-center p-8 text-center">
                <h3 className="text-xl font-bold text-purple-800 mb-4">
                  {currentPageData.title}
                </h3>
                <p className="text-gray-500 italic mb-6">{currentPageData.content[0]}</p>
                <Link to="/offres-cadeaux">
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    Obtenir l'histoire complète
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="h-full flex flex-col md:flex-row">
                {/* Illustration */}
                <div className="w-full md:w-1/2 h-48 md:h-auto">
                  <StoryIllustration 
                    imageUrl={illustrationUrl} 
                    isGenerating={isGenerating} 
                    altText={currentPageData.title}
                  />
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
        Clique sur "Générer mon histoire" pour créer un aperçu de ton histoire personnalisée.
      </p>
    </div>
  );
};

export default StoryContent;
