import { Card, CardContent } from "@/components/ui/card";
import { Brain, TrendingUp, Users, Lightbulb, FileText, Activity } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: "Multi-AI Analysis",
      description: "ChatGPT, Claude, Perplexity, Gemini, Grok"
    },
    {
      icon: TrendingUp,
      title: "Visibility Score",
      description: "1-100 rating across all systems"
    },
    {
      icon: Users,
      title: "Competitor Tracking",
      description: "See how you compare to competitors"
    },
    {
      icon: Lightbulb,
      title: "Actionable Insights",
      description: "GEO recommendations to improve"
    },
    {
      icon: FileText,
      title: "PDF Reports",
      description: "Professional reports for stakeholders"
    },
    {
      icon: Activity,
      title: "Real-time Monitoring",
      description: "Track changes over time"
    }
  ];

  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            What You Get
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Comprehensive AI visibility analytics at your fingertips
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group hover:shadow-medium transition-all duration-300 animate-scale-in hover:border-primary/50"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-8">
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-glow">
                    <feature.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
