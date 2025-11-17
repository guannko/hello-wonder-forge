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
import { Loader2, TrendingUp, AlertCircle } from "lucide-react";

interface GeoAnalysisModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const GeoAnalysisModal = ({ open, onOpenChange }: GeoAnalysisModalProps) => {
  const [brandName, setBrandName] = useState("");
  const [analyzedBrand, setAnalyzedBrand] = useState("");
  const analyzeMutation = useGeoAnalyze();

  const handleAnalyze = async () => {
    if (!brandName.trim()) return;
    
    try {
      setAnalyzedBrand(brandName.trim());
      await analyzeMutation.mutateAsync({ brandName: brandName.trim() });
    } catch (error) {
      console.error("Analysis failed:", error);
    }
  };

  const results = analyzeMutation.data;
  const hasResults = results && Object.keys(results).length > 0;
  const errorMessage = analyzeMutation.error 
    ? (analyzeMutation.error as Error).message 
    : "Analysis failed. Please try again.";

  const aiProviders = [
    { name: "ChatGPT", key: "chatgpt" as const },
    { name: "DeepSeek", key: "deepseek" as const },
    { name: "Mistral", key: "mistral" as const },
  ];

  const averageScore = hasResults
    ? Math.round(
        Object.values(results).reduce((sum, score) => sum + score, 0) /
          Object.keys(results).length
      )
    : 0;

  const getScoreColor = (score: number) => {
    if (score >= 15) return "hsl(142, 76%, 36%)"; // Green
    if (score >= 10) return "hsl(45, 93%, 47%)"; // Yellow/Orange
    return "hsl(0, 84%, 60%)"; // Red
  };

  const getScoreLevel = (score: number) => {
    if (score >= 15) return "Good";
    if (score >= 10) return "Moderate";
    return "Poor";
  };

  const problemsCount = hasResults
    ? Object.values(results).filter(score => score < 15).length
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
                  Analyzing across 5 AI systems...
                </>
              ) : (
                <>
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Analyze Brand
                </>
              )}
            </Button>

            {analyzeMutation.isError && (
              <div className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                <AlertCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-destructive">Analysis Error</p>
                  <p className="text-xs text-destructive/80 mt-1">{errorMessage}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Check browser console for details
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {hasResults && (
          <div className="space-y-6 py-4">
            <div className="text-center space-y-2">
              <div className="text-lg font-semibold text-muted-foreground">
                Analysis Results for
              </div>
              <div className="text-3xl font-bold text-foreground">{analyzedBrand}</div>
              <div className="text-5xl font-bold text-primary mt-2">{averageScore}/20</div>
              <p className="text-sm text-muted-foreground">Average AI Visibility Score</p>
            </div>

            {problemsCount > 0 && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-destructive">
                      {problemsCount} Critical Visibility {problemsCount === 1 ? 'Issue' : 'Issues'} Detected
                    </p>
                    <p className="text-xs text-destructive/80 mt-1">
                      Your brand is poorly represented in {problemsCount} major AI system{problemsCount === 1 ? '' : 's'}. 
                      You're losing potential customers to competitors.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {aiProviders.map((provider) => {
                const score = results[provider.key] ?? 0;
                const percentage = (score / 20) * 100;
                const scoreColor = getScoreColor(score);
                const scoreLevel = getScoreLevel(score);

                return (
                  <div key={provider.key} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{provider.name}</span>
                      <div className="flex items-center gap-2">
                        <span 
                          className="text-xs font-medium px-2 py-0.5 rounded"
                          style={{ 
                            backgroundColor: `${scoreColor}20`,
                            color: scoreColor 
                          }}
                        >
                          {scoreLevel}
                        </span>
                        <span className="text-sm font-bold">{score}/20</span>
                      </div>
                    </div>
                    <Progress 
                      value={percentage} 
                      className="h-2"
                      style={{
                        ['--progress-background' as string]: scoreColor
                      } as React.CSSProperties}
                    />
                  </div>
                );
              })}
            </div>

            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <p className="text-sm font-medium">⚠️ Free Analysis Limitation</p>
              <p className="text-xs text-muted-foreground">
                This quick scan reveals surface-level visibility issues. 
                You're seeing the problem, but not the solution.
                Get the full report to discover exactly how to fix these issues and dominate AI search results.
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => {
                  analyzeMutation.reset();
                  setBrandName("");
                  setAnalyzedBrand("");
                }}
                variant="outline"
                className="flex-1"
              >
                Analyze Another
              </Button>
              <Button className="flex-1">Get Full Analysis →</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GeoAnalysisModal;
