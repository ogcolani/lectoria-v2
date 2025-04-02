
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Scroll, Sparkles, Rocket, BookOpen, Laugh } from 'lucide-react';

const CreerMonLivre = () => {
  const [step, React.useState(1)];
  const [progress, React.useState(1)];
  
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">Créez votre livre personnalisé</h1>
        
        <div className="bg-[#f9f3e0] rounded-xl p-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">CRÉEZ UNE HISTOIRE UNIQUE POUR VOTRE ENFANT</h2>
              <ol className="space-y-6">
                <li className="flex gap-3">
                  <span className="font-bold text-purple-600">1.</span>
                  <div>
                    <span className="font-bold">Choisissez un style de lecture :</span>
                    <p>aventure, fantastique, conte de fées...</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-purple-600">2.</span>
                  <div>
                    <span className="font-bold">Personnalisez le personnage :</span>
                    <p>prénom et son apparence.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-purple-600">3.</span>
                  <div>
                    <span className="font-bold">Ajoutez des valeurs essentielles :</span>
                    <p>courage, bienveillance, ou même l'honnêteté.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-purple-600">4.</span>
                  <div>
                    <span className="font-bold">Adaptez l'histoire et rendez-la unique</span>
                  </div>
                </li>
              </ol>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4 mb-6 w-full">
                <Card className="hover:shadow-lg transition-all cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <Sparkles className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                    <p className="text-xs font-bold">FANTASTIQUE</p>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-lg transition-all cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <Rocket className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                    <p className="text-xs font-bold">AVENTURE</p>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-lg transition-all cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <Scroll className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                    <p className="text-xs font-bold">CONTE DE FÉE</p>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-lg transition-all cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <Laugh className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                    <p className="text-xs font-bold">HUMOUR</p>
                  </CardContent>
                </Card>
              </div>
              
              <Progress value={25} className="h-2" />
              <Button className="w-full bg-[#e05f77] hover:bg-[#d94b65]">
                Continuer vers l'étape 2
              </Button>
            </div>
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Le processus de création</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Personnalisez</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Indiquez le prénom, l'âge, les passions et l'univers préféré de votre enfant.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Générez</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Notre IA crée une histoire unique avec votre enfant comme héros principal.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recevez</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Choisissez entre livre papier livré chez vous ou ebook instantané.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreerMonLivre;
