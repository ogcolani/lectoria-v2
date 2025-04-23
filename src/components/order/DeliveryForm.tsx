
import React from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { OrderFormValues } from '@/types/order';

interface DeliveryFormProps {
  control: Control<any>;
  showAddressFields: boolean;
  errors: FieldErrors<any>;
}

const DeliveryForm: React.FC<DeliveryFormProps> = ({
  control,
  showAddressFields,
  errors
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prénom</FormLabel>
              <FormControl>
                <Input placeholder="Votre prénom" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder="Votre nom" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input 
                type="email" 
                placeholder="votre-email@example.com" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="space-y-4">
        <FormLabel>Format du livre</FormLabel>
        <FormField
          control={control}
          name="format"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-start space-x-2 border rounded-lg p-3 hover:bg-gray-50">
                    <RadioGroupItem value="pdf" id="format-pdf" />
                    <div className="grid gap-1">
                      <Label htmlFor="format-pdf" className="font-medium">PDF Digital</Label>
                      <p className="text-sm text-gray-500">
                        Téléchargement immédiat, haute qualité, format A4
                      </p>
                      <p className="text-sm font-medium text-green-600">9,99 €</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2 border rounded-lg p-3 hover:bg-gray-50">
                    <RadioGroupItem value="papier" id="format-papier" />
                    <div className="grid gap-1">
                      <Label htmlFor="format-papier" className="font-medium">Livre papier</Label>
                      <p className="text-sm text-gray-500">
                        Format 20x20cm, couverture rigide, papier premium
                      </p>
                      <p className="text-sm font-medium text-green-600">19,99 €</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2 border rounded-lg p-3 hover:bg-gray-50 bg-purple-50">
                    <RadioGroupItem value="premium" id="format-premium" />
                    <div className="grid gap-1">
                      <Label htmlFor="format-premium" className="font-medium">Pack Premium</Label>
                      <p className="text-sm text-gray-500">
                        Livre papier + PDF + dédicace personnalisée + marque-page
                      </p>
                      <p className="text-sm font-medium text-green-600">29,99 €</p>
                    </div>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      {showAddressFields && (
        <div className="space-y-4 border-t pt-6 mt-6">
          <h3 className="text-lg font-semibold">Adresse de livraison</h3>
          
          <FormField
            control={control}
            name="address.street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adresse</FormLabel>
                <FormControl>
                  <Input placeholder="Numéro et nom de rue" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={control}
              name="address.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ville</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre ville" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={control}
              name="address.postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code postal</FormLabel>
                  <FormControl>
                    <Input placeholder="Code postal" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={control}
            name="address.country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pays</FormLabel>
                <FormControl>
                  <Input placeholder="Pays" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default DeliveryForm;
