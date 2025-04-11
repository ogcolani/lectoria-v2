
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { SparklesIcon, BookOpenIcon, RefreshCwIcon, ChevronLeft, Download, Share, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const GenerationHistoire = () => {
  const [progress, setProgress] = useState(80);
  const [isGenerating, setIsGenerating] = useState(false);
  const [fullStory, setFullStory] = useState('');
  const [storyPreview, setStoryPreview] = useState('');
  const [prompt, setPrompt] = useState('');
  const [childAge, setChildAge] = useState(6);
  const [pageCount, setPageCount] = useState(40);
  const [previewOpen, setPreviewOpen] = useState(false);
  const { toast } = useToast();

  // Fonction qui simule la génération d'une histoire par l'IA Mistral
  const generateStory = async () => {
    setIsGenerating(true);
    
    try {
      // Note: Dans une vraie application, vous feriez un appel API à Mistral ici
      // Pour l'instant, nous simulons un délai et retournons une histoire générée statiquement
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Générer une histoire complète basée sur les informations et l'âge de l'enfant
      const vocabularyLevel = childAge <= 5 ? 'très simple' : 
                              childAge <= 8 ? 'simple' : 
                              childAge <= 12 ? 'intermédiaire' : 'avancé';
      
      const storyLength = `Cette histoire complète fait environ ${pageCount} pages, adaptée au niveau de lecture ${vocabularyLevel} d'un enfant de ${childAge} ans.`;
      
      // Histoire complète (qui serait beaucoup plus longue dans une implémentation réelle)
      const generatedFullStory = `# L'Incroyable Aventure

Il était une fois, dans un monde rempli de merveilles et de magie, un jeune héros nommé Alex. Alex avait toujours rêvé de partir à l'aventure, de découvrir des terres inconnues et de vivre des expériences extraordinaires.

Un jour, alors qu'il se promenait dans la forêt près de chez lui, il découvrit un vieux livre mystérieux, caché sous un rocher couvert de mousse. En l'ouvrant, une lumière éblouissante en jaillit, et une voix douce murmura: "Toi qui as trouvé ce livre, tu es l'élu. Tu dois retrouver les trois cristaux de pouvoir pour sauver notre monde."

Sans hésiter, Alex accepta cette mission. Armé de son courage et de sa détermination, il partit à la recherche du premier cristal. Son voyage le mena à travers des montagnes escarpées, des déserts brûlants et des océans tumultueux.

${childAge <= 5 ? 'Il vit beaucoup d\'animaux rigolos.' : 
   childAge <= 8 ? 'Il rencontra des créatures merveilleuses qui l\'aidèrent dans son voyage.' : 
   childAge <= 12 ? 'En chemin, il fit la connaissance d\'alliés improbables qui devinrent ses plus fidèles compagnons.' : 
   'Durant son périple, il se lia d\'amitié avec des êtres aux capacités extraordinaires, formant une alliance hétéroclite mais redoutablement efficace.'}

[... Histoire complète sur ${pageCount} pages ...]

Et c'est ainsi que le jeune héros comprit que la véritable magie ne résidait pas dans les objets enchantés, mais dans le cœur de chacun.

Fin.`;

      // Aperçu de l'histoire - version courte et attrayante qui donne envie d'acheter
      const generatedPreview = `# L'Incroyable Aventure

Il était une fois, dans un monde rempli de merveilles et de magie, un jeune héros nommé Alex. Alex avait toujours rêvé de partir à l'aventure, de découvrir des terres inconnues et de vivre des expériences extraordinaires.

Un jour, alors qu'il se promenait dans la forêt près de chez lui, il découvrit un vieux livre mystérieux...

${childAge <= 5 ? '⭐ Une aventure magique avec des mots simples, parfaite pour les tout-petits !' : 
   childAge <= 8 ? '⭐ Une histoire captivante avec des personnages attachants, idéale pour les apprentis lecteurs !' : 
   childAge <= 12 ? '⭐ Un récit palpitant rempli de rebondissements, parfait pour développer l\'imagination !' : 
   '⭐ Une aventure épique aux multiples dimensions, conçue pour stimuler la réflexion et l\'empathie !'}

[Suite de l'histoire disponible après achat...]

Cette histoire complète fait ${pageCount} pages, spécialement adaptée pour les enfants de ${childAge} ans.`;
      
      setFullStory(generatedFullStory);
      setStoryPreview(generatedPreview);
      setProgress(100);
      
      toast({
        title: "Histoire générée !",
        description: "Ton histoire personnalisée est prête. Découvre un aperçu et commande le livre complet !",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Il y a eu un problème lors de la génération de l'histoire.",
        variant: "destructive",
      });
      console.error("Erreur de génération:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    toast({
      title: "Commande nécessaire",
      description: "Pour obtenir l'histoire complète, commandez votre livre personnalisé !",
    });
  };

  const handleShare = () => {
    // Simuler un partage
    toast({
      title: "Partage",
      description: "Partagez l'aperçu de cette histoire avec vos proches !",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-white">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
            Génération de ton histoire
          </span>
        </h1>
        
        <div className="mb-10 max-w-xl mx-auto">
          <div className="flex justify-between text-sm font-medium text-gray-500 mb-2">
            <span>Étape 4 sur 5</span>
            <span>{progress}% complété</span>
          </div>
          <Progress value={progress} className="h-2 bg-gray-200" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-1 flex flex-col bg-purple-100 rounded-2xl p-6 order-2 lg:order-1">
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-2">Personnalisation</h3>
              <p className="text-sm text-gray-600 mb-4">
                Adapte l'histoire aux besoins de ton enfant pour une expérience de lecture optimale.
              </p>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="childAge" className="text-base font-medium">
                    Âge de l'enfant: {childAge} ans
                  </Label>
                  <Slider
                    id="childAge"
                    min={3}
                    max={14}
                    step={1}
                    value={[childAge]}
                    onValueChange={(value) => setChildAge(value[0])}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>3 ans</span>
                    <span>14 ans</span>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="pageCount" className="text-base font-medium">
                    Nombre de pages: {pageCount}
                  </Label>
                  <Slider
                    id="pageCount"
                    min={20}
                    max={60}
                    step={5}
                    value={[pageCount]}
                    onValueChange={(value) => setPageCount(value[0])}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>20 pages</span>
                    <span>60 pages</span>
                  </div>
                </div>
              </div>
            </div>
            
            <Card className="mb-4">
              <CardContent className="p-4">
                <h4 className="font-bold mb-2">Instructions pour l'IA</h4>
                <Textarea 
                  placeholder="Ajoute des détails spécifiques pour ton histoire..."
                  className="min-h-32 mb-3"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <Button 
                  onClick={generateStory} 
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCwIcon className="mr-2 h-4 w-4 animate-spin" />
                      Génération en cours...
                    </>
                  ) : (
                    <>
                      <SparklesIcon className="mr-2 h-4 w-4" />
                      Générer mon histoire
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
            
            <div className="mt-auto">
              <p className="text-xs text-gray-500 mb-4">
                Note: L'IA Mistral utilise les informations que tu as fournies pour créer une histoire unique. Le résultat peut varier et être amélioré en ajoutant plus de détails dans tes instructions.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 order-1 lg:order-2">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold">
                  {storyPreview ? "Aperçu de ton histoire" : "Ton aperçu apparaîtra ici"}
                </h2>
                {storyPreview && (
                  <p className="text-gray-500 text-sm mt-1">
                    Histoire complète: {pageCount} pages, adapté aux {childAge} ans
                  </p>
                )}
              </div>
              
              {storyPreview && (
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleShare}
                  >
                    <Share className="h-4 w-4 mr-1" />
                    Partager
                  </Button>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Plus d'infos
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Détails du livre</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-3 py-4">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Nombre de pages:</span>
                          <Badge variant="outline">{pageCount} pages</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Âge recommandé:</span>
                          <Badge variant="outline">{childAge} ans</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Niveau de vocabulaire:</span>
                          <Badge variant="outline">
                            {childAge <= 5 ? 'Très simple' : 
                             childAge <= 8 ? 'Simple' : 
                             childAge <= 12 ? 'Intermédiaire' : 'Avancé'}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Histoire complète:</span>
                          <Badge variant="secondary">Disponible à l'achat</Badge>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>
            
            <div className="min-h-[60vh] bg-purple-50 rounded-xl p-6 overflow-auto">
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <RefreshCwIcon className="h-12 w-12 text-purple-500 animate-spin mb-4" />
                  <p className="text-center text-purple-700 font-medium">
                    L'IA Mistral est en train de créer ton histoire...
                  </p>
                  <p className="text-center text-gray-500 mt-2">
                    Cela peut prendre quelques instants
                  </p>
                </div>
              ) : storyPreview ? (
                <div className="prose prose-purple max-w-none">
                  {storyPreview.split('\n').map((paragraph, index) => (
                    paragraph.startsWith('# ') ? (
                      <h2 key={index} className="text-2xl font-bold text-purple-800 mb-4">
                        {paragraph.substring(2)}
                      </h2>
                    ) : paragraph === '' ? (
                      <br key={index} />
                    ) : paragraph.startsWith('⭐') ? (
                      <div key={index} className="my-6 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border border-purple-200">
                        <p className="text-purple-800 font-medium text-lg">{paragraph}</p>
                      </div>
                    ) : paragraph.startsWith('[Suite') ? (
                      <div key={index} className="my-6">
                        <p className="text-gray-500 italic">{paragraph}</p>
                        <div className="mt-8 flex justify-center">
                          <Link to="/offres-cadeaux">
                            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                              Obtenir l'histoire complète
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <p key={index} className="mb-4">{paragraph}</p>
                    )
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <BookOpenIcon className="h-16 w-16 text-purple-300 mb-4" />
                  <p className="text-center text-gray-500">
                    Clique sur "Générer mon histoire" pour créer un aperçu de ton histoire personnalisée.
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t mt-6">
              <Link to="/story-elements">
                <Button variant="outline" type="button">
                  <ChevronLeft className="mr-2 h-4 w-4" /> Retour
                </Button>
              </Link>
              
              {storyPreview && (
                <div className="flex space-x-2">
                  <Button 
                    onClick={() => setStoryPreview('')}
                    variant="outline"
                  >
                    <RefreshCwIcon className="mr-2 h-4 w-4" />
                    Recommencer
                  </Button>
                  
                  <Link to="/offres-cadeaux">
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      Voir les offres
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-12 max-w-5xl mx-auto bg-purple-50 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4 text-center">Pourquoi seulement un aperçu ?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-bold text-lg mb-2 text-purple-700">Qualité premium</h4>
              <p className="text-gray-600">
                Nos histoires complètes sont soigneusement élaborées pour offrir une expérience de lecture immersive et enrichissante sur 40+ pages.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-bold text-lg mb-2 text-purple-700">Personnalisation avancée</h4>
              <p className="text-gray-600">
                La version complète inclut des illustrations personnalisées et un texte parfaitement adapté à l'âge et aux préférences de votre enfant.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-bold text-lg mb-2 text-purple-700">Valeur éducative</h4>
              <p className="text-gray-600">
                Chaque histoire complète est conçue pour transmettre des valeurs importantes tout en développant le goût de la lecture.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GenerationHistoire;
