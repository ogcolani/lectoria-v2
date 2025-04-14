
import React from 'react';
import { Card } from '@/components/ui/card';
import { User, Palette, Wand2 } from 'lucide-react';

type CategoryTab = 'personnage' | 'apparence' | 'pouvoirs';

interface CategoryTabsProps {
  activeTab: CategoryTab;
  onTabChange: (tab: CategoryTab) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="grid grid-cols-3 gap-4 mt-6">
      <Card 
        className={`p-4 cursor-pointer hover:bg-purple-50 transition-colors border-2 ${
          activeTab === 'personnage' ? 'border-purple-500 bg-purple-50' : 'border-transparent hover:border-purple-200'
        }`}
        onClick={() => onTabChange('personnage')}
      >
        <div className="flex flex-col items-center text-center">
          <User className={`h-8 w-8 ${activeTab === 'personnage' ? 'text-purple-700' : 'text-purple-600'} mb-2`} />
          <span className="text-sm font-medium">Personnage</span>
        </div>
      </Card>
      
      <Card 
        className={`p-4 cursor-pointer hover:bg-purple-50 transition-colors border-2 ${
          activeTab === 'apparence' ? 'border-purple-500 bg-purple-50' : 'border-transparent hover:border-purple-200'
        }`}
        onClick={() => onTabChange('apparence')}
      >
        <div className="flex flex-col items-center text-center">
          <Palette className={`h-8 w-8 ${activeTab === 'apparence' ? 'text-purple-700' : 'text-purple-600'} mb-2`} />
          <span className="text-sm font-medium">Apparence</span>
        </div>
      </Card>
      
      <Card 
        className={`p-4 cursor-pointer hover:bg-purple-50 transition-colors border-2 ${
          activeTab === 'pouvoirs' ? 'border-purple-500 bg-purple-50' : 'border-transparent hover:border-purple-200'
        }`}
        onClick={() => onTabChange('pouvoirs')}
      >
        <div className="flex flex-col items-center text-center">
          <Wand2 className={`h-8 w-8 ${activeTab === 'pouvoirs' ? 'text-purple-700' : 'text-purple-600'} mb-2`} />
          <span className="text-sm font-medium">Pouvoirs</span>
        </div>
      </Card>
    </div>
  );
};

export default CategoryTabs;
