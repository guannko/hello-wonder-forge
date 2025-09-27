import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, RotateCcw } from "lucide-react";
import { useState, useEffect } from "react";

interface AnalysisStep {
  id: string;
  name: string;
  progress: number;
  status: "pending" | "analyzing" | "complete";
  score?: number;
  color: string;
}

const InteractiveDemo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);

  const [aiSystems, setAiSystems] = useState<AnalysisStep[]>([
    { id: "chatgpt", name: "ChatGPT", progress: 0, status: "pending", color: "ai-purple" },
    { id: "claude", name: "Claude", progress: 0, status: "pending", color: "ai-cyan" },
    { id: "gemini", name: "Gemini", progress: 0, status: "pending", color: "ai-emerald" },
    { id: "perplexity", name: "Perplexity", progress: 0, status: "pending", color: "brand-orange" },
    { id: "copilot", name: "Copilot", progress: 0, status: "pending", color: "primary" },
  ]);

  const resetDemo = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setOverallProgress(0);
    setAiSystems(prev => prev.map(system => ({
      ...system,
      progress: 0,
      status: "pending" as const,
      score: undefined
    })));
  };

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setAiSystems(prev => {
        const updated = [...prev];
        const current = updated[currentStep];
        
        if (current && current.status !== "complete") {
          if (current.status === "pending") {
            current.status = "analyzing";
          }
          
          current.progress = Math.min(current.progress + 5, 100);
          
          if (current.progress === 100) {
            current.status = "complete";
            current.score = Math.floor(Math.random() * 30) + 70; // Random score 70-100
            
            if (currentStep < prev.length - 1) {
              setCurrentStep(prev => prev + 1);
            } else {
              setIsPlaying(false);
            }
          }
        }
        
        return updated;
      });

      // Update overall progress
      const totalSteps = aiSystems.length;
      const completedSteps = aiSystems.filter(s => s.status === "complete").length;
      const currentProgress = aiSystems[currentStep]?.progress || 0;
      setOverallProgress(Math.floor((completedSteps * 100 + currentProgress) / totalSteps));
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, currentStep, aiSystems.length]);

  const getStatusColor = (system: AnalysisStep) => {
    switch (system.status) {
      case "analyzing": return `text-${system.color} animate-pulse`;
      case "complete": return `text-${system.color}`;
      default: return "text-muted-foreground";
    }
  };

  const averageScore = aiSystems
    .filter(s => s.score !== undefined)
    .reduce((acc, s) => acc + (s.score || 0), 0) / aiSystems.filter(s => s.score !== undefined).length;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-hero rounded-3xl p-2 shadow-strong">
        <div className="bg-background rounded-2xl overflow-hidden">
          {/* Demo Header */}
          <div className="bg-gradient-to-r from-primary/10 via-ai-purple/10 to-ai-cyan/10 p-6 border-b border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">AI Visibility Analysis</h3>
                <p className="text-muted-foreground">Brand: TechStartup Inc.</p>
              </div>
              <div className="flex items-center space-x-4">
                {!isPlaying && currentStep === 0 && (
                  <Button onClick={() => setIsPlaying(true)} className="bg-gradient-primary">
                    <Play className="w-4 h-4 mr-2" />
                    Start Analysis
                  </Button>
                )}
                {isPlaying && (
                  <Button onClick={() => setIsPlaying(false)} variant="outline">
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </Button>
                )}
                {(currentStep > 0 || !isPlaying) && (
                  <Button onClick={resetDemo} variant="outline" size="sm">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                )}
              </div>
            </div>
            
            {/* Overall Progress */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Overall Progress</span>
                <span className="text-sm text-muted-foreground">{overallProgress}%</span>
              </div>
              <Progress value={overallProgress} className="h-2" />
            </div>
          </div>

          {/* AI Systems Analysis */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {aiSystems.map((system, index) => (
                <Card 
                  key={system.id} 
                  className={`transition-all duration-300 ${
                    system.status === "analyzing" ? "ring-2 ring-primary/50 shadow-glow" : ""
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${
                          system.status === "complete" ? `bg-${system.color}` :
                          system.status === "analyzing" ? `bg-${system.color} animate-pulse` :
                          "bg-muted"
                        }`}></div>
                        <span className={`font-medium ${getStatusColor(system)}`}>
                          {system.name}
                        </span>
                      </div>
                      {system.score && (
                        <Badge variant="outline" className={`text-${system.color} border-${system.color}/30`}>
                          {system.score}%
                        </Badge>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">
                          {system.status === "pending" && "Waiting..."}
                          {system.status === "analyzing" && "Analyzing..."}
                          {system.status === "complete" && "Complete"}
                        </span>
                        <span className="text-muted-foreground">{system.progress}%</span>
                      </div>
                      <Progress value={system.progress} className="h-1" />
                    </div>

                    {system.status === "complete" && (
                      <div className="mt-3 text-xs text-muted-foreground">
                        <div>• Query relevance detected</div>
                        <div>• Brand mentions found</div>
                        <div>• Sentiment analyzed</div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Results Summary */}
            {averageScore > 0 && (
              <Card className="bg-gradient-card shadow-medium">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h4 className="text-2xl font-bold text-foreground mb-2">Analysis Complete!</h4>
                    <div className="flex items-center justify-center space-x-8 mb-4">
                      <div>
                        <div className="text-3xl font-bold text-primary mb-1">
                          {Math.round(averageScore)}%
                        </div>
                        <div className="text-sm text-muted-foreground">Overall Visibility Score</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-ai-emerald mb-1">
                          {aiSystems.filter(s => s.status === "complete").length}
                        </div>
                        <div className="text-sm text-muted-foreground">AI Systems Analyzed</div>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Your brand shows {averageScore > 85 ? "excellent" : averageScore > 70 ? "good" : "moderate"} visibility across AI systems.
                    </p>
                    <Button className="bg-gradient-primary">
                      View Detailed Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveDemo;