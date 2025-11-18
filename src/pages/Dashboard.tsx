import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  TrendingUp, 
  Users, 
  Clock, 
  Plus, 
  ArrowRight,
  Download,
  AlertCircle,
  CheckCircle,
  BarChart3,
  Target,
  Zap
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import OnboardingTour from "@/components/OnboardingTour";
import GeoAnalysisModal from "@/components/GeoAnalysisModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);

  const { data: analyses } = useQuery({
    queryKey: ["analyses", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("analyses")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false })
        .limit(10);
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const { data: competitors } = useQuery({
    queryKey: ["competitors", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("competitors")
        .select("*")
        .eq("user_id", user?.id);
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const avgScore = analyses?.length 
    ? Math.round(analyses.reduce((acc, a) => acc + (a.overall_score || 0), 0) / analyses.length)
    : 0;

  const lastAnalysis = analyses?.[0];
  const scoreChange = analyses && analyses.length >= 2
    ? (analyses[0].overall_score || 0) - (analyses[1].overall_score || 0)
    : 0;

  const stats = [
    {
      title: "Total Analyses",
      value: analyses?.length || 0,
      icon: FileText,
      description: "Brand analyses completed",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      title: "Average Score",
      value: avgScore,
      icon: TrendingUp,
      description: scoreChange !== 0 ? `${scoreChange > 0 ? '+' : ''}${scoreChange} from last` : "AI visibility score",
      color: avgScore >= 70 ? "text-green-500" : avgScore >= 30 ? "text-yellow-500" : "text-red-500",
      bgColor: avgScore >= 70 ? "bg-green-500/10" : avgScore >= 30 ? "bg-yellow-500/10" : "bg-red-500/10",
      trend: scoreChange
    },
    {
      title: "Competitors Tracked",
      value: competitors?.length || 0,
      icon: Users,
      description: "Monitored competitors",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      title: "Last Analysis",
      value: lastAnalysis 
        ? format(new Date(lastAnalysis.created_at), "MMM d")
        : "N/A",
      icon: Clock,
      description: lastAnalysis ? format(new Date(lastAnalysis.created_at), "p") : "No analyses yet",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10"
    },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-green-500 border-green-500/30 bg-green-500/10";
    if (score >= 30) return "text-yellow-500 border-yellow-500/30 bg-yellow-500/10";
    return "text-red-500 border-red-500/30 bg-red-500/10";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 70) return "Excellent";
    if (score >= 50) return "Good";
    if (score >= 30) return "Moderate";
    if (score >= 15) return "Poor";
    return "Critical";
  };

  const quickActions = [
    {
      title: "New Analysis",
      description: "Analyze brand AI visibility",
      icon: Plus,
      onClick: () => setShowAnalysisModal(true),
      color: "bg-gradient-to-br from-primary to-primary/70"
    },
    {
      title: "View History",
      description: "See all past analyses",
      icon: BarChart3,
      onClick: () => navigate("/my-analyses"),
      color: "bg-gradient-to-br from-blue-500 to-blue-600"
    },
    {
      title: "Track Competitors",
      description: "Monitor competition",
      icon: Target,
      onClick: () => navigate("/competitors"),
      color: "bg-gradient-to-br from-purple-500 to-purple-600"
    },
    {
      title: "Automation",
      description: "Set up n8n workflows",
      icon: Zap,
      onClick: () => navigate("/automation"),
      color: "bg-gradient-to-br from-orange-500 to-orange-600"
    }
  ];

  return (
    <div className="space-y-8 pb-8">
      <OnboardingTour />
      <GeoAnalysisModal open={showAnalysisModal} onOpenChange={setShowAnalysisModal} />
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Welcome back!</h1>
          <p className="text-muted-foreground">
            Track and improve your AI visibility across multiple platforms
          </p>
        </div>
        <Button onClick={() => setShowAnalysisModal(true)} size="lg" className="bg-gradient-to-r from-primary to-primary/80">
          <Plus className="h-5 w-5 mr-2" />
          New Analysis
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`${stat.bgColor} p-2 rounded-lg`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                {stat.trend !== undefined && stat.trend !== 0 && (
                  <Badge variant="outline" className={stat.trend > 0 ? "text-green-500" : "text-red-500"}>
                    {stat.trend > 0 ? "↑" : "↓"} {Math.abs(stat.trend)}
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <Card 
            key={action.title}
            className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1"
            onClick={action.onClick}
          >
            <CardContent className="p-6">
              <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <action.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-1">{action.title}</h3>
              <p className="text-sm text-muted-foreground">{action.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Analyses */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Analyses</CardTitle>
            <CardDescription>Your latest brand visibility checks</CardDescription>
          </div>
          {analyses && analyses.length > 0 && (
            <Button variant="ghost" size="sm" onClick={() => navigate("/my-analyses")}>
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {analyses && analyses.length > 0 ? (
            <div className="space-y-4">
              {analyses.slice(0, 5).map((analysis) => {
                const score = analysis.overall_score || 0;
                const scoreLabel = getScoreLabel(score);
                const aiSystems = analysis.ai_systems as any[] || [];
                
                return (
                  <div
                    key={analysis.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                    onClick={() => navigate(`/analysis/${analysis.id}`)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{analysis.brand_name}</h3>
                        <Badge variant="outline" className={getScoreColor(score)}>
                          {scoreLabel}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {format(new Date(analysis.created_at), "PPP 'at' p")}
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          {aiSystems.length} AI systems analyzed
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-3xl font-bold ${score >= 70 ? "text-green-500" : score >= 30 ? "text-yellow-500" : "text-red-500"}`}>
                        {score}
                      </div>
                      <p className="text-xs text-muted-foreground">Score out of 100</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-muted/30 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <FileText className="h-12 w-12 text-muted-foreground/50" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No analyses yet</h3>
              <p className="text-muted-foreground mb-4">
                Start tracking your brand's AI visibility today
              </p>
              <Button onClick={() => setShowAnalysisModal(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Run Your First Analysis
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Insights & Recommendations */}
      {lastAnalysis && lastAnalysis.overall_score < 50 && (
        <Card className="border-yellow-500/50 bg-yellow-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-500" />
              Action Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              Your latest analysis for <strong>{lastAnalysis.brand_name}</strong> shows low AI visibility ({lastAnalysis.overall_score}/100). 
              Consider improving your content strategy and online presence.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" onClick={() => navigate("/automation")}>
                Setup Automation
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate("/competitors")}>
                Compare with Competitors
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
