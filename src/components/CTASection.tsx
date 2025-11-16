import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { useAnalyzeBrand } from "@/hooks/useAnalyzeBrand";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const CTASection = () => {
  const [brandName, setBrandName] = useState("");
  const analyzeMutation = useAnalyzeBrand();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleAnalyze = async () => {
    if (!brandName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a brand name",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to analyze your brand",
      });
      navigate("/login");
      return;
    }

    try {
      await analyzeMutation.mutateAsync(brandName);
      toast({
        title: "Success!",
        description: "Brand analysis completed. Check your dashboard.",
      });
      navigate("/dashboard/analyses");
    } catch (error) {
      // Error is already handled in the hook
    }
  };

  return (
    <section className="py-20 bg-gradient-hero relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-ai-purple/10 to-ai-cyan/20"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-ai-purple/30 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-ai-cyan/30 rounded-full blur-3xl animate-pulse-glow"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          {/* Header */}
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to See How AI Views Your Brand?
          </h2>
          <p className="text-xl text-white/90 mb-12">
            Join 10,000+ companies tracking their AI visibility
          </p>

          {/* Form */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-strong border border-white/20">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="text"
                placeholder="Enter your brand name"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/50 focus:bg-white/30 transition-all h-14 text-lg"
              />
              <Button
                size="lg"
                onClick={handleAnalyze}
                disabled={analyzeMutation.isPending}
                className="bg-white text-primary hover:bg-white/90 shadow-strong transition-all duration-300 hover:scale-105 h-14 px-8"
              >
                <Search className="w-5 h-5 mr-2" />
                {analyzeMutation.isPending ? "Analyzing..." : "Get Free Report"}
              </Button>
            </div>
            <p className="text-white/70 text-sm mt-4">
              Free analysis • No credit card required • Results in 60 seconds
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
