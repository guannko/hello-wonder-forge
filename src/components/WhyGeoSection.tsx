import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingDown, Zap, Heart, Users } from "lucide-react";

const WhyGeoSection = () => {
  const trends = [
    {
      icon: TrendingDown,
      title: "Zero-click searches increasing",
      description: "More users get answers directly from AI without clicking through to websites",
      stat: "+45%",
      color: "text-red-500"
    },
    {
      icon: Zap,
      title: "AI gives instant recommendations",
      description: "Users prefer immediate, personalized suggestions over browsing multiple options",
      stat: "2.3s",
      color: "text-ai-cyan"
    },
    {
      icon: Heart,
      title: "Trust in AI responses growing",
      description: "Consumers increasingly trust AI-generated recommendations and advice",
      stat: "67%",
      color: "text-ai-emerald"
    },
    {
      icon: Users,
      title: "Voice and chat interfaces dominant",
      description: "Conversational AI is becoming the primary way people search for information",
      stat: "3.2B",
      color: "text-ai-purple"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <Badge variant="secondary" className="mb-4">
            <TrendingDown className="w-4 h-4 mr-2" />
            The Future is Here
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Why GEO is
            <br />
            <span className="text-primary">the Future</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            The paradigm shift: Users no longer browse through search results. 
            They get direct answers from AI.
          </p>
        </div>

        {/* Trends Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {trends.map((trend, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-medium transition-all duration-300 animate-scale-in border-l-4 border-l-transparent hover:border-l-primary"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <trend.icon className={`w-6 h-6 ${trend.color}`} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-foreground">{trend.title}</h3>
                      <div className={`text-2xl font-bold ${trend.color}`}>
                        {trend.stat}
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {trend.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quote Section */}
        <div className="bg-gradient-hero p-12 rounded-3xl text-white text-center animate-fade-in">
          <div className="max-w-3xl mx-auto">
            <blockquote className="text-2xl md:text-3xl font-bold mb-6 leading-relaxed">
              "In the age of AI, being invisible to ChatGPT, Claude, and Gemini 
              is like being invisible to Google in the early 2000s."
            </blockquote>
            <div className="text-lg text-white/80">
              — The Future of Digital Marketing
            </div>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          <div className="text-center animate-fade-in">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">85%</div>
            <div className="text-sm text-muted-foreground">of users prefer AI answers</div>
          </div>
          <div className="text-center animate-fade-in animation-delay-200">
            <div className="text-3xl md:text-4xl font-bold text-ai-cyan mb-2">3x</div>
            <div className="text-sm text-muted-foreground">faster decision making</div>
          </div>
          <div className="text-center animate-fade-in animation-delay-400">
            <div className="text-3xl md:text-4xl font-bold text-ai-emerald mb-2">92%</div>
            <div className="text-sm text-muted-foreground">trust AI recommendations</div>
          </div>
          <div className="text-center animate-fade-in animation-delay-600">
            <div className="text-3xl md:text-4xl font-bold text-brand-orange mb-2">50%</div>
            <div className="text-sm text-muted-foreground">of searches are conversational</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyGeoSection;