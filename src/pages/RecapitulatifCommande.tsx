
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Progress } from '@/components/ui/progress';
import { useLectoriaStore } from '@/store/useLectoriaStore';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import OrderSummary from '@/components/order/OrderSummary';

const RecapitulatifCommande = () => {
  const navigate = useNavigate();
  const {
    heroName,
    heroAge,
    heroGender,
    heroDescription,
    heroTrait,
    selectedValues,
    storyPreview,
    illustrationUrl,
    pageCount,
    setProgress
  } = useLectoriaStore();

  React.useEffect(() => {
    // Mettre à jour la progression pour cette étape
    setProgress(85);
  }, [setProgress]);

  const handleProceedToCheckout = () => {
    navigate('/commande');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-white">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
            Récapitulatif de ta commande
          </span>
        </h1>
        
        <div className="mb-10 max-w-xl mx-auto">
          <div className="flex justify-between text-sm font-medium text-gray-500 mb-2">
            <span>Étape 5 sur 6</span>
            <span>{85}% complété</span>
          </div>
          <Progress value={85} className="h-2 bg-gray-200" />
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">
              Vérifie les détails de ton histoire personnalisée
            </h2>
            
            <OrderSummary 
              heroName={heroName}
              heroAge={heroAge}
              heroGender={heroGender}
              heroDescription={heroDescription}
              heroTrait={heroTrait}
              selectedValues={selectedValues}
              storyPreview={storyPreview}
              illustrationUrl={illustrationUrl}
              pageCount={pageCount}
            />
            
            <div className="mt-8 flex justify-center">
              <Button 
                size="lg" 
                onClick={handleProceedToCheckout} 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg shadow-md"
              >
                Commander ce livre
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RecapitulatifCommande;
