import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Index from "./pages/Index.tsx";
import Movies from "./pages/Movies.tsx";
import Actors from "./pages/Actors.tsx";
import Awards from "./pages/Awards.tsx";
import Update from "./pages/Update.tsx";
import Booking from "./pages/Booking.tsx";
import NotFound from "./pages/NotFound.tsx";
import SocialWall from "./pages/SocialWall.tsx";

// inside <Routes>

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/actors" element={<Actors />} />
          <Route path="/awards" element={<Awards />} />
          <Route path="/update" element={<Update />} />
          <Route path="/social" element={<SocialWall />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
