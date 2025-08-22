import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Package, Truck, Mail } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface OrderInfo {
  id: string;
  child_name: string;
  child_age: number;
  print_status: string;
  created_at: string;
}

const CheckoutSuccess = () => {
  const [searchParams] = useSearchParams();
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const orderId = searchParams.get('orderId');

  useEffect(() => {
    const fetchOrderInfo = async () => {
      if (!orderId) {
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke('get-story', {
          body: { orderId }
        });

        if (error) {
          console.error('Error fetching order:', error);
          return;
        }

        if (data.success && data.order) {
          setOrderInfo(data.order);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderInfo();
  }, [orderId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-white">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement...</p>
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
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              ✅ Merci pour votre commande !
            </h1>
            <p className="text-lg text-gray-600">
              Votre livre part en impression
            </p>
          </div>

          {/* Order Details */}
          {orderInfo && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Détails de votre commande</CardTitle>
                <CardDescription>
                  Commande #{orderInfo.id.slice(0, 8)}...
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Nom de l'enfant</p>
                    <p className="text-lg font-semibold">{orderInfo.child_name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Âge</p>
                    <p className="text-lg font-semibold">{orderInfo.child_age} ans</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Statut d'impression</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Package className="h-4 w-4 text-purple-600" />
                    <span className="font-medium capitalize">
                      {orderInfo.print_status === 'pending' && 'En attente'}
                      {orderInfo.print_status === 'processing' && 'En cours de traitement'}
                      {orderInfo.print_status === 'printing' && 'En impression'}
                      {orderInfo.print_status === 'shipped' && 'Expédié'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Process Steps */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Prochaines étapes</CardTitle>
              <CardDescription>
                Voici ce qui va se passer maintenant
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Paiement confirmé</h3>
                    <p className="text-sm text-gray-600">
                      Votre paiement a été traité avec succès
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Package className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Préparation en cours</h3>
                    <p className="text-sm text-gray-600">
                      Votre livre personnalisé est en cours de préparation
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <Truck className="h-4 w-4 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-500">Expédition (5-7 jours)</h3>
                    <p className="text-sm text-gray-600">
                      Vous recevrez un email de suivi dès l'expédition
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <Mail className="h-4 w-4 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-500">Livraison</h3>
                    <p className="text-sm text-gray-600">
                      Réception à votre domicile
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Important Note */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <Mail className="h-3 w-3 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-blue-900 mb-1">
                    Important
                  </h3>
                  <p className="text-sm text-blue-800">
                    Vous recevrez un email de confirmation avec les détails de votre commande. 
                    Le livre complet ne sera accessible qu'après réception du livre imprimé.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CheckoutSuccess;