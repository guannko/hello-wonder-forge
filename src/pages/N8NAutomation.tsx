import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Zap, ArrowRight, CheckCircle, Settings, Workflow, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const workflows = [
  {
    title: "Auto Brand Monitoring",
    description: "Automatically track your brand mentions across AI platforms daily",
    icon: Clock,
    features: ["Daily AI scans", "Email alerts", "Trend tracking"],
  },
  {
    title: "Competitor Analysis",
    description: "Compare your AI visibility against competitors automatically",
    icon: Workflow,
    features: ["Weekly reports", "Competitive insights", "Action recommendations"],
  },
  {
    title: "Custom Workflows",
    description: "Build tailored automation for your specific needs",
    icon: Settings,
    features: ["Flexible triggers", "Multi-platform", "API integrations"],
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "$99",
    period: "per month",
    features: [
      "Up to 5 workflows",
      "Daily monitoring",
      "Email notifications",
      "Basic support",
    ],
  },
  {
    name: "Professional",
    price: "$299",
    period: "per month",
    features: [
      "Unlimited workflows",
      "Real-time monitoring",
      "Slack/Teams integration",
      "Priority support",
      "Custom triggers",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    features: [
      "Everything in Pro",
      "Dedicated manager",
      "Custom integrations",
      "24/7 support",
      "SLA guarantee",
    ],
  },
];

export default function N8NAutomation() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    webhookUrl: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // If webhook URL is provided, trigger it
      if (formData.webhookUrl) {
        await fetch(formData.webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "no-cors",
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            company: formData.company,
            message: formData.message,
            timestamp: new Date().toISOString(),
            source: "n8n-automation-page",
          }),
        });
      }

      toast({
        title: "Success!",
        description: "Your inquiry has been submitted. We'll contact you soon.",
      });

      setFormData({
        name: "",
        email: "",
        company: "",
        message: "",
        webhookUrl: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-ai-purple/10 to-ai-cyan/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white">
              <Zap className="h-4 w-4 text-brand-orange" />
              <span className="text-sm font-medium">Automation Services</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              N8N Automation Services
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Automate your AI visibility monitoring and brand tracking with powerful
              workflow automation
            </p>
          </div>
        </div>
      </section>

      {/* Workflows Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pre-Built Automation Workflows
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose from our ready-to-use workflows or create custom automations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {workflows.map((workflow, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <workflow.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{workflow.title}</CardTitle>
                  <CardDescription>{workflow.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {workflow.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Why Choose Our Automation Services?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Save Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Automate repetitive monitoring tasks and focus on strategic decisions.
                    Save up to 20 hours per week.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Real-Time Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Get instant notifications when your AI visibility changes or
                    competitors make moves.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-primary" />
                    Fully Customizable
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Tailor workflows to your exact needs with flexible triggers,
                    actions, and integrations.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Workflow className="h-5 w-5 text-primary" />
                    Multi-Platform
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Connect with Slack, Teams, email, webhooks, and 300+ other
                    integrations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Automation Pricing
            </h2>
            <p className="text-muted-foreground text-lg">
              Choose the plan that fits your automation needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={
                  plan.popular
                    ? "border-primary shadow-lg relative"
                    : ""
                }
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary">Most Popular</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">
                      {plan.period}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">Get Started with Automation</CardTitle>
                <CardDescription className="text-base">
                  Fill out the form below and we'll help you set up your custom
                  automation workflows
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      placeholder="Your company name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Tell us about your needs *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="What automation workflows are you interested in?"
                      rows={4}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="webhook">
                      Zapier Webhook URL (Optional)
                    </Label>
                    <Input
                      id="webhook"
                      value={formData.webhookUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, webhookUrl: e.target.value })
                      }
                      placeholder="https://hooks.zapier.com/..."
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      If you have a Zapier webhook, we'll trigger it with your form data
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
