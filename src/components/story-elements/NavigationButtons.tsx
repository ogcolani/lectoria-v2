
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationButtonsProps {
  backHref?: string;
  nextHref?: string;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ 
  backHref = "/creation-livre", // Default to story type selection page
  nextHref = "/generation-histoire" 
}) => {
  return (
    <div className="flex justify-between items-center pt-4 border-t mt-8">
      <Link to={backHref}>
        <Button variant="outline" type="button">
          <ChevronLeft className="mr-2 h-4 w-4" /> Retour
        </Button>
      </Link>
      <Link to={nextHref}>
        <Button 
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          Continuer <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
};

export default NavigationButtons;
