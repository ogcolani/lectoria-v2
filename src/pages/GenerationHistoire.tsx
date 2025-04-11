
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { SparklesIcon, BookOpenIcon, RefreshCwIcon, ChevronLeft, Download, Share } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const GenerationHistoire = () => {
  const [progress, setProgress] = useState(80);
  const [isGenerating, setIsGenerating] = useState(false);
  const [story, setStory] = useState('');
  const [prompt, setPrompt] = useState('');
  const { toast } = useToast();

  // Fonction qui simule la génération d'une histoire par l'IA Mistral
  const generateStory = async () => {
    setIsGenerating(true);
    
    try {
      // Note: Dans une vraie application, vous feriez un appel API à Mistral ici
      // Pour l'instant, nous simulons un délai et retournons une histoire générée statiquement
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Générer une histoire basée sur les informations que nous avons
      const generatedStory = `# L'Incroyable Aventure

Il était une fois, dans un monde rempli de merveilles et de magie, un jeune héros nommé Alex. Alex avait toujours rêvé de partir à l'aventure, de découvrir des terres inconnues et de vivre des expériences extraordinaires.

Un jour, alors qu'il se promenait dans la forêt près de chez lui, il découvrit un vieux livre mystérieux, caché sous un rocher couvert de mousse. En l'ouvrant, une lumière éblouissante en jaillit, et une voix douce murmura: "Toi qui as trouvé ce livre, tu es l'élu. Tu dois retrouver les trois cristaux de pouvoir pour sauver notre monde."

Sans hésiter, Alex accepta cette mission. Armé de son courage et de sa détermination, il partit à la recherche du premier cristal. Son voyage le mena à travers des montagnes escarpées, des déserts brûlants et des océans tumultueux.

Au cours de son périple, il rencontra des amis fidèles qui l'aidèrent dans sa quête. Ensemble, ils affrontèrent des dangers, résolurent des énigmes et découvrirent des secrets anciens.

Après de nombreuses épreuves, Alex réussit finalement à réunir les trois cristaux. Grâce à son courage, sa persévérance et son amitié, il sauva le monde de l'obscurité qui le menaçait.

Et c'est ainsi que le jeune héros comprit que la véritable magie ne résidait pas dans les objets enchantés, mais dans le cœur de chacun.

Fin.`;
      
      setStory(generatedStory);
      setProgress(100);
      
      toast({
        title: "Histoire générée !",
        description: "Ton histoire personnalisée est prête à être lue.",
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
    // Créer un blob avec le contenu de l'histoire
    const blob = new Blob([story], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Créer un lien pour télécharger le fichier
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mon-histoire-personnalisee.txt';
    document.body.appendChild(a);
    a.click();
    
    // Nettoyer
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Histoire téléchargée !",
      description: "Ton histoire a été téléchargée avec succès.",
    });
  };

  const handleShare = () => {
    // Simuler un partage
    toast({
      title: "Partage",
      description: "Fonctionnalité de partage à implémenter.",
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
              <h3 className="text-xl font-bold mb-2">L'IA Mistral</h3>
              <p className="text-sm text-gray-600">
                Notre IA va créer une histoire unique basée sur tes choix. Tu peux ajouter des instructions spécifiques pour personnaliser davantage ton histoire.
              </p>
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
              <h2 className="text-2xl font-bold">
                {story ? "Ton histoire personnalisée" : "Ton histoire apparaîtra ici"}
              </h2>
              
              {story && (
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleDownload}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Télécharger
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleShare}
                  >
                    <Share className="h-4 w-4 mr-1" />
                    Partager
                  </Button>
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
              ) : story ? (
                <div className="prose prose-purple max-w-none">
                  {story.split('\n').map((paragraph, index) => (
                    paragraph.startsWith('# ') ? (
                      <h2 key={index} className="text-2xl font-bold text-purple-800 mb-4">
                        {paragraph.substring(2)}
                      </h2>
                    ) : paragraph === '' ? (
                      <br key={index} />
                    ) : (
                      <p key={index} className="mb-4">{paragraph}</p>
                    )
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <BookOpenIcon className="h-16 w-16 text-purple-300 mb-4" />
                  <p className="text-center text-gray-500">
                    Clique sur "Générer mon histoire" pour créer une histoire personnalisée basée sur tes choix.
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
              
              {story && (
                <Button 
                  onClick={() => setStory('')}
                  variant="outline"
                >
                  <RefreshCwIcon className="mr-2 h-4 w-4" />
                  Recommencer
                </Button>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-12 max-w-5xl mx-auto bg-purple-50 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4 text-center">Comment fonctionne la génération d'histoire ?</h3>
          <ol className="list-decimal list-inside space-y-3 ml-4">
            <li className="text-gray-700">
              <span className="font-medium">Analyse de tes choix</span> : L'IA Mistral analyse les informations sur ton personnage, les valeurs et les éléments d'histoire que tu as choisis.
            </li>
            <li className="text-gray-700">
              <span className="font-medium">Instructions supplémentaires</span> : Tu peux ajouter des détails spécifiques pour personnaliser davantage ton histoire.
            </li>
            <li className="text-gray-700">
              <span className="font-medium">Génération de l'histoire</span> : L'IA crée une histoire unique basée sur tous ces éléments.
            </li>
            <li className="text-gray-700">
              <span className="font-medium">Téléchargement et partage</span> : Une fois ton histoire générée, tu peux la télécharger ou la partager avec tes amis.
            </li>
          </ol>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GenerationHistoire;
