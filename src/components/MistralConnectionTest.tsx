import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, CheckCircle, XCircle, Play } from 'lucide-react';

export const MistralConnectionTest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const testConnection = async () => {
    setIsLoading(true);
    setResult(null);
    
    try {
      console.log('🧪 Démarrage du test de connexion Mistral...');
      
      const { data, error } = await supabase.functions.invoke('test-mistral-connection');
      
      if (error) {
        console.error('❌ Erreur test connexion:', error);
        setResult({
          success: false,
          error: error.message,
          message: "❌ Test de connexion échoué"
        });
        toast({
          title: "❌ Test échoué",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      console.log('✅ Test terminé:', data);
      setResult(data);
      
      if (data.success) {
        toast({
          title: "🎉 Test réussi !",
          description: "La connexion Mistral fonctionne parfaitement",
        });
      } else {
        toast({
          title: "❌ Test échoué",
          description: data.error || "Erreur inconnue",
          variant: "destructive",
        });
      }
      
    } catch (error) {
      console.error('❌ Erreur lors du test:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      setResult({
        success: false,
        error: errorMessage,
        message: "❌ Erreur inattendue"
      });
      toast({
        title: "❌ Erreur",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🔍 Test de Connexion Mistral
        </CardTitle>
        <CardDescription>
          Vérifiez que l'API Mistral fonctionne correctement pour la génération d'histoires
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={testConnection} 
          disabled={isLoading}
          className="w-full"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Test en cours...
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              Lancer le test
            </>
          )}
        </Button>
        
        {result && (
          <div className={`p-4 rounded-lg border ${
            result.success 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              {result.success ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600" />
              )}
              <span className="font-semibold">{result.message}</span>
            </div>
            
            {result.success && result.details && (
              <div className="mt-3 space-y-2 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div>📡 Connexion API: {result.details.mistralConnection}</div>
                  <div>🤖 Agent: {result.details.agentGeneration}</div>
                  <div>⚡ Edge Function: {result.details.edgeFunction}</div>
                </div>
                {result.details.sampleContent && (
                  <div className="mt-3 p-2 bg-white/50 rounded text-xs">
                    <strong>Échantillon généré:</strong><br />
                    <em>"{result.details.sampleContent}"</em>
                  </div>
                )}
              </div>
            )}
            
            {!result.success && result.error && (
              <div className="mt-2 text-sm">
                <strong>Erreur:</strong> {result.error}
              </div>
            )}
          </div>
        )}
        
        <div className="text-xs text-muted-foreground">
          <p><strong>Ce test vérifie :</strong></p>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>La connexion à l'API Mistral</li>
            <li>Le fonctionnement de l'agent de génération</li>
            <li>L'Edge Function mistral-generation</li>
            <li>La sauvegarde des résultats</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};