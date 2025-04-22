
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

interface PageCountSelectorProps {
  pageCount: number;
  onPageCountChange: (count: number) => void;
  isGenerating: boolean;
}

const PageCountSelector: React.FC<PageCountSelectorProps> = ({
  pageCount,
  onPageCountChange,
  isGenerating
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <Label htmlFor="pageCount" className="text-base font-medium">
          Longueur du livre
        </Label>
        <span className="text-sm font-medium">{pageCount} pages</span>
      </div>
      <Slider
        id="pageCount"
        defaultValue={[pageCount]}
        min={24}
        max={40}
        step={2}
        onValueChange={(value) => onPageCountChange(value[0])}
        disabled={isGenerating}
        className="py-2"
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>Court</span>
        <span>Moyen</span>
        <span>Long</span>
      </div>
    </div>
  );
};

export default PageCountSelector;
