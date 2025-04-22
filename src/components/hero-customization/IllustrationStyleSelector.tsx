
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Control } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Paintbrush, BookOpen, Sparkles, CircleUser } from 'lucide-react';
import { z } from 'zod';
import { IllustrationStyle } from '@/services/illustrationService';

const formSchema = z.object({
  heroName: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères"
  }),
  heroAge: z.string().min(1, {
    message: "L'âge est requis"
  }),
  heroDescription: z.string().optional(),
  heroTrait: z.string().optional(),
  heroGender: z.enum(["garçon", "fille"], {
    required_error: "Sélectionne le genre de ton héros"
  }),
  hasGlasses: z.boolean().default(false),
  illustrationStyle: z.enum(["storybook-cute", "fantasy-vibrant", "comic-style", "realistic"]).default("storybook-cute")
});

type FormValues = z.infer<typeof formSchema>;

interface IllustrationStyleSelectorProps {
  control: Control<FormValues>;
}

// Données des styles d'illustration
const illustrationStyles = [{
  id: 'storybook-cute',
  name: 'Storybook Cartoon',
  icon: <BookOpen className="h-4 w-4 mr-2" />,
  description: 'Illustration douce, enfantine, colorée. Inspiré par Loish, Studio Ghibli, univers féérique.'
}, {
  id: 'fantasy-vibrant',
  name: 'Fantasy Semi-Réaliste',
  icon: <Sparkles className="h-4 w-4 mr-2" />,
  description: 'Illustration détaillée et épique, style ArtStation. Digital art fantasy, lumière cinématographique.'
}, {
  id: 'comic-style',
  name: 'Bande Dessinée / Ligne Claire',
  icon: <CircleUser className="h-4 w-4 mr-2" />,
  description: 'Propre, coloré, lisible, type BD européenne / Pixar. Ligne claire, comics jeunesse.'
}, {
  id: 'realistic',
  name: 'Semi-Réaliste',
  icon: <CircleUser className="h-4 w-4 mr-2" />,
  description: 'Plus de détails et de textures, pour un rendu plus mature et réaliste.'
}];

const IllustrationStyleSelector: React.FC<IllustrationStyleSelectorProps> = ({
  control
}) => {
  return (
    <div className="space-y-6 my-6 bg-purple-50 p-4 rounded-xl">
      <h3 className="text-xl font-bold flex items-center gap-2">
        <Paintbrush className="h-5 w-5 text-purple-600" />
        <span>Style d'illustration</span>
      </h3>
      
      <FormField
        control={control}
        name="illustrationStyle"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Choisis le style d'illustration que tu préfères</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionne un style" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {illustrationStyles.map((style) => (
                  <SelectItem key={style.id} value={style.id}>
                    <div className="flex items-center">
                      {style.icon}
                      <span>{style.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-500 mt-2">
              {illustrationStyles.find(style => style.id === field.value)?.description}
            </p>
          </FormItem>
        )}
      />
    </div>
  );
};

export default IllustrationStyleSelector;
