import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search, Sparkles } from "lucide-react";
import { useState } from "react";

const HeroSection = () => {
  const [brandName, setBrandName] = useState("");

  const handleAnalyze = () => {
    if (brandName.trim()) {
      console.log("Analyzing brand:", brandName);
      // Here would be the actual analysis logic
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

            <div className="space-y-4 text-lg text-white/90">
              <p className="leading-relaxed">
                Check how ChatGPT, Claude, and other AI systems see your brand
              </p>
              <p className="leading-relaxed">
                Discover your AI visibility score, track competitors, and get actionable 
                insights to improve your presence in AI-powered search results.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 shadow-strong transition-all duration-300 hover:scale-105"
              >
                <Search className="w-5 h-5 mr-2" />
                Analyze Now
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
              >
                Learn More
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">10+</div>
                <div className="text-sm text-white/70">AI systems analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">Real-time</div>
                <div className="text-sm text-white/70">monitoring</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">Competitor</div>
                <div className="text-sm text-white/70">tracking</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">Actionable</div>
                <div className="text-sm text-white/70">insights</div>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Analysis Form */}
          <div className="animate-slide-in-right">
            <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-8 shadow-strong">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-foreground mb-2">Quick Analysis</h3>
                  <p className="text-muted-foreground">Enter your brand name to get started</p>
                </div>

                <div className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Enter your brand name"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className="h-12 text-lg"
                  />
                  <Button 
                    onClick={handleAnalyze}
                    className="w-full h-12 bg-gradient-primary shadow-medium hover:shadow-strong transition-all duration-300"
                    disabled={!brandName.trim()}
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Check AI Visibility
                  </Button>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                  Free analysis • No credit card required
                </div>

                {/* AI Logos */}
                <div className="flex justify-center items-center space-x-4 pt-4 border-t border-border/50">
                  <div className="text-xs text-muted-foreground">Analyzing:</div>
                  <div className="flex space-x-3">
                    <div className="w-6 h-6 bg-ai-purple/20 rounded text-xs flex items-center justify-center font-bold text-ai-purple">
                      C
                    </div>
                    <div className="w-6 h-6 bg-ai-cyan/20 rounded text-xs flex items-center justify-center font-bold text-ai-cyan">
                      G
                    </div>
                    <div className="w-6 h-6 bg-ai-emerald/20 rounded text-xs flex items-center justify-center font-bold text-ai-emerald">
                      P
                    </div>
                    <div className="w-6 h-6 bg-brand-orange/20 rounded text-xs flex items-center justify-center font-bold text-brand-orange">
                      C
                    </div>
                  </div>
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