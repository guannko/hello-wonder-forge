import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Download, TrendingUp, Target, AlertCircle } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { format } from "date-fns";

export default function AnalysisDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: analysis, isLoading } = useQuery({
    queryKey: ["analysis", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("analyses")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const handleExportPDF = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Analysis not found</p>
      </div>
    );
  }

  const aiSystems = analysis.ai_systems as any[] || [];
  const findings = analysis.findings as any[] || [];
  const recommendations = analysis.recommendations as any[] || [];

  // Prepare chart data
  const radarData = aiSystems.map((system: any) => ({
    system: system.name,
    score: system.score || 0,
  }));

  const findingsData = findings.map((finding: any, index: number) => ({
    name: `Finding ${index + 1}`,
    impact: finding.impact || 0,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between print:hidden">
        <Button variant="ghost" onClick={() => navigate("/dashboard/analyses")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Analyses
        </Button>
        <Button onClick={handleExportPDF}>
          <Download className="h-4 w-4 mr-2" />
          Export PDF
        </Button>
      </div>

      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-3xl">{analysis.brand_name}</CardTitle>
              <CardDescription>
                Analyzed on {format(new Date(analysis.created_at), "PPP")}
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-primary">
                {analysis.overall_score || 0}
              </div>
              <div className="text-sm text-muted-foreground">Overall Score</div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* AI Systems Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            AI Systems Performance
          </CardTitle>
          <CardDescription>
            Your brand's visibility across different AI platforms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Radar Chart */}
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="system" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart */}
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={radarData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="system" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="score" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Systems Details */}
          <div className="mt-6 space-y-4">
            {aiSystems.map((system: any, index: number) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{system.name}</h4>
                  <span className="text-2xl font-bold text-primary">
                    {system.score || 0}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {system.description || "No description available"}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Findings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Key Findings
          </CardTitle>
          <CardDescription>
            Important insights discovered during the analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          {findingsData.length > 0 && (
            <div className="h-[200px] mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={findingsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="impact" fill="hsl(var(--destructive))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          <div className="space-y-4">
            {findings.map((finding: any, index: number) => (
              <div key={index} className="border-l-4 border-primary pl-4 py-2">
                <h4 className="font-semibold mb-1">{finding.title || `Finding ${index + 1}`}</h4>
                <p className="text-sm text-muted-foreground">
                  {finding.description || "No description available"}
                </p>
                {finding.severity && (
                  <span className={`inline-block mt-2 px-2 py-1 rounded text-xs ${
                    finding.severity === 'high' ? 'bg-destructive/10 text-destructive' :
                    finding.severity === 'medium' ? 'bg-orange-500/10 text-orange-500' :
                    'bg-yellow-500/10 text-yellow-500'
                  }`}>
                    {finding.severity} priority
                  </span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Recommendations
          </CardTitle>
          <CardDescription>
            Actionable steps to improve your AI visibility
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((rec: any, index: number) => (
              <div key={index} className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-semibold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{rec.title || `Recommendation ${index + 1}`}</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      {rec.description || "No description available"}
                    </p>
                    {rec.priority && (
                      <span className={`inline-block px-2 py-1 rounded text-xs ${
                        rec.priority === 'high' ? 'bg-primary/10 text-primary' :
                        rec.priority === 'medium' ? 'bg-blue-500/10 text-blue-500' :
                        'bg-gray-500/10 text-gray-500'
                      }`}>
                        {rec.priority} priority
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
