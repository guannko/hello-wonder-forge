import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search, Sparkles } from "lucide-react";
import { useState } from "react";
import { useAnalyzeBrand } from "@/hooks/useAnalyzeBrand";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const HeroSection = () => {
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
    <section id="home" className="pt-20 min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-ai-purple/10 to-ai-cyan/20"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-ai-purple/30 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-ai-cyan/30 rounded-full blur-3xl animate-pulse-glow animation-delay-1000"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 animate-fade-in">
            {/* Logo Image */}
            <div className="mb-6">
              <img 
                src="/images/brain-index-logo.png" 
                alt="Brain Index" 
                className="h-24 w-auto"
              />
            </div>
            
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white">
                <Sparkles className="w-4 h-4 text-brand-orange" />
                <span className="text-sm font-medium">AI Visibility Analytics</span>
              </div>
              
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                Is Your Brand
                <br />
                <span className="bg-gradient-to-r from-white to-brand-orange-light bg-clip-text text-transparent">
                  Visible in AI?
                </span>
              </h1>
            </div>

            <p className="text-xl text-white/90 leading-relaxed">
              Check how ChatGPT, Claude, and other AI systems see your brand
            </p>

          </div>

          {/* Right Column - Quick Analysis Form */}
          <div className="animate-slide-in-right">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-strong border border-white/20">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Quick Analysis</h3>
                  <p className="text-white/80">
                    Enter your brand name
                  </p>
                </div>

                <div className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Enter your brand name"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/50 focus:bg-white/30 transition-all h-12"
                  />

                  <Button
                    size="lg"
                    onClick={handleAnalyze}
                    disabled={analyzeMutation.isPending}
                    className="w-full bg-primary hover:bg-primary-dark text-white border-0 transition-all duration-300 hover:scale-105 h-12"
                  >
                    {analyzeMutation.isPending ? "ANALYZING..." : "CHECK AI VISIBILITY"}
                  </Button>

                  <p className="text-center text-white/70 text-sm">
                    Free analysis • No credit card required
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;