
import React from 'react';
import { Link } from 'react-router-dom';
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
  return (
    <div className="flex justify-between items-center mt-8">
      {backHref && (
        <Link to={backHref}>
          <Button variant="outline">Retour</Button>
        </Link>
      )}
      <div className="ml-auto">
        <Link to={nextHref} state={{ storyValues: values, storyElements: elements }}>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            Continuer
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NavigationButtons;
