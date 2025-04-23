
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Lock } from 'lucide-react';

interface PaymentSummaryProps {
  format: string;
  isSubmitting: boolean;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({ format, isSubmitting }) => {
  // Prix selon le format
  const prices = {
    pdf: { price: 9.99, shipping: 0 },
    papier: { price: 19.99, shipping: 3.99 },
    premium: { price: 29.99, shipping: 0 }
  };
  
  const selectedPrice = prices[format as keyof typeof prices];
  const subtotal = selectedPrice.price;
  const shipping = selectedPrice.shipping;
  const total = subtotal + shipping;
  
  return (
    <Card className="bg-white p-6 rounded-xl shadow-lg sticky top-4">
      <h3 className="text-lg font-bold mb-4">Résumé de la commande</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Format</span>
          <span className="font-medium capitalize">{format === 'pdf' ? 'PDF Digital' : format === 'premium' ? 'Pack Premium' : 'Livre papier'}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Sous-total</span>
          <span>{subtotal.toFixed(2)} €</span>
        </div>
        
        {format !== 'pdf' && (
          <div className="flex justify-between">
            <span className="text-gray-600">Livraison</span>
            <span>{shipping > 0 ? `${shipping.toFixed(2)} €` : 'Gratuite'}</span>
          </div>
        )}
        
        <Separator className="my-2" />
        
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>{total.toFixed(2)} €</span>
        </div>
        
        <div className="pt-4">
          <Button 
            type="submit" 
            className="w-full h-auto py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "Traitement en cours..."
            ) : (
              <>
                <Lock className="mr-2 h-4 w-4" />
                Payer {total.toFixed(2)} €
              </>
            )}
          </Button>
        </div>
        
        <div className="text-xs text-gray-500 mt-2">
          <div className="flex items-center gap-1 mb-1">
            <CheckCircle className="h-3 w-3 text-green-500" />
            <span>Paiement 100% sécurisé</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3 text-green-500" />
            <span>Satisfaction garantie ou remboursé</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PaymentSummary;
