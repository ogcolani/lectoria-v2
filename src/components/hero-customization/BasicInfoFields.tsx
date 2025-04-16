
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { User } from 'lucide-react';
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

interface BasicInfoFieldsProps {
  control: Control<FormValues>;
}

const BasicInfoFields: React.FC<BasicInfoFieldsProps> = ({ control }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="heroName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prénom du héros</FormLabel>
              <FormControl>
                <Input placeholder="Comment s'appelle ton héros?" {...field} />
              </FormControl>
              <FormDescription>
                Le prénom qui apparaîtra dans l'histoire
              </FormDescription>
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="heroAge"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Âge</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Quel âge a ton héros?" {...field} />
              </FormControl>
              <FormDescription>
                L'âge de ton personnage principal
              </FormDescription>
            </FormItem>
          )}
        />
      </div>
      
      <FormField
        control={control}
        name="heroGender"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Genre du héros</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="garçon" id="garçon" />
                  <label htmlFor="garçon" className="flex items-center gap-1 cursor-pointer text-sm font-medium">
                    <User className="h-5 w-5 text-blue-500" />
                    Garçon
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fille" id="fille" />
                  <label htmlFor="fille" className="flex items-center gap-1 cursor-pointer text-sm font-medium">
                    <User className="h-5 w-5 text-pink-500" />
                    Fille
                  </label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormDescription>
              Le genre de ton personnage principal dans l'histoire
            </FormDescription>
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="heroDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Décris ton héros (ce qu'il/elle aime, ses loisirs...)" 
                className="min-h-32"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Ces détails rendront l'histoire plus personnelle
            </FormDescription>
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="heroTrait"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Traits de caractère principaux</FormLabel>
            <FormControl>
              <Input placeholder="Ex: Courageux, Curieux, Créatif... (séparés par des virgules)" {...field} />
            </FormControl>
            <FormDescription>
              Ces traits seront mis en avant dans l'histoire
            </FormDescription>
          </FormItem>
        )}
      />
    </>
  );
};

export default BasicInfoFields;

