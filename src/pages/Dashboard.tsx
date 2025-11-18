import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, TrendingUp, Users, Clock, Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import OnboardingTour from "@/components/OnboardingTour";
import GeoAnalysisModal from "@/components/GeoAnalysisModal";
import { useState } from "react";

export default function Dashboard() {
  const { user } = useAuth();
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);

  const { data: analyses } = useQuery({
    queryKey: ["analyses", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("analyses")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false })
        .limit(5);
      
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

  const stats = [
    {
      title: "Total Analyses",
      value: analyses?.length || 0,
      icon: FileText,
      description: "Brand analyses completed",
    },
    {
      title: "Average Score",
      value: analyses?.length 
        ? Math.round(analyses.reduce((acc, a) => acc + (a.overall_score || 0), 0) / analyses.length)
        : 0,
      icon: TrendingUp,
      description: "AI visibility score",
    },
    {
      title: "Competitors Tracked",
      value: competitors?.length || 0,
      icon: Users,
      description: "Monitored competitors",
    },
    {
      title: "Last Analysis",
      value: analyses?.[0] 
        ? format(new Date(analyses[0].created_at), "MMM d")
        : "N/A",
      icon: Clock,
      description: "Most recent check",
    },
  ];

  return (
    <div className="space-y-8">
      <OnboardingTour />
      <GeoAnalysisModal open={showAnalysisModal} onOpenChange={setShowAnalysisModal} />
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Welcome back!</h1>
          <p className="text-muted-foreground">
            Here's an overview of your AI visibility performance
          </p>
        </div>
        <Button onClick={() => setShowAnalysisModal(true)} size="lg">
          <Plus className="h-5 w-5 mr-2" />
          New Analysis
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Analyses</CardTitle>
        </CardHeader>
        <CardContent>
          {analyses && analyses.length > 0 ? (
            <div className="space-y-4">
              {analyses.map((analysis) => (
                <div
                  key={analysis.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold">{analysis.brand_name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(analysis.created_at), "PPP")}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      {analysis.overall_score || "N/A"}
                    </div>
                    <p className="text-xs text-muted-foreground">Score</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p>No analyses yet. Start by analyzing your brand!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
