
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Control } from 'react-hook-form';
import { z } from 'zod';
import { Glasses, Backpack } from 'lucide-react';
import { Card } from '@/components/ui/card';

const formSchema = z.object({
  heroName: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  heroAge: z.string().min(1, { message: "L'âge est requis" }),
  heroDescription: z.string().optional(),
  heroTrait: z.string().optional(),
  heroGender: z.enum(["garçon", "fille"], {
    required_error: "Sélectionne le genre de ton héros",
  }),
  hasGlasses: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

interface AppearanceOptionsProps {
  control: Control<FormValues>;
}

const AppearanceOptions: React.FC<AppearanceOptionsProps> = ({ control }) => {
  return (
    <div className="space-y-6 my-6 bg-purple-50 p-4 rounded-xl">
      <h3 className="text-xl font-bold flex items-center gap-2">
        <span>Apparence</span> 
        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">Modèle 3D</span>
      </h3>
      
      <Card className="p-4 bg-white/80 mb-4">
        <p className="text-sm text-gray-600 mb-2">
          Ton personnage est représenté en 3D dans le style des livres pour enfants de 6 à 10 ans. 
          Tu peux le personnaliser en choisissant les options ci-dessous.
        </p>
      </Card>
      
      <FormField
        control={control}
        name="hasGlasses"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 bg-white shadow-sm">
            <div className="space-y-0.5 flex items-center">
              <Glasses className="w-5 h-5 mr-2 text-purple-600" />
              <div>
                <FormLabel className="text-base">Lunettes</FormLabel>
                <FormDescription>
                  Ton personnage porte-t-il des lunettes ?
                </FormDescription>
              </div>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <div className="rounded-lg border p-4 bg-gray-100 shadow-sm opacity-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Backpack className="w-5 h-5 mr-2 text-gray-500" />
            <div>
              <h4 className="text-base font-medium text-gray-500">Sac à dos</h4>
              <p className="text-sm text-gray-500">
                Ton personnage porte déjà un sac à dos
              </p>
            </div>
          </div>
          <Switch checked={true} disabled />
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-purple-700">
          D'autres options de personnalisation seront bientôt disponibles !
        </p>
      </div>
    </div>
  );
};

export default AppearanceOptions;
