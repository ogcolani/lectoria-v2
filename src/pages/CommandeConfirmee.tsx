
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useLectoriaStore } from '@/store/useLectoriaStore';
import { CheckCircle, Download, Home } from 'lucide-react';

const CommandeConfirmee = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { resetStoryData } = useLectoriaStore();
  
  // Récupérer les données de la commande de location.state
  const { orderData, format, pdfUrl } = location.state || {};
  
  React.useEffect(() => {
    // Réinitialiser les données de génération mais garder les détails du héros
    // pour permettre à l'utilisateur de créer une autre histoire facilement
    resetStoryData();
  }, [resetStoryData]);
  
  // Si on arrive sur cette page sans données, rediriger vers l'accueil
  React.useEffect(() => {
    if (!orderData) {
      navigate('/');
    }
  }, [orderData, navigate]);

  if (!orderData) return null;
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-white">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-4">
            Merci pour ta commande !
          </h1>
          
          <p className="text-lg text-gray-700 mb-6">
            Un email de confirmation a été envoyé à <span className="font-medium">{orderData.email}</span>
          </p>
          
          <div className="bg-purple-50 p-6 rounded-xl mb-8">
            <h2 className="text-xl font-semibold mb-4">Détails de la commande</h2>
            
            <div className="grid grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-gray-600 text-sm">Format</p>
                <p className="font-medium capitalize">{format === 'pdf' ? 'PDF Digital' : format === 'premium' ? 'Pack Premium' : 'Livre papier'}</p>
              </div>
              
              <div>
                <p className="text-gray-600 text-sm">Nom</p>
                <p className="font-medium">{orderData.firstName} {orderData.lastName}</p>
              </div>
              
              {(format === 'papier' || format === 'premium') && (
                <>
                  <div className="col-span-2">
                    <p className="text-gray-600 text-sm">Adresse de livraison</p>
                    <p className="font-medium">
                      {orderData.address.street}, {orderData.address.postalCode} {orderData.address.city}, {orderData.address.country}
                    </p>
                  </div>
                  
                  <div className="col-span-2">
                    <p className="text-gray-600 text-sm">Délai de livraison estimé</p>
                    <p className="font-medium">5-7 jours ouvrés</p>
                  </div>
                </>
              )}
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            {(format === 'pdf' || format === 'premium') && pdfUrl && (
              <Button 
                variant="default"
                size="lg"
                onClick={() => window.open(pdfUrl, '_blank')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Download className="mr-2 h-4 w-4" />
                Télécharger le PDF
              </Button>
            )}
            
            <Button 
              variant="outline"
              size="lg"
              onClick={() => navigate('/')}
            >
              <Home className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CommandeConfirmee;
