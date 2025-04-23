
import React from 'react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useLectoriaStore } from '@/store/useLectoriaStore';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Book } from 'lucide-react';

const OrderDetails = () => {
  const navigate = useNavigate();
  const { heroName, pageCount } = useLectoriaStore();
  
  return (
    <Card className="bg-white p-6 rounded-xl shadow-lg mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">Détails du livre</h3>
        <button 
          onClick={() => navigate('/recapitulatif-commande')}
          className="text-sm text-purple-600 hover:text-purple-800 flex items-center"
        >
          <ArrowLeft className="h-3 w-3 mr-1" />
          Modifier
        </button>
      </div>
      
      <div className="flex items-start space-x-3">
        <div className="h-14 w-12 bg-purple-100 rounded flex items-center justify-center flex-shrink-0">
          <Book className="h-6 w-6 text-purple-600" />
        </div>
        
        <div>
          <div className="font-medium">Histoire personnalisée de {heroName}</div>
          <div className="text-sm text-gray-600">
            {pageCount} pages • Illustrations personnalisées
          </div>
        </div>
      </div>
      
      <Separator className="my-4" />
      
      <div className="text-sm text-gray-500">
        <p>Livraison estimée : 5-7 jours ouvrés</p>
      </div>
    </Card>
  );
};

export default OrderDetails;
