
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Control, UseFormSetValue } from 'react-hook-form';
import { z } from 'zod';
import { Glasses, Backpack, ImageIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import PhotoUpload from './PhotoUpload';

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
  setValue: UseFormSetValue<FormValues>;
}

const AppearanceOptions: React.FC<AppearanceOptionsProps> = ({ control, setValue }) => {
  
  return (
    <div className="space-y-6 my-6 bg-purple-50 p-4 rounded-xl">
      <h3 className="text-xl font-bold flex items-center gap-2">
        <span>Apparence</span> 
        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">Modèle 3D</span>
      </h3>
      
      <Card className="p-4 bg-white/80 mb-4">
        <div className="flex items-start gap-3">
          <ImageIcon className="w-5 h-5 mt-1 text-purple-600" />
          <p className="text-sm text-gray-600">
            Ton personnage est représenté en 3D dans le style des livres pour enfants. 
            Tu peux le personnaliser en important une photo ou en utilisant les options ci-dessous.
          </p>
        </div>
      </Card>

      <PhotoUpload control={control} setValue={setValue} />
      
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
    </div>
  );
};

export default AppearanceOptions;
