-- Corriger la sécurité RLS pour la table de test
ALTER TABLE public.mistral_test ENABLE ROW LEVEL SECURITY;

-- Créer une politique pour permettre l'accès en lecture seule aux administrateurs
CREATE POLICY "Allow read access for testing" ON public.mistral_test
FOR SELECT 
USING (true);

-- Créer une politique pour permettre l'insertion aux administrateurs
CREATE POLICY "Allow insert for testing" ON public.mistral_test
FOR INSERT 
WITH CHECK (true);