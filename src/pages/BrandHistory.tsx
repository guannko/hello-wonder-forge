import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { format } from "date-fns";
import { TrendingUp, Calendar, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function BrandHistory() {
  const navigate = useNavigate();

  const { data: analyses, isLoading } = useQuery({
    queryKey: ["analyses-history"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("analyses")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!analyses || analyses.length === 0) {
    return (
      <div className="text-center py-12">
        <Activity className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">No Analysis History</h2>
        <p className="text-muted-foreground mb-6">Start analyzing brands to see trends over time</p>
        <Button onClick={() => navigate("/dashboard")}>
          Analyze Your First Brand
        </Button>
      </div>
    );
  }

  // Group analyses by brand
  const brandGroups = analyses.reduce((acc: any, analysis) => {
    const brandName = analysis.brand_name;
    if (!acc[brandName]) {
      acc[brandName] = [];
    }
    acc[brandName].push(analysis);
    return acc;
  }, {});

  // Prepare data for overall trend chart
  const overallTrendData = analyses.map((analysis) => ({
    date: format(new Date(analysis.created_at), "MMM dd"),
    score: analysis.overall_score || 0,
    brand: analysis.brand_name,
  }));

  // Calculate statistics
  const totalAnalyses = analyses.length;
  const avgScore = analyses.reduce((sum, a) => sum + (a.overall_score || 0), 0) / totalAnalyses;
  const latestScore = analyses[analyses.length - 1]?.overall_score || 0;
  const scoreChange = analyses.length > 1 
    ? latestScore - (analyses[analyses.length - 2]?.overall_score || 0)
    : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Brand Analytics History</h1>
        <p className="text-muted-foreground">Track your brand performance over time</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Analyses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalAnalyses}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Average Score</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{avgScore.toFixed(1)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Latest Score</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{latestScore}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Score Change</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${scoreChange >= 0 ? 'text-green-500' : 'text-destructive'}`}>
              {scoreChange >= 0 ? '+' : ''}{scoreChange.toFixed(1)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overall Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Overall Score Trend
          </CardTitle>
          <CardDescription>
            Your brand scores across all analyses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={overallTrendData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="hsl(var(--primary))" 
                  fillOpacity={1} 
                  fill="url(#colorScore)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Brand-Specific Charts */}
      {Object.entries(brandGroups).map(([brandName, brandAnalyses]: [string, any]) => {
        const brandTrendData = brandAnalyses.map((analysis: any) => ({
          date: format(new Date(analysis.created_at), "MMM dd, HH:mm"),
          score: analysis.overall_score || 0,
        }));

        return (
          <Card key={brandName}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {brandName} - Score History
              </CardTitle>
              <CardDescription>
                {brandAnalyses.length} {brandAnalyses.length === 1 ? 'analysis' : 'analyses'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={brandTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--primary))", r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Recent Analyses List */}
              <div className="mt-6 space-y-2">
                <h4 className="font-semibold mb-3">Recent Analyses</h4>
                {brandAnalyses.slice(-5).reverse().map((analysis: any) => (
                  <div 
                    key={analysis.id} 
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => navigate(`/dashboard/analyses/${analysis.id}`)}
                  >
                    <div>
                      <div className="text-sm text-muted-foreground">
                        {format(new Date(analysis.created_at), "PPp")}
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      {analysis.overall_score || 0}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
