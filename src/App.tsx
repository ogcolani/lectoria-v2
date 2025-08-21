import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Auth from "./pages/Auth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CreerMonLivre from "./pages/CreerMonLivre";
import CreationLivre from "./pages/CreationLivre";
import PersonnalisationHero from "./pages/PersonnalisationHero";
import PersonnalisationApparence from "./pages/PersonnalisationApparence";
import StoryElements from "./pages/StoryElements";
import GenerationHistoire from "./pages/GenerationHistoire";
import ChoixFormat from "./pages/ChoixFormat";
import NotreHistoire from "./pages/NotreHistoire";
import OffresCadeaux from "./pages/OffresCadeaux";
import Commande from "./pages/Commande";
import CommandeConfirmee from "./pages/CommandeConfirmee";
import TestSupabase from "./pages/TestSupabase";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/notre-histoire" element={<NotreHistoire />} />
            <Route path="/creer-mon-livre" element={
              <ProtectedRoute>
                <CreerMonLivre />
              </ProtectedRoute>
            } />
            <Route path="/creation-livre" element={
              <ProtectedRoute>
                <CreationLivre />
              </ProtectedRoute>
            } />
            <Route path="/personnalisation-hero" element={
              <ProtectedRoute>
                <PersonnalisationHero />
              </ProtectedRoute>
            } />
            <Route path="/personnalisation-apparence" element={
              <ProtectedRoute>
                <PersonnalisationApparence />
              </ProtectedRoute>
            } />
            <Route path="/story-elements" element={
              <ProtectedRoute>
                <StoryElements />
              </ProtectedRoute>
            } />
            <Route path="/generation-histoire" element={
              <ProtectedRoute>
                <GenerationHistoire />
              </ProtectedRoute>
            } />
            <Route path="/choix-format" element={
              <ProtectedRoute>
                <ChoixFormat />
              </ProtectedRoute>
            } />
            <Route path="/commande" element={
              <ProtectedRoute>
                <Commande />
              </ProtectedRoute>
            } />
            <Route path="/commande-confirmee" element={
              <ProtectedRoute>
                <CommandeConfirmee />
              </ProtectedRoute>
            } />
            <Route path="/offres-cadeaux" element={
              <ProtectedRoute>
                <OffresCadeaux />
              </ProtectedRoute>
            } />
            <Route path="/test-supabase" element={
              <ProtectedRoute>
                <TestSupabase />
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
