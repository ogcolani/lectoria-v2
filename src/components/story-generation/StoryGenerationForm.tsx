
import React from 'react';
import { useLocation } from 'react-router-dom';
import StoryGenerator from '@/components/StoryGenerator';
import { IllustrationStyle } from '@/services/illustrationService';

interface StoryGenerationFormProps {
  prompt: string;
  pageCount: number;
  isGenerating: boolean;
  illustrationStyle: IllustrationStyle;
  onPromptChange: (prompt: string) => void;
  onPageCountChange: (count: number) => void;
  onGenerate: () => void;
  onStyleChange: (style: IllustrationStyle) => void;
}

const StoryGenerationForm: React.FC<StoryGenerationFormProps> = ({
  prompt,
  pageCount,
  isGenerating,
  illustrationStyle,
  onPromptChange,
  onPageCountChange,
  onGenerate,
  onStyleChange,
}) => {
  const location = useLocation();

  return (
    <div className="lg:col-span-1 order-2 lg:order-1">
      <StoryGenerator
        prompt={prompt}
        pageCount={pageCount}
        isGenerating={isGenerating}
        illustrationStyle={illustrationStyle}
        onPromptChange={onPromptChange}
        onPageCountChange={onPageCountChange}
        onGenerate={onGenerate}
        onStyleChange={onStyleChange}
      />
    </div>
  );
};

export default StoryGenerationForm;
