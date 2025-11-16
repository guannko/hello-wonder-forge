import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Users, FileText, TrendingUp, Activity, DollarSign, Clock } from "lucide-react";
import { StatsCard } from "@/components/admin/StatsCard";
import { RecentActivity } from "@/components/admin/RecentActivity";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, subDays } from "date-fns";

export default function AdminDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [usersResult, analysesResult, subscriptionsResult, weekAgoUsers, weekAgoAnalyses] = await Promise.all([
        supabase.from("profiles").select("id, created_at", { count: "exact" }),
        supabase.from("analyses").select("id, overall_score, created_at", { count: "exact" }),
        supabase.from("subscriptions").select("plan", { count: "exact" }),
        supabase.from("profiles").select("id", { count: "exact", head: true }).lte("created_at", subDays(new Date(), 7).toISOString()),
        supabase.from("analyses").select("id", { count: "exact", head: true }).lte("created_at", subDays(new Date(), 7).toISOString()),
      ]);

      const totalUsers = usersResult.count || 0;
      const totalAnalyses = analysesResult.count || 0;
      const analyses = analysesResult.data || [];
      const subscriptions = subscriptionsResult.data || [];

      const avgScore = analyses.length > 0
        ? Math.round(analyses.reduce((acc, a) => acc + (a.overall_score || 0), 0) / analyses.length)
        : 0;

      const activeSubs = subscriptions.filter(s => s.plan !== "free").length;

      // Calculate trends
      const usersTrend = weekAgoUsers.count ? ((totalUsers - weekAgoUsers.count) / weekAgoUsers.count) * 100 : 0;
      const analysesTrend = weekAgoAnalyses.count ? ((totalAnalyses - weekAgoAnalyses.count) / weekAgoAnalyses.count) * 100 : 0;

      // Prepare chart data for last 7 days
      const chartData = Array.from({ length: 7 }, (_, i) => {
        const date = subDays(new Date(), 6 - i);
        const dateStr = format(date, "yyyy-MM-dd");
        
        const dayAnalyses = analyses.filter(
          (a) => format(new Date(a.created_at), "yyyy-MM-dd") === dateStr
        );

        return {
          date: format(date, "MMM dd"),
          analyses: dayAnalyses.length,
          avgScore: dayAnalyses.length > 0
            ? Math.round(dayAnalyses.reduce((acc, a) => acc + (a.overall_score || 0), 0) / dayAnalyses.length)
            : 0,
        };
      });

      return {
        totalUsers,
        totalAnalyses,
        avgScore,
        activeSubs,
        usersTrend: Math.round(usersTrend),
        analysesTrend: Math.round(analysesTrend),
        chartData,
      };
    },
  });

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
        <StatsCard
          title="Total Users"
          value={stats?.totalUsers || 0}
          description="Registered users"
          icon={Users}
          trend={
            stats?.usersTrend
              ? { value: stats.usersTrend, label: "vs last week" }
              : undefined
          }
        />
        <StatsCard
          title="Total Analyses"
          value={stats?.totalAnalyses || 0}
          description="Completed analyses"
          icon={FileText}
          trend={
            stats?.analysesTrend
              ? { value: stats.analysesTrend, label: "vs last week" }
              : undefined
          }
        />
        <StatsCard
          title="Average Score"
          value={`${stats?.avgScore || 0}/100`}
          description="Platform average"
          icon={TrendingUp}
        />
        <StatsCard
          title="Active Subscriptions"
          value={stats?.activeSubs || 0}
          description="Paid plans"
          icon={DollarSign}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Analyses Trend (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={stats?.chartData || []}>
                <defs>
                  <linearGradient id="colorAnalyses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="analyses"
                  stroke="hsl(var(--primary))"
                  fillOpacity={1}
                  fill="url(#colorAnalyses)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Score Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={stats?.chartData || []}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="avgScore"
                  stroke="hsl(var(--chart-2))"
                  fillOpacity={1}
                  fill="url(#colorScore)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <RecentActivity />
    </div>
  );
}
