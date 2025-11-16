import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";

const faqs = [
  {
    question: "What is AI Visibility Tracking?",
    answer: "AI Visibility Tracking measures how your brand appears across major AI platforms like ChatGPT, Claude, and Gemini. It provides scores and insights into how AI systems understand and represent your brand.",
  },
  {
    question: "How often should I analyze my brand?",
    answer: "We recommend analyzing your brand weekly or after major changes to your online presence, such as launching new products, publishing content, or updating your website.",
  },
  {
    question: "What factors affect my AI visibility score?",
    answer: "Your score is influenced by multiple factors including your online presence, content quality, brand mentions, structured data, and how consistently your brand information appears across the web.",
  },
  {
    question: "Can I track multiple brands?",
    answer: "Yes! You can analyze and track as many brands as you need. Each brand gets its own dedicated analytics and history tracking.",
  },
  {
    question: "How do I improve my AI visibility score?",
    answer: "Follow the recommendations provided in each analysis. Generally, this includes improving your online presence, creating quality content, ensuring consistent brand information, and implementing structured data on your website.",
  },
  {
    question: "What AI platforms do you track?",
    answer: "We currently track visibility across major AI platforms including ChatGPT (OpenAI), Claude (Anthropic), Gemini (Google), and other leading AI systems.",
  },
  {
    question: "Is my data secure?",
    answer: "Yes, we take security seriously. All data is encrypted and stored securely. We never share your brand analysis data with third parties.",
  },
  {
    question: "How accurate are the visibility scores?",
    answer: "Our scores are based on comprehensive analysis of how AI systems respond to queries about your brand. We use multiple testing methods to ensure accuracy and reliability.",
  },
  {
    question: "Can I export my analysis reports?",
    answer: "Yes, you can export detailed analysis reports as PDF files from the analysis details page. This is useful for sharing with your team or stakeholders.",
  },
  {
    question: "What's the difference between the free and paid plans?",
    answer: "The free plan includes basic analysis and limited history tracking. Paid plans offer unlimited analyses, advanced competitor tracking, priority support, and deeper insights.",
  },
];

export default function FAQ() {
  const navigate = useNavigate();

  return (
    <>
      <SEOHead
        title="FAQ - AI Visibility Tracker"
        description="Frequently asked questions about AI Visibility Tracking. Learn how to monitor and improve your brand's presence across AI platforms."
        keywords="AI visibility FAQ, brand monitoring questions, AI analytics help, visibility tracking guide"
      />

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <HelpCircle className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-3xl">Frequently Asked Questions</CardTitle>
                  <CardDescription className="text-base mt-2">
                    Everything you need to know about AI Visibility Tracking
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <AccordionItem value={`item-${index}`} className="border-none">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50 transition-colors">
                    <span className="text-left font-semibold">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </Card>
            ))}
          </Accordion>

          <Card className="mt-8">
            <CardContent className="pt-6 text-center">
              <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
              <p className="text-muted-foreground mb-4">
                Can't find the answer you're looking for? We're here to help!
              </p>
              <Button onClick={() => navigate("/dashboard/settings")}>
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
