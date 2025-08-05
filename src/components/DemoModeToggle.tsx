import React, { useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { TestTube2, AlertTriangle } from 'lucide-react';
import { useLectoriaStore } from '@/store/useLectoriaStore';

const DemoModeToggle: React.FC = () => {
  const { isDemoMode, setIsDemoMode, fillDemoData } = useLectoriaStore();
  
  // Masquer le toggle en production seulement
  const isProduction = import.meta.env.VITE_ENV === 'production';
  const isDevelopment = import.meta.env.DEV || import.meta.env.VITE_ENV === 'staging';
  
  useEffect(() => {
    if (isDemoMode && isDevelopment) {
      fillDemoData();
    }
  }, [isDemoMode, isDevelopment, fillDemoData]);

  if (isProduction) {
    return null;
  }

  const handleToggle = (checked: boolean) => {
    setIsDemoMode(checked);
    if (checked && isDevelopment) {
      fillDemoData();
    }
  };

  return (
    <Card className="p-4 border-orange-200 bg-orange-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <TestTube2 className="h-5 w-5 text-orange-600" />
          <div>
            <Label htmlFor="demo-mode" className="text-sm font-medium text-orange-800">
              Mode DEMO
            </Label>
            <p className="text-xs text-orange-600">
              {isDevelopment ? 'Auto-remplissage des champs de test' : 'Disponible en développement uniquement'}
            </p>
          </div>
        </div>
        <Switch
          id="demo-mode"
          checked={isDemoMode}
          onCheckedChange={handleToggle}
          disabled={!isDevelopment}
        />
      </div>
      
      {isDemoMode && (
        <div className="mt-3 flex items-center space-x-2 text-xs text-orange-700 bg-orange-100 p-2 rounded">
          <AlertTriangle className="h-4 w-4" />
          <span>MODE TEST ACTIVÉ - Données factices utilisées</span>
        </div>
      )}
    </Card>
  );
};

export default DemoModeToggle;