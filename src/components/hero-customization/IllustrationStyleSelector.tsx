
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Control } from 'react-hook-form';
import { Card } from '@/components/ui/card';
import { Paintbrush, Palette, Image } from 'lucide-react';
import { z } from 'zod';

// Style preview images from Unsplash (placeholders)
const styleImages = [
  {
    id: 'style1',
    name: 'Aquarelle',
    image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
    description: 'Style doux avec des couleurs aquarelle'
  },
  {
    id: 'style2',
    name: 'Cartoon',
    image: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843',
    description: 'Style vif avec des personnages amusants'
  },
  {
    id: 'style3',
    name: 'Illustré',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    description: 'Illustrations détaillées et colorées'
  }
];

const formSchema = z.object({
  heroName: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  heroAge: z.string().min(1, { message: "L'âge est requis" }),
  heroDescription: z.string().optional(),
  heroTrait: z.string().optional(),
  heroGender: z.enum(["garçon", "fille"], {
    required_error: "Sélectionne le genre de ton héros",
  }),
  hasGlasses: z.boolean().default(false),
  illustrationStyle: z.string().optional().default('style1')
});

type FormValues = z.infer<typeof formSchema>;

interface IllustrationStyleSelectorProps {
  control: Control<FormValues>;
}

const IllustrationStyleSelector: React.FC<IllustrationStyleSelectorProps> = ({ control }) => {
  return (
    <div className="space-y-6 my-6 bg-purple-50 p-4 rounded-xl">
      <h3 className="text-xl font-bold flex items-center gap-2">
        <Palette className="h-5 w-5 text-purple-600" />
        <span>Style d'illustration</span> 
      </h3>

      <Card className="p-4 bg-white/80 mb-4">
        <p className="text-sm text-gray-600 mb-2">
          Choisis le style que tu préfères pour les illustrations de ton histoire.
          Ce style sera utilisé pour créer toutes les images du livre.
        </p>
      </Card>

      <FormField
        control={control}
        name="illustrationStyle"
        render={({ field }) => (
          <FormItem className="space-y-4">
            <FormLabel className="text-base">Style d'illustrations</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                {styleImages.map((style) => (
                  <div key={style.id} className="relative">
                    <RadioGroupItem
                      value={style.id}
                      id={style.id}
                      className="sr-only"
                    />
                    <label
                      htmlFor={style.id}
                      className={`
                        flex flex-col items-center p-2 rounded-lg border-2 cursor-pointer
                        ${field.value === style.id ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-200'}
                      `}
                    >
                      <div className="w-full h-40 rounded-md overflow-hidden mb-2">
                        <img 
                          src={style.image} 
                          alt={style.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-center">
                        <p className="font-medium">{style.name}</p>
                        <p className="text-xs text-gray-500">{style.description}</p>
                      </div>
                      {field.value === style.id && (
                        <div className="absolute top-2 right-2 bg-purple-500 text-white p-1 rounded-full">
                          <Paintbrush className="h-4 w-4" />
                        </div>
                      )}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default IllustrationStyleSelector;
