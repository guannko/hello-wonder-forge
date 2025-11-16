import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminRoute from "@/components/AdminRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import AdminLayout from "./layouts/AdminLayout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import MyAnalyses from "./pages/MyAnalyses";
import AnalysisDetails from "./pages/AnalysisDetails";
import BrandHistory from "./pages/BrandHistory";
import Competitors from "./pages/Competitors";
import UserSettings from "./pages/UserSettings";
import Billing from "./pages/Billing";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminAnalyses from "./pages/admin/AdminAnalyses";
import AdminSettings from "./pages/admin/AdminSettings";
import N8NAutomation from "./pages/N8NAutomation";
import NotFound from "./pages/NotFound";
import FAQ from "./pages/FAQ";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/n8n-automation" element={<N8NAutomation />} />
            <Route path="/faq" element={<FAQ />} />
          
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="analyses" element={<MyAnalyses />} />
            <Route path="analyses/:id" element={<AnalysisDetails />} />
            <Route path="history" element={<BrandHistory />} />
            <Route path="competitors" element={<Competitors />} />
            <Route path="settings" element={<UserSettings />} />
            <Route path="billing" element={<Billing />} />
          </Route>

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="analyses" element={<AdminAnalyses />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
