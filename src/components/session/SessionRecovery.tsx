
import React, { useEffect, useState } from 'react';
import { useLectoriaStore } from '@/store/useLectoriaStore';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, Trash } from 'lucide-react';

const SessionRecovery = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  
  // Access the store safely with conditional checks
  const store = useLectoriaStore();
  const hasExistingSession = store ? store.hasExistingSession : () => false;
  const heroName = store ? store.heroName : '';
  const storyPreview = store ? store.storyPreview : '';
  const resetAllData = store ? store.resetAllData : () => {};
  
  useEffect(() => {
    // Verify store is initialized before checking for existing session
    if (store && typeof hasExistingSession === 'function') {
      const hasSession = hasExistingSession();
      if (hasSession) {
        setOpen(true);
      }
    }
  }, [store, hasExistingSession]);

  const handleResumeSession = () => {
    setOpen(false);
    
    // Naviguer vers la dernière page pertinente
    if (storyPreview) {
      navigate('/generation-histoire');
    } else if (heroName) {
      navigate('/story-elements');
    }
  };

  const handleStartNew = () => {
    // Réinitialiser toutes les données
    if (typeof resetAllData === 'function') {
      resetAllData();
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
