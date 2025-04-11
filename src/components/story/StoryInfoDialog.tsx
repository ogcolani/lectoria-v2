
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

interface StoryInfoDialogProps {
  pageCount: number;
  childAge: number;
}

const StoryInfoDialog: React.FC<StoryInfoDialogProps> = ({ pageCount, childAge }) => {
  return (
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
          <div className="flex justify-between items-center">
            <span className="font-medium">Illustrations:</span>
            <Badge variant="secondary">Stable Diffusion XL</Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StoryInfoDialog;
