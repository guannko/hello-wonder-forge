import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, BarChart3, Target, Lightbulb } from "lucide-react";
import InteractiveDemo from "./InteractiveDemo";

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

        {/* Video Demo */}
        <div className="mb-16 max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-strong bg-gradient-to-br from-primary/20 to-ai-purple/20 p-8">
            <div className="aspect-video rounded-xl overflow-hidden shadow-medium">
              <video 
                className="w-full h-full object-cover"
                autoPlay 
                loop 
                muted 
                playsInline
                aria-label="Brain Index platform demo showing AI visibility analysis in action"
                title="AI Visibility Analysis Demo"
              >
                <source src="/video/demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>

        {/* Interactive Demo */}
        <div className="mb-16">
          <InteractiveDemo />
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