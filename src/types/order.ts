
import { z } from 'zod';

export const orderFormSchema = z.object({
  firstName: z.string().min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),
  lastName: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Adresse email invalide" }),
  format: z.enum(['pdf', 'papier', 'premium'], { 
    required_error: "Veuillez sélectionner un format" 
  }),
  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().optional(),
  }),
});

export type OrderFormValues = z.infer<typeof orderFormSchema>;
