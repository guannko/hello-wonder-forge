import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const PricingSection = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "",
      description: "Perfect for getting started",
      features: [
        "1 analysis per month",
        "Basic visibility score",
        "Email report",
        "Community support"
      ],
      buttonText: "Start Free",
      buttonVariant: "outline" as const,
      popular: false
    },
    {
      name: "Pro",
      price: "$99",
      period: "/month",
      description: "For serious brands",
      features: [
        "Unlimited analyses",
        "Competitor tracking",
        "PDF reports",
        "Priority support",
        "API access",
        "Custom integrations"
      ],
      buttonText: "Start Pro Trial",
      buttonVariant: "default" as const,
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large organizations",
      features: [
        "Custom AI providers",
        "White-label reports",
        "Dedicated support",
        "SLA guarantee",
        "Advanced analytics",
        "Team collaboration"
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const,
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Choose the plan that fits your needs
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative group transition-all duration-300 animate-scale-in ${
                plan.popular 
                  ? 'border-primary shadow-medium hover:shadow-strong scale-105' 
                  : 'hover:shadow-medium'
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-gradient-primary text-primary-foreground shadow-medium px-4 py-1">
                    MOST POPULAR
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8 pt-12">
                <CardTitle className="text-2xl font-bold text-foreground mb-2">
                  {plan.name}
                </CardTitle>
                <p className="text-muted-foreground text-sm mb-4">
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-muted-foreground ml-2">
                      {plan.period}
                    </span>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Features */}
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <Button 
                  variant={plan.buttonVariant}
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-gradient-primary hover:shadow-glow text-primary-foreground' 
                      : ''
                  }`}
                  size="lg"
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
