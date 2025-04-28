import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Share, RefreshCwIcon, ChevronLeft, ArrowLeft } from 'lucide-react';
import StoryInfoDialog from './StoryInfoDialog';
interface StoryActionsProps {
  position: 'top' | 'bottom';
  showShare?: boolean;
  storyPreview: string;
  pageCount: number;
  childAge: number;
  onShare: () => void;
  onReset: () => void;
}
const StoryActions: React.FC<StoryActionsProps> = ({
  position,
  showShare = true,
  storyPreview,
  pageCount,
  childAge,
  onShare,
  onReset
}) => {
  if (position === 'top') {
    return <div className="flex space-x-2">
        <Link to="/story-elements">
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Étapes précédentes
          </Button>
        </Link>
        
        {showShare && storyPreview && <>
            <Button variant="outline" size="sm" onClick={onShare}>
              <Share className="h-4 w-4 mr-1" />
              Partager
            </Button>
            
            <StoryInfoDialog pageCount={pageCount} childAge={childAge} />
          </>}
      </div>;
  }
  if (position === 'bottom') {
    return <div className="flex justify-between items-center pt-4 border-t mt-6">
        <Link to="/story-elements">
          <Button variant="outline" type="button">
            <ChevronLeft className="mr-2 h-4 w-4" /> Retour
          </Button>
        </Link>
        
        {storyPreview && <div className="flex space-x-2">
            <Button onClick={onReset} variant="outline">
              <RefreshCwIcon className="mr-2 h-4 w-4" />
              Recommencer
            </Button>
            
            <Link to="/offres-cadeaux">
              
            </Link>
          </div>}
      </div>;
  }
  return null;
};
export default StoryActions;