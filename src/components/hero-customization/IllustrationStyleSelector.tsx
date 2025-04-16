import React from 'react';
import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Control } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Paintbrush, BookOpen, Sparkles, CircleUser } from 'lucide-react';
import { z } from 'zod';
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
  illustrationStyle: z.enum(["storybook", "fantasy", "comics"]).default("storybook")
});
export type IllustrationStyle = "storybook" | "fantasy" | "comics";
type FormValues = z.infer<typeof formSchema>;
interface IllustrationStyleSelectorProps {
  control: Control<FormValues>;
}

// Données des styles d'illustration
const illustrationStyles = [{
  id: 'storybook',
  name: 'Storybook Cartoon',
  icon: <BookOpen className="h-4 w-4 mr-2" />,
  description: 'Illustration douce, enfantine, colorée. Inspiré par Loish, Studio Ghibli, univers féérique.'
}, {
  id: 'fantasy',
  name: 'Fantasy Semi-Réaliste',
  icon: <Sparkles className="h-4 w-4 mr-2" />,
  description: 'Illustration détaillée et épique, style ArtStation. Digital art fantasy, lumière cinématographique.'
}, {
  id: 'comics',
  name: 'Bande Dessinée / Ligne Claire',
  icon: <CircleUser className="h-4 w-4 mr-2" />,
  description: 'Propre, coloré, lisible, type BD européenne / Pixar. Ligne claire, comics jeunesse.'
}];
const IllustrationStyleSelector: React.FC<IllustrationStyleSelectorProps> = ({
  control
}) => {
  return;
};
export default IllustrationStyleSelector;