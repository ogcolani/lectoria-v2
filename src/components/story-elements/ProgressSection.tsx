
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface ProgressSectionProps {
  progress: number;
  currentStep?: number;
  totalSteps?: number;
}

const ProgressSection: React.FC<ProgressSectionProps> = ({ 
  progress, 
  currentStep = 2, 
  totalSteps = 5 
}) => {
  return (
    <div className="mb-10 max-w-xl mx-auto">
      <div className="flex justify-between text-sm font-medium text-gray-500 mb-2">
        <span>Étape {currentStep} sur {totalSteps}</span>
        <span>{progress}% complété</span>
      </div>
      <Progress value={progress} className="h-2 bg-gray-200" />
    </div>
  );
};

export default ProgressSection;
