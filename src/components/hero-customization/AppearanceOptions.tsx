
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Control } from 'react-hook-form';
import { z } from 'zod';

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
      <h3 className="text-xl font-bold">Apparence</h3>
      
      <FormField
        control={control}
        name="hasGlasses"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Lunettes</FormLabel>
              <FormDescription>
                Ton personnage porte-t-il des lunettes ?
              </FormDescription>
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
    </div>
  );
};

export default AppearanceOptions;
