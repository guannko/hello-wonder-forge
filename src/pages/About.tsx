import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Users, Zap, Shield } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="About Us - Brain Index"
        description="Learn about Brain Index, the leading platform for AI visibility analytics."
      />
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Brain Index</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're pioneering the future of brand visibility in the age of artificial intelligence.
              Our mission is to help businesses understand and optimize how AI systems perceive and recommend their brands.
            </p>
          </div>

          <div className="mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">Our Story</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none">
                <p>
                  Brain Index was founded in 2024 with a simple yet powerful insight: as AI systems become the primary
                  way people discover and evaluate products and services, brand visibility is fundamentally changing.
                  Traditional SEO and marketing metrics no longer tell the full story.
                </p>
                <p>
                  We built Brain Index to bridge this gap, providing businesses with unprecedented visibility into how
                  leading AI platforms—from ChatGPT to Gemini—understand, represent, and recommend their brands.
                  Our platform analyzes your brand across multiple AI systems, providing actionable insights to improve
                  your AI visibility and stay ahead in the age of generative AI.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card>
              <CardHeader>
                <Target className="w-10 h-10 text-primary mb-4" />
                <CardTitle>Our Mission</CardTitle>
                <CardDescription>
                  To empower businesses with the insights and tools they need to thrive in an AI-driven world
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="w-10 h-10 text-primary mb-4" />
                <CardTitle>Our Team</CardTitle>
                <CardDescription>
                  A diverse group of AI experts, data scientists, and marketing professionals dedicated to innovation
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="w-10 h-10 text-primary mb-4" />
                <CardTitle>Innovation</CardTitle>
                <CardDescription>
                  Continuously developing cutting-edge analytics to track the evolving AI landscape
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="w-10 h-10 text-primary mb-4" />
                <CardTitle>Trust & Security</CardTitle>
                <CardDescription>
                  Your data security and privacy are our top priorities, with enterprise-grade protection
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="text-center">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl mb-4">Join Us on This Journey</CardTitle>
                <CardDescription className="text-lg">
                  Whether you're a startup or an enterprise, Brain Index provides the insights you need to
                  succeed in the AI era. Let's shape the future of brand visibility together.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
