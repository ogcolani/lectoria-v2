import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { TestTube2, AlertTriangle } from 'lucide-react';

const TestModeBanner: React.FC = () => {
  const isStaging = import.meta.env.VITE_ENV === 'staging';
  
  // Afficher le bandeau uniquement en staging
  if (!isStaging) {
    return null;
  }

  return (
    <Alert className="border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50 mb-4">
      <div className="flex items-center space-x-2">
        <TestTube2 className="h-5 w-5 text-orange-600" />
        <AlertTriangle className="h-4 w-4 text-orange-500" />
      </div>
      <AlertDescription className="text-orange-800 font-medium">
        <span className="font-bold">MODE TEST – ENVIRONNEMENT STAGING</span>
        <br />
        Vous utilisez des données factices. Aucune donnée réelle n'est utilisée ou sauvegardée.
      </AlertDescription>
    </Alert>
  );
};

export default TestModeBanner;