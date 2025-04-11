
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Share, Eye, RefreshCwIcon, BookOpenIcon, ChevronLeft } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

interface StoryPreviewProps {
  storyPreview: string;
  isGenerating: boolean;
  pageCount: number;
  childAge?: number;
  onShare: () => void;
  onReset: () => void;
}

const StoryPreview: React.FC<StoryPreviewProps> = ({
  storyPreview,
  isGenerating,
  pageCount,
  childAge = 6,
  onShare,
  onReset,
}) => {
  // Function to limit the preview to only 3 paragraphs
  const getLimitedPreview = (text: string) => {
    // Get all paragraphs
    const paragraphs = text.split('\n');
    
    // Get non-empty paragraphs
    const nonEmptyParagraphs = paragraphs.filter(p => p.trim() !== '');
    
    // Take the title + first 3 paragraphs
    let limitedParagraphs = [];
    
    // Always include the title if it exists (starts with #)
    const titleIndex = paragraphs.findIndex(p => p.startsWith('# '));
    if (titleIndex !== -1) {
      limitedParagraphs.push(paragraphs[titleIndex]);
    }
    
    // Find the first 3 non-empty paragraphs that aren't the title
    const contentParagraphs = paragraphs.filter(p => !p.startsWith('# ') && p.trim() !== '');
    const selected = contentParagraphs.slice(0, 3);
    limitedParagraphs = limitedParagraphs.concat(selected);
    
    // Add a note that there's more to the story
    limitedParagraphs.push('');
    limitedParagraphs.push('[Suite de l\'histoire disponible après achat...]');
    
    return limitedParagraphs.join('\n');
  };

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
            </p>
          )}
        </div>
        
        {storyPreview && (
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={onShare}
            >
              <Share className="h-4 w-4 mr-1" />
              Partager
            </Button>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Plus d'infos
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Détails du livre</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 py-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Nombre de pages:</span>
                    <Badge variant="outline">{pageCount} pages</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Âge recommandé:</span>
                    <Badge variant="outline">{childAge} ans</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Niveau de vocabulaire:</span>
                    <Badge variant="outline">
                      {childAge <= 5 ? 'Très simple' : 
                       childAge <= 8 ? 'Simple' : 
                       childAge <= 12 ? 'Intermédiaire' : 'Avancé'}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Histoire complète:</span>
                    <Badge variant="secondary">Disponible à l'achat</Badge>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
      
      <div className="min-h-[60vh] bg-purple-50 rounded-xl p-6 overflow-auto">
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center h-full">
            <RefreshCwIcon className="h-12 w-12 text-purple-500 animate-spin mb-4" />
            <p className="text-center text-purple-700 font-medium">
              L'IA Mistral est en train de créer ton histoire...
            </p>
            <p className="text-center text-gray-500 mt-2">
              Cela peut prendre quelques instants
            </p>
          </div>
        ) : storyPreview ? (
          <div className="prose prose-purple max-w-none">
            {getLimitedPreview(storyPreview).split('\n').map((paragraph, index) => (
              paragraph.startsWith('# ') ? (
                <h2 key={index} className="text-2xl font-bold text-purple-800 mb-4">
                  {paragraph.substring(2)}
                </h2>
              ) : paragraph === '' ? (
                <br key={index} />
              ) : paragraph.startsWith('⭐') ? (
                <div key={index} className="my-6 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border border-purple-200">
                  <p className="text-purple-800 font-medium text-lg">{paragraph}</p>
                </div>
              ) : paragraph.startsWith('[Suite') ? (
                <div key={index} className="my-6">
                  <p className="text-gray-500 italic">{paragraph}</p>
                  <div className="mt-8 flex justify-center">
                    <Link to="/offres-cadeaux">
                      <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                        Obtenir l'histoire complète
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <p key={index} className="mb-4">{paragraph}</p>
              )
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <BookOpenIcon className="h-16 w-16 text-purple-300 mb-4" />
            <p className="text-center text-gray-500">
              Clique sur "Générer mon histoire" pour créer un aperçu de ton histoire personnalisée.
            </p>
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-center pt-4 border-t mt-6">
        <Link to="/story-elements">
          <Button variant="outline" type="button">
            <ChevronLeft className="mr-2 h-4 w-4" /> Retour
          </Button>
        </Link>
        
        {storyPreview && (
          <div className="flex space-x-2">
            <Button 
              onClick={onReset}
              variant="outline"
            >
              <RefreshCwIcon className="mr-2 h-4 w-4" />
              Recommencer
            </Button>
            
            <Link to="/offres-cadeaux">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Voir les offres
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryPreview;
