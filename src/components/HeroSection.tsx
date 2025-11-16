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
      {/* Multi-layer Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-ai-purple/10 to-ai-cyan/20"></div>
      
      {/* Animated wave layers */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-ai-purple/20 via-transparent to-ai-cyan/20 animate-wave"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-l from-primary/20 via-transparent to-brand-orange/20 animate-wave-slow"></div>
      </div>

      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent w-[200%] h-[200%] animate-shimmer"></div>
      </div>
      
      {/* Floating animated orbs with different speeds */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-ai-purple/30 rounded-full blur-3xl animate-pulse-glow animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-ai-cyan/30 rounded-full blur-3xl animate-pulse-glow animation-delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-orange/20 rounded-full blur-3xl animate-pulse-glow animation-delay-500 animate-wave-slow"></div>
      
      {/* Additional smaller orbs */}
      <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-primary/25 rounded-full blur-2xl animate-pulse-glow animation-delay-1500"></div>
      <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-ai-cyan/25 rounded-full blur-2xl animate-pulse-glow animation-delay-2000 animate-float"></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
      
      {/* Radial gradient spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Centered Content */}
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Main Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white">
              <Sparkles className="w-4 h-4 text-brand-orange" />
              <span className="text-sm font-medium">AI Visibility Analytics</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Is Your Brand
              <br />
              <span className="bg-gradient-to-r from-white via-brand-orange-light to-white bg-clip-text text-transparent">
                Visible in AI?
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-2xl mx-auto">
              Check how ChatGPT, Claude, and other AI systems see your brand
            </p>
          </div>

          {/* Quick Analysis Form - Centered */}
          <div className="animate-scale-in animation-delay-200">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-strong border border-white/20 max-w-xl mx-auto">
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
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAnalyze();
                      }
                    }}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/50 focus:bg-white/30 transition-all h-12 text-center text-lg"
                  />

                  <Button
                    size="lg"
                    onClick={handleAnalyze}
                    disabled={analyzeMutation.isPending}
                    className="w-full bg-gradient-primary shadow-medium hover:shadow-strong transition-all duration-300 hover:scale-105 h-14 text-lg font-semibold"
                  >
                    {analyzeMutation.isPending ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Search className="w-5 h-5 mr-2" />
                        CHECK AI VISIBILITY
                      </>
                    )}
                  </Button>

                  <p className="text-white/60 text-sm">
                    Free analysis • No credit card required
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 pt-8 animate-fade-in animation-delay-400">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">10+</div>
              <div className="text-white/70 text-sm">AI Systems</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">60s</div>
              <div className="text-white/70 text-sm">Analysis Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">100%</div>
              <div className="text-white/70 text-sm">Accurate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;