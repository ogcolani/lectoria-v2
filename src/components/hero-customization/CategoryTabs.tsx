
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Palette, Wand2, ImageIcon } from 'lucide-react';

export type CategoryTab = 'personnage' | 'apparence' | 'pouvoirs' | 'illustration';

interface TabItem {
  id: CategoryTab;
  label: string;
}

interface CategoryTabsProps {
  activeTab: CategoryTab;
  onTabChange: (tab: CategoryTab) => void;
  tabs?: TabItem[];
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ 
  activeTab, 
  onTabChange,
  tabs = [
    { id: 'personnage', label: 'Personnage' },
    { id: 'apparence', label: 'Apparence' },
    { id: 'pouvoirs', label: 'Pouvoirs' }
  ]
}) => {
  // Helper to get icon based on tab ID
  const getTabIcon = (tabId: CategoryTab) => {
    switch (tabId) {
      case 'personnage':
        return <User className="h-4 w-4" />;
      case 'apparence':
        return <Palette className="h-4 w-4" />;
      case 'pouvoirs':
        return <Wand2 className="h-4 w-4" />;
      case 'illustration':
        return <ImageIcon className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="my-6">
      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={(value) => onTabChange(value as CategoryTab)}>
        <TabsList className="w-full">
          {tabs.map((tab) => (
            <TabsTrigger 
              key={tab.id}
              value={tab.id}
              className="flex items-center gap-2 flex-1"
            >
              {getTabIcon(tab.id)}
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default CategoryTabs;
