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

import Index from "./pages/Index.tsx";
import Auth from "./pages/Auth";
import ForgotPassword from "./pages/forgotpassword.tsx";
import ResetPassword from "./pages/ResetPassword";
import Browse from "./pages/Browse";    // ✅ NEW

import MyProfile from "./pages/MyProfile.tsx";
import ProfileDetail from "./pages/ProfileDetail.tsx";
import Shortlist from "./pages/Shortlist.tsx";
import Interests from "./pages/Interests.tsx";
import Messages from "./pages/Messages.tsx";
import Visitors from "./pages/Visitors.tsx";
import Admin from "./pages/Admin.tsx";
import NotFound from "./pages/NotFound.tsx";
import SuccessStories from "./pages/SuccessStories.tsx";

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

              {/* Public Pages */}

              <Route path="/" element={<Index />} />

              <Route path="/auth" element={<Auth />} />

              <Route
                path="/forgot-password"
                element={<ForgotPassword />}
              />

              <Route
                path="/reset-password"
                element={<ResetPassword />}
              />

              <Route
                path="/success-stories"
                element={<SuccessStories />}
              />

              {/* Protected Pages */}

              <Route
                path="/browse"
                element={
                  <ProtectedRoute>
                    <Browse />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <MyProfile />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/profile/:id"
                element={
                  <ProtectedRoute>
                    <ProfileDetail />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/shortlist"
                element={
                  <ProtectedRoute>
                    <Shortlist />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/interests"
                element={
                  <ProtectedRoute>
                    <Interests />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/messages"
                element={
                  <ProtectedRoute>
                    <Messages />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/visitors"
                element={
                  <ProtectedRoute>
                    <Visitors />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                }
              />

              {/* Not Found */}

              <Route
                path="*"
                element={<NotFound />}
              />

            </Routes>

          </PageTransition>

          <MobileBottomNav />

        </AuthProvider>

      </BrowserRouter>

    </TooltipProvider>

  </QueryClientProvider>

);

export default App;