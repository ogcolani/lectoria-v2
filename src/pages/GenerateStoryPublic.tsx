import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Book, Sparkles, Eye, ShoppingCart } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface StoryPreview {
  title: string;
  pages: Array<{ page_number: number; text: string }>;
  totalPages: number;
  previewPageCount: number;
  isPreview: boolean;
}

const GenerateStoryPublic = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [childName, setChildName] = useState('');
  const [age, setAge] = useState('');
  const [interests, setInterests] = useState('');
  const [pages, setPages] = useState('24');
  const [preview, setPreview] = useState<StoryPreview | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleGenerateStory = async () => {
    if (!childName.trim() || !age.trim()) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir le nom et l'âge de l'enfant.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const interestsArray = interests.split(',').map(i => i.trim()).filter(i => i);
      
      const { data, error } = await supabase.functions.invoke('generate-story-public', {
        body: {
          childName: childName.trim(),
          age: parseInt(age),
          interests: interestsArray,
          pages: parseInt(pages),
          locale: 'fr'
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!data.success) {
        throw new Error(data.error || 'Erreur lors de la génération');
      }

      setPreview(data.preview);
      setOrderId(data.orderId);
      
      toast({
        title: "Histoire générée !",
        description: `Aperçu de "${data.preview.title}" créé avec succès.`
      });

    } catch (error) {
      console.error('Error generating story:', error);
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Erreur lors de la génération de l'histoire",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleOrderBook = () => {
    if (orderId) {
      // Rediriger vers Stripe checkout avec orderId
      // Pour l'instant, on simule juste la redirection
      toast({
        title: "Redirection vers le paiement",
        description: "Vous allez être redirigé vers le paiement sécurisé."
      });
      // navigate(`/checkout?orderId=${orderId}`);
    }
  };

  const resetForm = () => {
    setChildName('');
    setAge('');
    setInterests('');
    setPages('24');
    setPreview(null);
    setOrderId(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-white">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
              Génère ton histoire personnalisée
            </span>
          </h1>
          
          <p className="text-lg text-gray-600 text-center mb-12">
            Crée une histoire unique avec ton enfant comme héros principal
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Formulaire */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  Informations du héros
                </CardTitle>
                <CardDescription>
                  Raconte-nous qui est le héros de cette histoire
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="childName">Nom de l'enfant</Label>
                  <Input
                    id="childName"
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    placeholder="Ex: Emma, Lucas..."
                    disabled={isGenerating}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Âge</Label>
                  <Select value={age} onValueChange={setAge} disabled={isGenerating}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionne l'âge" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => i + 3).map(ageValue => (
                        <SelectItem key={ageValue} value={ageValue.toString()}>
                          {ageValue} ans
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interests">Centres d'intérêt (optionnel)</Label>
                  <Textarea
                    id="interests"
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                    placeholder="Ex: dinosaures, princesses, football..."
                    disabled={isGenerating}
                    rows={3}
                  />
                  <p className="text-xs text-gray-500">
                    Séparez les intérêts par des virgules
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pages">Nombre de pages</Label>
                  <Select value={pages} onValueChange={setPages} disabled={isGenerating}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="16">16 pages</SelectItem>
                      <SelectItem value="24">24 pages</SelectItem>
                      <SelectItem value="32">32 pages</SelectItem>
                      <SelectItem value="48">48 pages</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-x-4">
                  <Button
                    onClick={handleGenerateStory}
                    disabled={isGenerating || !childName.trim() || !age.trim()}
                    className="flex-1"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Génération en cours...
                      </>
                    ) : (
                      <>
                        <Book className="h-4 w-4 mr-2" />
                        Générer l'histoire
                      </>
                    )}
                  </Button>
                  
                  {preview && (
                    <Button
                      onClick={resetForm}
                      variant="outline"
                      disabled={isGenerating}
                    >
                      Nouvelle histoire
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Aperçu */}
            <Card className="lg:sticky lg:top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-purple-600" />
                  {preview ? preview.title : "Aperçu de l'histoire"}
                </CardTitle>
                {preview && (
                  <CardDescription>
                    Aperçu: {preview.previewPageCount} pages sur {preview.totalPages} au total
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                {!preview ? (
                  <div className="text-center py-12">
                    <Book className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      Ton aperçu d'histoire apparaîtra ici
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Bandeau d'aperçu */}
                    <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg border border-purple-200">
                      <p className="text-sm text-purple-800 font-medium text-center">
                        ✨ Ceci est un aperçu (15%). Débloquez le livre complet en version imprimée !
                      </p>
                    </div>

                    {/* Pages de l'aperçu */}
                    <div className="max-h-96 overflow-y-auto space-y-4">
                      {preview.pages.map((page) => (
                        <div key={page.page_number} className="p-4 bg-gray-50 rounded-lg">
                          <div className="text-xs text-gray-500 mb-2">
                            Page {page.page_number}
                          </div>
                          <p className="text-sm leading-relaxed">
                            {page.text}
                          </p>
                        </div>
                      ))}
                      
                      {preview.previewPageCount < preview.totalPages && (
                        <div className="p-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg text-center">
                          <p className="text-gray-600 text-sm">
                            ... et encore {preview.totalPages - preview.previewPageCount} pages dans le livre complet !
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Bouton de commande */}
                    <Button
                      onClick={handleOrderBook}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      size="lg"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Commander le livre complet
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      Livre imprimé de qualité premium • {preview.totalPages} pages • Illustrations personnalisées
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GenerateStoryPublic;