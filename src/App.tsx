
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Index from "./pages/Index";
import InterviewDetails from "./pages/InterviewDetails";
import SkillGapAnalyzer from "./pages/SkillGapAnalyzer";
import JobsPage from "./pages/JobsPage";
import JobDetailPage from "./pages/JobDetailPage";
import AdminJobPostPage from "./pages/AdminJobPostPage";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="system" enableSystem disableTransitionOnChange>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/" element={
                <PrivateRoute>
                  <Index />
                </PrivateRoute>
              } />
              <Route path="/interview/:id" element={
                <PrivateRoute>
                  <InterviewDetails />
                </PrivateRoute>
              } />
              <Route path="/skill-gap-analyzer" element={
                <PrivateRoute>
                  <SkillGapAnalyzer />
                </PrivateRoute>
              } />
              <Route path="/jobs" element={
                <PrivateRoute>
                  <JobsPage />
                </PrivateRoute>
              } />
              <Route path="/job/:id" element={
                <PrivateRoute>
                  <JobDetailPage />
                </PrivateRoute>
              } />
              <Route path="/admin/jobs/new" element={
                <PrivateRoute requiredRole="admin">
                  <AdminJobPostPage />
                </PrivateRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
