
import React, { useEffect, useState } from 'react';
import { useLectoriaStore } from '@/store/useLectoriaStore';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, Trash } from 'lucide-react';
import { isSessionValid } from '@/utils/sessionUtils';

const SessionRecovery = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  
  // Access the store safely with conditional checks
  const store = useLectoriaStore();
  const clearAll = store ? store.clearAll : () => {};
  const heroName = store ? store.heroName : '';
  const storyPreview = store ? store.storyPreview : '';
  
  useEffect(() => {
    // Seulement vérifier si nous avons une instance valide du store
    if (store) {
      // Utiliser la nouvelle fonction isSessionValid pour déterminer si une session valide existe
      const sessionValid = isSessionValid(store);
      
      if (sessionValid) {
        setOpen(true);
      }
    }
  }, [store]);

  const handleResumeSession = () => {
    setOpen(false);
    
    // Naviguer vers la dernière page pertinente
    if (storyPreview) {
      navigate('/generation-histoire');
    } else if (heroName && heroName.trim().length > 1) {
      navigate('/story-elements');
    }
  };

  const handleStartNew = () => {
    // Réinitialiser toutes les données avec la nouvelle méthode clearAll
    if (typeof clearAll === 'function') {
      clearAll();
    }
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Session existante détectée</AlertDialogTitle>
          <AlertDialogDescription>
            Nous avons trouvé une histoire que vous avez commencée
            {heroName ? ` avec ${heroName}` : ''}.
            Souhaitez-vous continuer cette histoire ou en créer une nouvelle?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-2">
          <AlertDialogCancel 
            className="flex items-center justify-center"
            onClick={handleStartNew}
          >
            <Trash className="mr-2 h-4 w-4" />
            Nouvelle histoire
          </AlertDialogCancel>
          <AlertDialogAction 
            className="flex items-center justify-center"
            onClick={handleResumeSession}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Continuer mon histoire
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SessionRecovery;
