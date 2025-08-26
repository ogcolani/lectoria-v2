import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';

interface OrderDetails {
  id: string;
  child_name: string;
  child_age: number;
  status: string;
  created_at: string;
}

interface StoryPreview {
  title: string;
  pages: Array<{ pageNumber: number; content: string }>;
  totalPages: number;
}

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [storyPreview, setStoryPreview] = useState<StoryPreview | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const orderId = searchParams.get('orderId');

  useEffect(() => {
    if (orderId) {
      loadOrderDetails();
    } else {
      toast({
        title: "Erreur",
        description: "Aucun identifiant de commande fourni.",
        variant: "destructive",
      });
      navigate('/');
    }
  }, [orderId]);

  const loadOrderDetails = async () => {
    if (!orderId) return;
    
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.functions.invoke('get-story', {
        body: { orderId }
      });
      
      if (error) {
        console.error('Error loading order:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les détails de la commande.",
          variant: "destructive",
        });
        return;
      }
      
      if (data?.success) {
        setOrderDetails(data.orderDetails);
        setStoryPreview(data.storyPreview);
      } else {
        toast({
          title: "Erreur",
          description: "Commande introuvable.",
          variant: "destructive",
        });
        navigate('/');
      }
    } catch (error) {
      console.error('Error loading order details:', error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors du chargement.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!orderId) return;
    
    setIsProcessing(true);
    
    try {
      // Simulation de paiement pour l'instant
      // Dans une vraie implémentation, cela appellerait Stripe
      
      toast({
        title: "Traitement du paiement",
        description: "Redirection vers le paiement sécurisé...",
      });
      
      // Simuler un délai de traitement
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Pour l'instant, on redirige directement vers la page de succès
      navigate(`/checkout-success?orderId=${orderId}`);
      
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Erreur de paiement",
        description: "Une erreur s'est produite lors du traitement du paiement.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-white">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
            <p className="text-gray-600 mt-4">Chargement des détails de votre commande...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!orderDetails || !storyPreview) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-white">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Commande introuvable</h1>
            <p className="text-gray-600 mb-6">
              Impossible de trouver les détails de cette commande.
            </p>
            <Button onClick={() => navigate('/')} variant="outline">
              Retour à l'accueil
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-white">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
              Finaliser votre commande
            </span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Story Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Votre Histoire</CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="text-xl font-semibold mb-4">{storyPreview.title}</h3>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                  <p className="text-amber-800 text-sm">
                    <strong>Aperçu (≈15%)</strong> - {storyPreview.pages.length} pages affichées sur {storyPreview.totalPages} pages totales
                  </p>
                </div>
                
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {storyPreview.pages.slice(0, 3).map((page, index) => (
                    <div key={index} className="border-l-4 border-purple-300 pl-4">
                      <p className="text-sm text-gray-600 mb-1">Page {page.pageNumber}</p>
                      <p className="text-gray-800 text-sm leading-relaxed">
                        {page.content.substring(0, 200)}
                        {page.content.length > 200 && '...'}
                      </p>
                    </div>
                  ))}
                  
                  {storyPreview.pages.length > 3 && (
                    <div className="text-center py-4 border-2 border-dashed border-gray-300 rounded-lg">
                      <p className="text-gray-500 text-sm">
                        + {storyPreview.pages.length - 3} pages d'aperçu supplémentaires
                      </p>
                      <p className="text-purple-600 text-sm font-medium mt-1">
                        Histoire complète disponible après commande
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Récapitulatif de commande</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Détails du personnage</h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <p><span className="font-medium">Prénom:</span> {orderDetails.child_name}</p>
                    <p><span className="font-medium">Âge:</span> {orderDetails.child_age} ans</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Livre personnalisé</h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <p><span className="font-medium">Format:</span> Livre relié premium</p>
                    <p><span className="font-medium">Pages:</span> {storyPreview.totalPages} pages</p>
                    <p><span className="font-medium">Illustrations:</span> Couleur</p>
                    <p><span className="font-medium">Personnalisation:</span> Incluse</p>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xl font-bold">Total</span>
                    <span className="text-2xl font-bold text-purple-600">24,99 €</span>
                  </div>
                  
                  <Button 
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 text-lg"
                  >
                    {isProcessing ? 'Traitement...' : 'Procéder au paiement'}
                  </Button>
                  
                  <p className="text-xs text-gray-500 mt-3 text-center">
                    Paiement sécurisé • Livraison sous 5-7 jours ouvrés
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;