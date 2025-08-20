import { z } from "zod";

export const storySchema = z.object({
  prenom: z.string().min(1),
  age: z.number().int().min(3).max(12),
  genre: z.enum(["fille","garçon","autre"]),
  passions: z.string().min(1),
  valeurs: z.string().min(1),
  style: z.string().min(1),
  univers: z.string().min(1),
  nbPages: z.number().int().min(24).max(48),
  trancheAge: z.enum(["3-5","5-7","7-10","9-12"])
});

export type StoryInput = z.infer<typeof storySchema>;

// Schema for the structured story response from Mistral
export const storyResponseSchema = z.object({
  title: z.string(),
  pages: z.array(z.object({
    page_number: z.number(),
    text: z.string()
  })),
  moral: z.string()
});

export type StoryResponse = z.infer<typeof storyResponseSchema>;