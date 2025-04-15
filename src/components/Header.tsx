
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, BookOpen, Gift, Home, BookText, X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';

const menuItems = [
  { to: "/", icon: Home, label: "Accueil" },
  { to: "/creation-livre", icon: BookOpen, label: "Créer mon livre" },
  { to: "/notre-histoire", icon: BookText, label: "Notre histoire" },
  { to: "/offres-cadeaux", icon: Gift, label: "Offres cadeaux" },
];

const Header = () => {
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur border-b py-3">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
            Lectoria
          </span>
        </Link>

        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-6">
                {menuItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent text-foreground"
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        ) : (
          <NavigationMenu>
            <NavigationMenuList>
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.to}>
                  <Link to={item.to}>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        )}
      </div>
    </header>
  );
};

export default Header;
