import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, ChevronRight, ChevronLeft } from "lucide-react";

interface OnboardingStep {
  title: string;
  description: string;
  tip: string;
}

const steps: OnboardingStep[] = [
  {
    title: "Welcome to AI Visibility Tracker! 👋",
    description: "Track how your brand appears in AI systems like ChatGPT, Claude, and Gemini.",
    tip: "Start by analyzing your brand to see how AI sees you.",
  },
  {
    title: "Analyze Your Brand",
    description: "Enter your brand name to get instant visibility scores across major AI platforms.",
    tip: "The analysis takes about 30 seconds and provides detailed insights.",
  },
  {
    title: "View Analytics History",
    description: "Track your brand's score over time and see how improvements affect your visibility.",
    tip: "Use the Analytics History page to monitor trends and progress.",
  },
  {
    title: "Compare with Competitors",
    description: "See how your brand stacks up against competitors in AI visibility.",
    tip: "Add competitors to get comparative analysis and benchmarking.",
  },
];

export default function OnboardingTour() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding");
    if (!hasSeenOnboarding) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("hasSeenOnboarding", "true");
    setIsVisible(false);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!isVisible) return null;

  const step = steps[currentStep];

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full shadow-lg border-2 border-primary/20">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-2xl mb-2">{step.title}</CardTitle>
              <CardDescription className="text-base">{step.description}</CardDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="ml-2"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <p className="text-sm">
              <span className="font-semibold">💡 Pro Tip:</span> {step.tip}
            </p>
          </div>

          {/* Progress indicator */}
          <div className="flex gap-2 justify-center">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentStep
                    ? "w-8 bg-primary"
                    : index < currentStep
                    ? "w-2 bg-primary/50"
                    : "w-2 bg-muted"
                }`}
              />
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between gap-4">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <Button onClick={handleNext}>
              {currentStep === steps.length - 1 ? (
                "Get Started"
              ) : (
                <>
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>

          <Button
            variant="ghost"
            onClick={handleClose}
            className="w-full"
          >
            Skip Tour
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
