
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gift, BookOpen, FileDigit } from 'lucide-react';

const OffresCadeaux = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-4">Offres Cadeaux</h1>
        <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Découvrez nos offres spéciales et produits à prix réduits pour faire plaisir à vos proches.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="border-2 border-purple-200 hover:shadow-lg transition-all">
            <CardHeader>
              <div className="bg-purple-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                <BookOpen className="text-purple-600" />
              </div>
              <CardTitle>Livre Imprimé</CardTitle>
              <CardDescription>Format premium avec couverture personnalisée</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">
                <span className="line-through text-gray-400 text-xl mr-2">49,99€</span>
                39,99€
              </div>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Livre format A5 de qualité
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> 24 pages illustrées
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Livraison sous 5-7 jours
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Acheter maintenant</Button>
            </CardFooter>
          </Card>
          
          <Card className="border-2 border-pink-200 hover:shadow-lg transition-all">
            <CardHeader>
              <div className="bg-pink-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                <FileDigit className="text-pink-600" />
              </div>
              <CardTitle>eBook PDF</CardTitle>
              <CardDescription>À lire sur tous vos appareils</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">
                <span className="line-through text-gray-400 text-xl mr-2">14,99€</span>
                9,99€
              </div>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Format PDF haute qualité
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Livraison immédiate par email
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Lisible sur tous supports
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Acheter maintenant</Button>
            </CardFooter>
          </Card>
          
          <Card className="border-2 border-purple-400 hover:shadow-lg transition-all">
            <div className="absolute -top-3 right-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs py-1 px-3 rounded-full">
              OFFRE SPÉCIALE
            </div>
            <CardHeader>
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                <Gift className="text-purple-600" />
              </div>
              <CardTitle>Pack Livre + eBook</CardTitle>
              <CardDescription>L'offre complète à prix réduit</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">
                <span className="line-through text-gray-400 text-xl mr-2">59,99€</span>
                44,99€
              </div>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Livre imprimé format A5
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> eBook PDF immédiat
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Économisez 5€ par rapport aux prix séparés
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500">Acheter maintenant</Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl mb-16">
          <h2 className="text-2xl font-bold text-center mb-6">Offre spéciale limitée</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-bold mb-3">eBook gratuit</h3>
              <p className="mb-4">
                Pour toute commande d'un livre imprimé, recevez gratuitement un eBook "Les valeurs essentielles à transmettre à son enfant".
              </p>
              <Button>Profiter de l'offre</Button>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80" 
                alt="Livre bonus gratuit" 
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OffresCadeaux;
