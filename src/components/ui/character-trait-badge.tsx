
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Heart } from 'lucide-react';

interface CharacterTraitBadgeProps {
  trait: string;
}

const CharacterTraitBadge: React.FC<CharacterTraitBadgeProps> = ({ trait }) => {
  return (
    <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 border-0 flex items-center gap-1 px-3 py-1 my-1 mr-1 font-normal">
      <Heart className="h-3 w-3" />
      {trait.trim()}
    </Badge>
  );
};

export default CharacterTraitBadge;
