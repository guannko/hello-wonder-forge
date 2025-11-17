import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useGeoAnalyze } from "@/hooks/useGeoAnalyze";
import { Loader2, TrendingUp } from "lucide-react";

interface GeoAnalysisModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const GeoAnalysisModal = ({ open, onOpenChange }: GeoAnalysisModalProps) => {
  const [brandName, setBrandName] = useState("");
  const analyzeMutation = useGeoAnalyze();

  const handleAnalyze = async () => {
    if (!brandName.trim()) return;
    
    try {
      await analyzeMutation.mutateAsync({ brandName: brandName.trim() });
    } catch (error) {
      console.error("Analysis failed:", error);
    }
  };

  const results = analyzeMutation.data;
  const hasResults = results && Object.keys(results).length > 0;

  const aiProviders = [
    { name: "ChatGPT", key: "chatgpt" as const, color: "hsl(var(--primary))" },
    { name: "DeepSeek", key: "deepseek" as const, color: "hsl(var(--chart-2))" },
    { name: "Mistral", key: "mistral" as const, color: "hsl(var(--chart-3))" },
  ];

  const averageScore = hasResults
    ? Math.round(
        Object.values(results).reduce((sum, score) => sum + score, 0) /
          Object.keys(results).length
      )
    : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Brand AI Visibility Analysis</DialogTitle>
          <DialogDescription>
            Analyze how AI systems perceive your brand across multiple providers
          </DialogDescription>
        </DialogHeader>

        {!hasResults && (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Brand Name</label>
              <Input
                placeholder="Enter brand name..."
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                disabled={analyzeMutation.isPending}
              />
            </div>

            <Button
              onClick={handleAnalyze}
              disabled={!brandName.trim() || analyzeMutation.isPending}
              className="w-full"
              size="lg"
            >
              {analyzeMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing with 5 AI providers...
                </>
              ) : (
                <>
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Analyze Brand
                </>
              )}
            </Button>

            {analyzeMutation.isError && (
              <p className="text-sm text-destructive">
                Analysis failed. Please try again.
              </p>
            )}
          </div>
        )}

        {hasResults && (
          <div className="space-y-6 py-4">
            <div className="text-center space-y-2">
              <div className="text-5xl font-bold text-primary">{averageScore}/20</div>
              <p className="text-sm text-muted-foreground">Average AI Visibility Score</p>
            </div>

            <div className="space-y-4">
              {aiProviders.map((provider) => {
                const score = results[provider.key] ?? 0;
                const percentage = (score / 20) * 100;

                return (
                  <div key={provider.key} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{provider.name}</span>
                      <span className="text-sm font-bold">{score}/20</span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                );
              })}
            </div>

            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <p className="text-sm font-medium">Analysis Summary</p>
              <p className="text-xs text-muted-foreground">
                Your brand visibility score indicates how effectively AI systems recognize
                and represent your brand. A higher score means better AI visibility.
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => {
                  analyzeMutation.reset();
                  setBrandName("");
                }}
                variant="outline"
                className="flex-1"
              >
                Analyze Another
              </Button>
              <Button className="flex-1">Get Full Analysis</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GeoAnalysisModal;
