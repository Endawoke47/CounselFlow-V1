
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import CompanySecretarial from "./pages/CompanySecretarial";
import Contracts from "./pages/Contracts";
import DisputeResolution from "./pages/DisputeResolution";
import MatterManagement from "./pages/MatterManagement";
import LicensingRegulatory from "./pages/LicensingRegulatory";
import PolicyManagement from "./pages/PolicyManagement";
import KnowledgeManagement from "./pages/KnowledgeManagement";
import IPManagement from "./pages/IPManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/company-secretarial" element={<CompanySecretarial />} />
          <Route path="/contracts" element={<Contracts />} />
          <Route path="/dispute-resolution" element={<DisputeResolution />} />
          <Route path="/matters" element={<MatterManagement />} />
          <Route path="/licensing-regulatory" element={<LicensingRegulatory />} />
          <Route path="/policy-management" element={<PolicyManagement />} />
          <Route path="/knowledge-management" element={<KnowledgeManagement />} />
          <Route path="/ip-management" element={<IPManagement />} />
          {/* Redirect from old paths to new paths */}
          <Route path="/disputes" element={<Navigate to="/dispute-resolution" replace />} />
          <Route path="/licensing" element={<Navigate to="/licensing-regulatory" replace />} />
          <Route path="/policies" element={<Navigate to="/policy-management" replace />} />
          <Route path="/knowledge" element={<Navigate to="/knowledge-management" replace />} />
          <Route path="/ip" element={<Navigate to="/ip-management" replace />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
