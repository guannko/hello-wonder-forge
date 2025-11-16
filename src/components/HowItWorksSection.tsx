import { Card, CardContent } from "@/components/ui/card";
import { Search, Brain, FileText } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Search,
      number: "1",
      title: "Enter your brand name",
      description: "Simply type your brand name into our quick analysis form"
    },
    {
      icon: Brain,
      number: "2",
      title: "AI analyzes 5+ systems",
      description: "We check ChatGPT, Claude, Perplexity, Gemini, and Grok in real-time"
    },
    {
      icon: FileText,
      number: "3",
      title: "Get your visibility report",
      description: "Receive detailed insights and actionable recommendations instantly"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Get your AI visibility report in 3 simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <Card 
              key={index}
              className="relative group hover:shadow-medium transition-all duration-300 animate-scale-in border-t-4 border-t-primary"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-8 text-center">
                {/* Number Badge */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold shadow-medium">
                    {step.number}
                  </div>
                </div>

                {/* Icon */}
                <div className="mt-8 mb-6 flex justify-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
