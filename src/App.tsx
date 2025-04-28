import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CreerMonLivre from "./pages/CreerMonLivre";
import CreationLivre from "./pages/CreationLivre";
import PersonnalisationHero from "./pages/PersonnalisationHero";
import StoryElements from "./pages/StoryElements";
import GenerationHistoire from "./pages/GenerationHistoire";
import ChoixFormat from "./pages/ChoixFormat";
import NotreHistoire from "./pages/NotreHistoire";
import OffresCadeaux from "./pages/OffresCadeaux";
import Commande from "./pages/Commande";
import CommandeConfirmee from "./pages/CommandeConfirmee";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/creer-mon-livre" element={<CreerMonLivre />} />
          <Route path="/creation-livre" element={<CreationLivre />} />
          <Route path="/personnalisation-hero" element={<PersonnalisationHero />} />
          <Route path="/story-elements" element={<StoryElements />} />
          <Route path="/generation-histoire" element={<GenerationHistoire />} />
          <Route path="/choix-format" element={<ChoixFormat />} />
          <Route path="/commande" element={<Commande />} />
          <Route path="/commande-confirmee" element={<CommandeConfirmee />} />
          <Route path="/notre-histoire" element={<NotreHistoire />} />
          <Route path="/offres-cadeaux" element={<OffresCadeaux />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
