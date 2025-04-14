
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Gift, Home, BookText } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur border-b py-3">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Lectoria</span>
        </Link>
        
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <Home className="w-4 h-4 mr-2" />
                  Accueil
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/creation-livre">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <BookOpen className="w-4 h-4 mr-2" />
                  Créer mon livre
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/notre-histoire">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <BookText className="w-4 h-4 mr-2" />
                  Notre histoire
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/offres-cadeaux">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <Gift className="w-4 h-4 mr-2" />
                  Offres cadeaux
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

export default Header;

