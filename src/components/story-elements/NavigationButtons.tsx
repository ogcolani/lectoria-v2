
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface NavigationButtonsProps {
  nextHref: string;
  backHref?: string;
  values?: string[];
  elements?: string[];
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ 
  nextHref,
  backHref,
  values = [],
  elements = []
}) => {
  const navigate = useNavigate();
  
  const handleContinue = () => {
    navigate(nextHref, { state: { storyValues: values, storyElements: elements } });
  };
  
  const handleBack = () => {
    if (backHref) {
      navigate(backHref);
    }
  };
  
  return (
    <div className="flex justify-between items-center mt-8">
      {backHref && (
        <Button 
          variant="outline" 
          onClick={handleBack}
        >
          Retour
        </Button>
      )}
      <div className="ml-auto">
        <Button 
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          onClick={handleContinue}
        >
          Continuer
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default NavigationButtons;
