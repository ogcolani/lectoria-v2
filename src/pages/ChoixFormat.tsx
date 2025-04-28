import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { useLectoriaStore } from '@/store/useLectoriaStore';
import { Check, CreditCard, ShoppingCart } from 'lucide-react';
import OrderSummary from '@/components/order/OrderSummary';

// Définition des formats et prix
const formatOptions = {
  pdf: {
    label: "Format PDF",
    description: "Version numérique à télécharger immédiatement",
    price: 14.99,
    discount: 0,
  },
  papier: { 
    label: "Format physique seul",
    description: "Livre imprimé de qualité premium avec couverture rigide",
    price: 39.99,
    discount: 0,
  },
  pack: { 
    label: "Format physique + PDF",
    description: "Livre imprimé + version numérique à télécharger immédiatement",
    price: 49.99,
    discount: 5, // Remise de 5€
  }
};

// Codes promo valides
const validPromoCodes = {
  "BIENVENUE10": 10, // 10% de réduction
  "LECTORIA5": 5,    // 5€ de réduction
};

const ChoixFormat: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'papier' | 'pack'>('papier');
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null);
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  
  // Récupération des données du store
  const { 
    heroName, 
    heroAge, 
    heroGender, 
    heroDescription, 
    heroTrait,
    selectedValues,
    storyPreview,
    illustrationUrl 
  } = useLectoriaStore();
  
  // Calcul des prix
  const basePrice = formatOptions[selectedFormat].price;
  const formatDiscount = formatOptions[selectedFormat].discount;
  const totalBeforePromo = basePrice - formatDiscount;
  const finalTotal = totalBeforePromo - appliedDiscount;
  
  const handleFormatSelection = (format: 'pdf' | 'papier' | 'pack') => {
    setSelectedFormat(format);
  };
  
  const handleApplyPromoCode = () => {
    if (!promoCode.trim()) {
      toast.error("Veuillez entrer un code promo");
      return;
    }
    
    const upperCaseCode = promoCode.toUpperCase();
    if (validPromoCodes[upperCaseCode as keyof typeof validPromoCodes]) {
      const discount = validPromoCodes[upperCaseCode as keyof typeof validPromoCodes];
      
      // Si le code est un pourcentage (BIENVENUE10)
      let discountAmount = discount;
      if (upperCaseCode === "BIENVENUE10") {
        discountAmount = parseFloat((totalBeforePromo * 0.1).toFixed(2));
      }
      
      setAppliedPromoCode(upperCaseCode);
      setAppliedDiscount(discountAmount);
      toast.success(`Code promo "${upperCaseCode}" appliqué avec succès!`);
    } else {
      toast.error("Code promo invalide");
    }
  };
  
  const handleContinue = () => {
    // Stockage du format et du prix dans le localStorage ou un état global
    // avant de naviguer vers la page suivante
    localStorage.setItem('selectedFormat', selectedFormat);
    localStorage.setItem('finalPrice', finalTotal.toString());
    navigate('/recapitulatif-commande');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-white">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
            Choisissez votre format
          </span>
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Colonne de gauche: Options de format */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {/* Option Format PDF */}
              <Card 
                className={`p-6 cursor-pointer transition-all hover:shadow-md ${
                  selectedFormat === 'pdf' ? 'border-2 border-purple-500 bg-purple-50' : 'border border-gray-200'
                }`}
                onClick={() => handleFormatSelection('pdf')}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg">Format PDF</h3>
                    <p className="text-gray-600 text-sm">Version numérique</p>
                  </div>
                  {selectedFormat === 'pdf' && (
                    <div className="bg-purple-500 text-white rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>
                <div className="text-2xl font-bold text-purple-700">
                  14,99 €
                </div>
                <ul className="mt-3 text-sm text-gray-600 space-y-1">
                  <li className="flex items-center">
                    <Check className="h-3 w-3 text-green-500 mr-2" />
                    <span>Téléchargement immédiat</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-3 w-3 text-green-500 mr-2" />
                    <span>Format haute qualité</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-3 w-3 text-green-500 mr-2" />
                    <span>Lecture sur tous supports</span>
                  </li>
                </ul>
              </Card>

              {/* Option Format Physique */}
              <Card 
                className={`p-6 cursor-pointer transition-all hover:shadow-md ${
                  selectedFormat === 'papier' ? 'border-2 border-purple-500 bg-purple-50' : 'border border-gray-200'
                }`}
                onClick={() => handleFormatSelection('papier')}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg">Format physique</h3>
                    <p className="text-gray-600 text-sm">Livre imprimé de qualité</p>
                  </div>
                  {selectedFormat === 'papier' && (
                    <div className="bg-purple-500 text-white rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>
                <div className="text-2xl font-bold text-purple-700">
                  39,99 €
                </div>
                <ul className="mt-3 text-sm text-gray-600 space-y-1">
                  <li className="flex items-center">
                    <Check className="h-3 w-3 text-green-500 mr-2" />
                    <span>Couverture rigide</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-3 w-3 text-green-500 mr-2" />
                    <span>Papier de haute qualité</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-3 w-3 text-green-500 mr-2" />
                    <span>Livraison sous 5 jours</span>
                  </li>
                </ul>
              </Card>
              
              {/* Option Format Physique + PDF */}
              <Card 
                className={`p-6 cursor-pointer transition-all hover:shadow-md ${
                  selectedFormat === 'pack' ? 'border-2 border-purple-500 bg-purple-50' : 'border border-gray-200'
                }`}
                onClick={() => handleFormatSelection('pack')}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg">Format physique + PDF</h3>
                    <p className="text-gray-600 text-sm">La formule complète</p>
                    <div className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded mt-1 inline-block">
                      Économisez 5€
                    </div>
                  </div>
                  {selectedFormat === 'pack' && (
                    <div className="bg-purple-500 text-white rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>
                <div className="flex items-center">
                  <div className="text-2xl font-bold text-purple-700">
                    44,99 €
                  </div>
                  <div className="ml-2 text-sm text-gray-500 line-through">
                    49,99 €
                  </div>
                </div>
                <ul className="mt-3 text-sm text-gray-600 space-y-1">
                  <li className="flex items-center">
                    <Check className="h-3 w-3 text-green-500 mr-2" />
                    <span>Livre physique de qualité</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-3 w-3 text-green-500 mr-2" />
                    <span>Version PDF immédiate</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-3 w-3 text-green-500 mr-2" />
                    <span>Accès depuis tous les appareils</span>
                  </li>
                </ul>
              </Card>
            </div>

            {/* Code promo */}
            <Card className="p-6 mb-8">
              <h3 className="font-medium text-lg mb-4">Code de réduction</h3>
              <div className="flex space-x-2">
                <Input
                  placeholder="Entrez votre code promo"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleApplyPromoCode}>
                  Appliquer
                </Button>
              </div>
              {appliedPromoCode && (
                <div className="mt-2 text-sm text-green-600">
                  Code "{appliedPromoCode}" appliqué avec succès
                </div>
              )}
            </Card>
            
            {/* Aperçu de la commande */}
            <Card className="p-6 mb-8">
              <h3 className="font-medium text-lg mb-4">Récapitulatif du livre</h3>
              <OrderSummary
                heroName={heroName}
                heroAge={heroAge}
                heroGender={heroGender}
                heroDescription={heroDescription}
                heroTrait={heroTrait}
                selectedValues={selectedValues}
                storyPreview={storyPreview}
                illustrationUrl={illustrationUrl}
                pageCount={24}
              />
            </Card>
          </div>
          
          {/* Colonne de droite: Récapitulatif du panier */}
          <div>
            <Card className="bg-white p-6 rounded-xl shadow-md sticky top-4">
              <h3 className="text-lg font-bold mb-4">Votre panier</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Format</span>
                  <span className="font-medium">{selectedFormat === 'papier' ? 'Physique' : selectedFormat === 'pdf' ? 'PDF' : 'Physique + PDF'}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Prix normal</span>
                  <span>{formatOptions[selectedFormat].price.toFixed(2)} €</span>
                </div>
                
                {formatOptions[selectedFormat].discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Remise pack</span>
                    <span>-{formatOptions[selectedFormat].discount.toFixed(2)} €</span>
                  </div>
                )}
                
                {appliedPromoCode && (
                  <div className="flex justify-between text-green-600">
                    <span>Code "{appliedPromoCode}"</span>
                    <span>-{appliedDiscount.toFixed(2)} €</span>
                  </div>
                )}
                
                <Separator className="my-2" />
                
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{finalTotal.toFixed(2)} €</span>
                </div>
                
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Livraison</span>
                  <span>Gratuite</span>
                </div>
                
                <div className="pt-4">
                  <Button 
                    onClick={handleContinue}
                    className="w-full h-auto py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Commander maintenant
                  </Button>
                </div>
                
                <div className="text-center text-xs text-gray-500 mt-2">
                  Paiement sécurisé
                </div>
                
                <div className="flex justify-center space-x-2 mt-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
                  <img src="https://cdn.worldvectorlogo.com/logos/klarna-1.svg" alt="Klarna" className="h-6" />
                </div>
                
                <div className="text-xs text-gray-500 mt-2">
                  <div className="flex items-center gap-1 mb-1">
                    <Check className="h-3 w-3 text-green-500" />
                    <span>Paiement 100% sécurisé</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Check className="h-3 w-3 text-green-500" />
                    <span>Satisfaction garantie ou remboursé</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ChoixFormat;
