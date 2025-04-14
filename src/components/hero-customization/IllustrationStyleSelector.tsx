
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Control } from 'react-hook-form';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Paintbrush, BookOpen, Sparkles, CircleUser } from 'lucide-react';
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
  illustrationStyle: z.enum(["storybook", "fantasy", "comics"]).default("storybook")
});

export type IllustrationStyle = "storybook" | "fantasy" | "comics";

type FormValues = z.infer<typeof formSchema>;

interface IllustrationStyleSelectorProps {
  control: Control<FormValues>;
}

// Données des styles d'illustration
const illustrationStyles = [
  {
    id: 'storybook',
    name: 'Storybook Cartoon',
    icon: <BookOpen className="h-4 w-4 mr-2" />,
    description: 'Illustration douce, enfantine, colorée. Inspiré par Loish, Studio Ghibli, univers féérique.'
  },
  {
    id: 'fantasy',
    name: 'Fantasy Semi-Réaliste',
    icon: <Sparkles className="h-4 w-4 mr-2" />,
    description: 'Illustration détaillée et épique, style ArtStation. Digital art fantasy, lumière cinématographique.'
  },
  {
    id: 'comics',
    name: 'Bande Dessinée / Ligne Claire',
    icon: <CircleUser className="h-4 w-4 mr-2" />,
    description: 'Propre, coloré, lisible, type BD européenne / Pixar. Ligne claire, comics jeunesse.'
  }
];

const IllustrationStyleSelector: React.FC<IllustrationStyleSelectorProps> = ({ control }) => {
  return (
    <div className="space-y-4 my-6 bg-purple-50 p-4 rounded-xl">
      <h3 className="text-xl font-bold flex items-center gap-2">
        <Paintbrush className="h-5 w-5 text-purple-600" />
        <span>Style d'illustration</span> 
      </h3>

      <p className="text-sm text-gray-600 mb-4">
        Choisis le style qui sera utilisé pour illustrer ton histoire.
        Ce style déterminera l'apparence de ton personnage et de toutes les images.
      </p>

      <FormField
        control={control}
        name="illustrationStyle"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Style d'illustration</FormLabel>
            <FormControl>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choisis un style d'illustration" />
                </SelectTrigger>
                <SelectContent>
                  {illustrationStyles.map(style => (
                    <SelectItem 
                      key={style.id} 
                      value={style.id}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center">
                        {style.icon}
                        <div>
                          <div className="font-medium">{style.name}</div>
                          <div className="text-xs text-gray-500 mt-1">{style.description}</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default IllustrationStyleSelector;
