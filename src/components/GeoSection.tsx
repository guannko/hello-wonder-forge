import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, TrendingUp, Users, Zap } from "lucide-react";

const GeoSection = () => {
  return (
    <section id="features" className="py-20 bg-background relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 text-primary mb-6">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">What is GEO?</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            From SEO to GEO:
            <br />
            <span className="text-primary">The Evolution</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Generative Engine Optimization (GEO) is the new frontier of digital visibility
          </p>
        </div>

        {/* Evolution Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* SEO Card */}
          <Card className="relative overflow-hidden group">
            <CardContent className="p-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-muted-foreground">Traditional SEO</h3>
                    <p className="text-sm text-muted-foreground/70">The old way</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  While SEO helped you rank in Google search results, users still had to 
                  browse through multiple links to find what they need.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Rankings in search results</li>
                  <li>• Multiple clicks required</li>
                  <li>• Users browse and compare</li>
                  <li>• Traditional keyword optimization</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* GEO Card */}
          <Card className="relative overflow-hidden group bg-gradient-card shadow-medium hover:shadow-strong transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-ai opacity-10"></div>
            <CardContent className="p-8 relative z-10">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
                    <Zap className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Modern GEO</h3>
                    <p className="text-sm text-primary">The new frontier</p>
                  </div>
                </div>
                <p className="text-foreground font-medium">
                  <strong>GEO ensures AI systems recommend your brand</strong> when users 
                  ask questions directly to AI assistants.
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Direct AI recommendations</li>
                  <li>• Instant, personalized answers</li>
                  <li>• Zero-click interactions</li>
                  <li>• Context-aware visibility</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Question */}
        <div className="text-center bg-gradient-hero p-12 rounded-3xl text-white mb-16 animate-scale-in">
          <h3 className="text-2xl md:text-4xl font-bold mb-6">
            When someone asks ChatGPT
            <br />
            <span className="text-brand-orange">"What's the best CRM for startups?"</span>
            <br />
            Is YOUR business mentioned?
          </h3>
          <p className="text-xl text-white/90 mb-8">
            These AI systems are becoming the primary way people discover products and services.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 shadow-strong transition-all duration-300 hover:scale-105"
          >
            Learn How It Works
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* AI Systems */}
        <div className="text-center">
          <p className="text-muted-foreground mb-8">Track your visibility across all major AI systems</p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center space-x-3 bg-card p-4 rounded-lg shadow-soft">
              <div className="w-10 h-10 bg-ai-purple/20 rounded-lg flex items-center justify-center">
                <span className="font-bold text-ai-purple">ChatGPT</span>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-card p-4 rounded-lg shadow-soft">
              <div className="w-10 h-10 bg-ai-cyan/20 rounded-lg flex items-center justify-center">
                <span className="font-bold text-ai-cyan">Claude</span>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-card p-4 rounded-lg shadow-soft">
              <div className="w-10 h-10 bg-ai-emerald/20 rounded-lg flex items-center justify-center">
                <span className="font-bold text-ai-emerald">Gemini</span>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-card p-4 rounded-lg shadow-soft">
              <div className="w-10 h-10 bg-brand-orange/20 rounded-lg flex items-center justify-center">
                <span className="font-bold text-brand-orange">Perplexity</span>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-card p-4 rounded-lg shadow-soft">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                <span className="font-bold text-primary">Copilot</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GeoSection;