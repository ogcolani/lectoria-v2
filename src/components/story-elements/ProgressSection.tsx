
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface ProgressSectionProps {
  progress: number;
}

const ProgressSection: React.FC<ProgressSectionProps> = ({ progress }) => {
  return (
    <div className="mb-10 max-w-xl mx-auto">
      <div className="flex justify-between text-sm font-medium text-gray-500 mb-2">
        <span>Étape 3 sur 5</span>
        <span>{progress}% complété</span>
      </div>
      <Progress value={progress} className="h-2 bg-gray-200" />
    </div>
  );
};

export default ProgressSection;
