
import React from 'react';
import StoryGenerator from '@/components/StoryGenerator';
import { IllustrationStyle } from '@/services/illustrationService';

interface StoryGenerationFormProps {
  prompt: string;
  pageCount: number;
  isGenerating: boolean;
  illustrationStyle: IllustrationStyle;
  useOptimizedPrompts?: boolean;
  onPromptChange: (prompt: string) => void;
  onPageCountChange: (count: number) => void;
  onGenerate: () => void;
  onStyleChange: (style: IllustrationStyle) => void;
  onToggleOptimizedPrompts?: () => void;
}

const StoryGenerationForm: React.FC<StoryGenerationFormProps> = ({
  prompt,
  pageCount,
  isGenerating,
  illustrationStyle,
  useOptimizedPrompts = true,
  onPromptChange,
  onPageCountChange,
  onGenerate,
  onStyleChange,
  onToggleOptimizedPrompts = () => {}
}) => {
  return (
    <div className="lg:col-span-1 order-2 lg:order-1">
      <StoryGenerator
        prompt={prompt}
        pageCount={pageCount}
        isGenerating={isGenerating}
        illustrationStyle={illustrationStyle}
        useOptimizedPrompts={useOptimizedPrompts}
        onPromptChange={onPromptChange}
        onPageCountChange={onPageCountChange}
        onGenerate={onGenerate}
        onStyleChange={onStyleChange}
        onToggleOptimizedPrompts={onToggleOptimizedPrompts}
      />
    </div>
  );
};

export default StoryGenerationForm;
