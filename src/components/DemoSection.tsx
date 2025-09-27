import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, BarChart3, Target, Lightbulb } from "lucide-react";

const DemoSection = () => {
  return (
    <section id="how-it-works" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <Badge variant="secondary" className="mb-4">
            <Play className="w-4 h-4 mr-2" />
            Live Demo
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            See Brain Index
            <br />
            <span className="text-primary">in Action</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Watch how our platform analyzes your brand visibility across multiple AI systems in real-time.
          </p>
        </div>

        {/* Demo Video Placeholder */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative bg-gradient-hero rounded-3xl p-2 shadow-strong">
            <div className="bg-background rounded-2xl p-8 md:p-12">
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-ai-purple/10 rounded-xl flex items-center justify-center relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-ai opacity-20 animate-gradient-flow"></div>
                
                {/* Play Button */}
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-strong mb-6 mx-auto hover:scale-110 transition-transform duration-300 cursor-pointer">
                    <Play className="w-8 h-8 text-primary ml-1" fill="currentColor" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Live AI Analysis Demo</h3>
                  <p className="text-muted-foreground">See real results in 60 seconds</p>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-medium animate-pulse">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Analyzing...</span>
                  </div>
                </div>
                
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-medium">
                  <div className="text-xs text-muted-foreground">Visibility Score</div>
                  <div className="text-2xl font-bold text-primary">87%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="group hover:shadow-medium transition-all duration-300 animate-scale-in">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Live AI Analysis Demo</h3>
              <p className="text-muted-foreground leading-relaxed">
                Watch real-time analysis of how AI systems perceive and present your brand across different queries and contexts.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-medium transition-all duration-300 animate-scale-in animation-delay-200">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-ai-cyan/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Target className="w-8 h-8 text-ai-cyan" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Real Results in 60 Seconds</h3>
              <p className="text-muted-foreground leading-relaxed">
                Get comprehensive visibility scores, competitor comparisons, and detailed analysis in under a minute.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-medium transition-all duration-300 animate-scale-in animation-delay-400">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-brand-orange/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Lightbulb className="w-8 h-8 text-brand-orange" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Actionable Recommendations</h3>
              <p className="text-muted-foreground leading-relaxed">
                Receive specific, data-driven recommendations to improve your brand's visibility in AI search results.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button 
            size="lg" 
            className="bg-gradient-primary shadow-medium hover:shadow-strong transition-all duration-300 hover:scale-105"
          >
            <Play className="w-5 h-5 mr-2" />
            Try It Yourself
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;