import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import GeoAnalysisModal from "@/components/GeoAnalysisModal";

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="home" className="pt-20 min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Multi-layer Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-ai-purple/10 to-ai-cyan/20"></div>
      
      {/* Thematic Background Elements - GEO/AI Theme */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {/* Floating AI System Names - Larger and more visible */}
        <div className="absolute top-20 left-10 animate-float animation-delay-500 text-white/50 font-bold text-3xl" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.3), -1px -1px 0 rgba(0,0,0,0.3), 1px -1px 0 rgba(0,0,0,0.3), -1px 1px 0 rgba(0,0,0,0.3)' }}>
          ChatGPT
        </div>
        <div className="absolute top-16 left-40 animate-float animation-delay-800 text-white/45 font-semibold text-xl" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.3), -1px -1px 0 rgba(0,0,0,0.3), 1px -1px 0 rgba(0,0,0,0.3), -1px 1px 0 rgba(0,0,0,0.3)' }}>
          SEO
        </div>
        <div className="absolute top-40 right-20 animate-float animation-delay-1000 text-white/50 font-bold text-3xl" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.3), -1px -1px 0 rgba(0,0,0,0.3), 1px -1px 0 rgba(0,0,0,0.3), -1px 1px 0 rgba(0,0,0,0.3)' }}>
          Claude
        </div>
        <div className="absolute bottom-40 left-1/4 animate-float animation-delay-1500 text-white/50 font-bold text-3xl" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.3), -1px -1px 0 rgba(0,0,0,0.3), 1px -1px 0 rgba(0,0,0,0.3), -1px 1px 0 rgba(0,0,0,0.3)' }}>
          Gemini
        </div>
        <div className="absolute top-1/3 right-1/4 animate-float animation-delay-2000 text-white/50 font-bold text-3xl" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.3), -1px -1px 0 rgba(0,0,0,0.3), 1px -1px 0 rgba(0,0,0,0.3), -1px 1px 0 rgba(0,0,0,0.3)' }}>
          Perplexity
        </div>
        
        {/* GEO Keywords floating - Larger */}
        <div className="absolute top-1/2 left-20 animate-float animation-delay-500 text-brand-orange/50 font-semibold text-2xl" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.3), -1px -1px 0 rgba(0,0,0,0.3), 1px -1px 0 rgba(0,0,0,0.3), -1px 1px 0 rgba(0,0,0,0.3)' }}>
          GEO
        </div>
        <div className="absolute bottom-1/3 right-1/3 animate-float animation-delay-1000 text-ai-cyan/50 font-semibold text-2xl" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.3), -1px -1px 0 rgba(0,0,0,0.3), 1px -1px 0 rgba(0,0,0,0.3), -1px 1px 0 rgba(0,0,0,0.3)' }}>
          Analytics
        </div>
        <div className="absolute top-2/3 left-1/3 animate-float animation-delay-1500 text-primary/50 font-semibold text-2xl" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.3), -1px -1px 0 rgba(0,0,0,0.3), 1px -1px 0 rgba(0,0,0,0.3), -1px 1px 0 rgba(0,0,0,0.3)' }}>
          Visibility
        </div>
        <div className="absolute bottom-20 right-1/4 animate-float animation-delay-2000 text-brand-orange/50 font-semibold text-2xl" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.3), -1px -1px 0 rgba(0,0,0,0.3), 1px -1px 0 rgba(0,0,0,0.3), -1px 1px 0 rgba(0,0,0,0.3)' }}>
          AI Search
        </div>
        <div className="absolute bottom-32 right-16 animate-float animation-delay-1200 text-white/45 font-semibold text-xl" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.3), -1px -1px 0 rgba(0,0,0,0.3), 1px -1px 0 rgba(0,0,0,0.3), -1px 1px 0 rgba(0,0,0,0.3)' }}>
          Automation
        </div>
        <div className="absolute bottom-16 right-40 animate-float animation-delay-1700 text-ai-purple/45 font-semibold text-xl" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.3), -1px -1px 0 rgba(0,0,0,0.3), 1px -1px 0 rgba(0,0,0,0.3), -1px 1px 0 rgba(0,0,0,0.3)' }}>
          Ranking
        </div>
        
        {/* Abstract graph lines */}
        <svg className="absolute top-1/4 right-1/3 w-32 h-32 animate-pulse-glow animation-delay-500" viewBox="0 0 100 100">
          <polyline points="10,80 30,60 50,70 70,40 90,20" fill="none" stroke="white" strokeWidth="2" opacity="0.4"/>
        </svg>
        <svg className="absolute bottom-1/4 left-1/4 w-40 h-40 animate-pulse-glow animation-delay-1500" viewBox="0 0 100 100">
          <polyline points="10,90 25,70 40,75 60,50 80,30 95,15" fill="none" stroke="white" strokeWidth="2" opacity="0.4"/>
        </svg>
        
        {/* Data points/metrics - Larger */}
        <div className="absolute top-1/4 left-1/3 animate-fade-in animation-delay-1000 text-white/40 text-base font-mono" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.3), -1px -1px 0 rgba(0,0,0,0.3), 1px -1px 0 rgba(0,0,0,0.3), -1px 1px 0 rgba(0,0,0,0.3)' }}>
          Score: 85%
        </div>
        <div className="absolute bottom-1/2 right-20 animate-fade-in animation-delay-1500 text-white/40 text-base font-mono" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.3), -1px -1px 0 rgba(0,0,0,0.3), 1px -1px 0 rgba(0,0,0,0.3), -1px 1px 0 rgba(0,0,0,0.3)' }}>
          Mentions: 247
        </div>
        <div className="absolute top-1/2 right-1/3 animate-fade-in animation-delay-2000 text-white/40 text-base font-mono" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.3), -1px -1px 0 rgba(0,0,0,0.3), 1px -1px 0 rgba(0,0,0,0.3), -1px 1px 0 rgba(0,0,0,0.3)' }}>
          Rank: #1
        </div>
      </div>
      
      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent w-[200%] h-[200%] animate-shimmer"></div>
      </div>
      
      {/* Floating animated orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-ai-purple/30 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-ai-cyan/30 rounded-full blur-3xl animate-pulse-glow animation-delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-orange/20 rounded-full blur-3xl animate-pulse-glow animation-delay-500"></div>
      
      {/* Additional smaller orbs */}
      <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-primary/25 rounded-full blur-2xl animate-pulse-glow animation-delay-1500"></div>
      <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-ai-cyan/25 rounded-full blur-2xl animate-pulse-glow animation-delay-2000"></div>
      
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

          {/* Quick Analysis CTA - Centered */}
          <div className="animate-scale-in animation-delay-200">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-strong border border-white/20 max-w-xl mx-auto">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Quick Analysis</h3>
                  <p className="text-white/80">
                    Check your brand's AI visibility score
                  </p>
                </div>

                <div className="space-y-4">
                  <Button
                    size="lg"
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-gradient-primary shadow-medium hover:shadow-strong transition-all duration-300 hover:scale-105 h-14 text-lg font-semibold"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    CHECK AI VISIBILITY
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
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

      <GeoAnalysisModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </section>
  );
};

export default HeroSection;