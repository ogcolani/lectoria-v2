
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Sparkles } from 'lucide-react';

interface PromptOptimizerToggleProps {
  enabled: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

const PromptOptimizerToggle: React.FC<PromptOptimizerToggleProps> = ({
  enabled,
  onToggle,
  disabled = false
}) => {
  return (
    <div className="flex items-center space-x-2 py-4">
      <Switch 
        id="prompt-optimizer"
        checked={enabled}
        onCheckedChange={onToggle}
        disabled={disabled}
      />
      <Label htmlFor="prompt-optimizer" className="flex items-center gap-1 cursor-pointer">
        <Sparkles className={`h-4 w-4 ${enabled ? 'text-purple-500' : 'text-gray-500'}`} />
        <span className={enabled ? 'text-purple-700' : 'text-gray-700'}>
          Optimisation de prompt par IA
        </span>
      </Label>
      <div className="ml-auto text-xs text-gray-500 italic">
        {enabled ? 'Activé' : 'Désactivé'}
      </div>
    </div>
  );
};

export default PromptOptimizerToggle;
