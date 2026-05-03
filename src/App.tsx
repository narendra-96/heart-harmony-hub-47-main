import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/lib/auth";

import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import PageTransition from "@/components/PageTransition";
import MobileBottomNav from "@/components/MobileBottomNav";

import Index from "./pages/Index";
import Auth from "./pages/Auth";
import ForgotPassword from "./pages/ForgotPassword";   // ✅ FIXED
import ResetPassword from "./pages/ResetPassword";
import Browse from "./pages/Browse";

import MyProfile from "./pages/MyProfile";
import ProfileDetail from "./pages/ProfileDetail";
import Shortlist from "./pages/Shortlist";
import Interests from "./pages/Interests";
import Messages from "./pages/Messages";
import Visitors from "./pages/Visitors";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import SuccessStories from "./pages/SuccessStories";
import TestAPI from "./pages/TestAPI";
import Conversations from "./pages/Conversations";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <AuthProvider>

          <Navbar />

          <PageTransition>
            <Routes>

              {/* PUBLIC */}
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/success-stories" element={<SuccessStories />} />
              <Route path="/chats" element={<Conversations />} />
              <Route path="/test-api" element={<TestAPI />} />

              {/* PROTECTED */}
              <Route path="/browse" element={<ProtectedRoute><Browse /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
              <Route path="/profile/:id" element={<ProtectedRoute><ProfileDetail /></ProtectedRoute>} />
              <Route path="/shortlist" element={<ProtectedRoute><Shortlist /></ProtectedRoute>} />
              <Route path="/interests" element={<ProtectedRoute><Interests /></ProtectedRoute>} />
              <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
              <Route path="/visitors" element={<ProtectedRoute><Visitors /></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />

              {/* NOT FOUND */}
              <Route path="*" element={<NotFound />} />

            </Routes>
          </PageTransition>

          <MobileBottomNav />

        </AuthProvider>
      </BrowserRouter>

    </TooltipProvider>
  </QueryClientProvider>
);

export default App;