-- Test de la connexion Mistral
-- Cette requête va créer une table temporaire pour tester la fonction mistral-generation
CREATE TABLE IF NOT EXISTS public.mistral_test (
  id SERIAL PRIMARY KEY,
  test_prompt TEXT,
  test_result TEXT,
  test_status TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insérer un test simple
INSERT INTO public.mistral_test (test_prompt, test_status) 
VALUES ('Test de connexion Mistral', 'pending');