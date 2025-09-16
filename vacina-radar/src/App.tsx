import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Perfil from "./pages/Perfil";
import CarteiraVacinal from "./pages/CarteiraVacinal";
import UBS from "./pages/UBS";
import Noticias from "./pages/Noticias";
import Alertas from "./pages/Alertas";
import Educacao from "./pages/Educacao";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/carteira-vacinal" element={<CarteiraVacinal />} />
          <Route path="/ubs" element={<UBS />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/alertas" element={<Alertas />} />
          <Route path="/educacao" element={<Educacao />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
