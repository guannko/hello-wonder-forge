import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, TrendingUp, Activity } from "lucide-react";

export default function AdminDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [usersResult, analysesResult, subscriptionsResult] = await Promise.all([
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("analyses").select("id, overall_score", { count: "exact" }),
        supabase.from("subscriptions").select("plan", { count: "exact" }),
      ]);

      const totalUsers = usersResult.count || 0;
      const totalAnalyses = analysesResult.count || 0;
      const analyses = analysesResult.data || [];
      const subscriptions = subscriptionsResult.data || [];

      const avgScore = analyses.length > 0
        ? Math.round(analyses.reduce((acc, a) => acc + (a.overall_score || 0), 0) / analyses.length)
        : 0;

      const activeSubs = subscriptions.filter(s => s.plan !== "free").length;

      return { totalUsers, totalAnalyses, avgScore, activeSubs };
    },
  });

  const cards = [
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      icon: Users,
      description: "Registered users",
    },
    {
      title: "Total Analyses",
      value: stats?.totalAnalyses || 0,
      icon: FileText,
      description: "Completed analyses",
    },
    {
      title: "Average Score",
      value: stats?.avgScore || 0,
      icon: TrendingUp,
      description: "Platform average",
    },
    {
      title: "Active Subscriptions",
      value: stats?.activeSubs || 0,
      icon: Activity,
      description: "Paid plans",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          System overview and analytics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
