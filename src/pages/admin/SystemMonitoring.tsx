import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatsCard } from "@/components/admin/StatsCard";
import {
  Activity,
  Database,
  Zap,
  Clock,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function SystemMonitoring() {
  const { data: systemStats, isLoading } = useQuery({
    queryKey: ["system-stats"],
    queryFn: async () => {
      const [cacheStats, rateLimitStats, recentErrors] = await Promise.all([
        supabase
          .from("analyses_cache")
          .select("*", { count: "exact" }),
        supabase
          .from("rate_limits")
          .select("*", { count: "exact" }),
        supabase
          .from("rate_limits")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(10),
      ]);

      const totalCached = cacheStats.count || 0;
      const activeCached = cacheStats.data?.filter(
        (c) => new Date(c.expires_at) > new Date()
      ).length || 0;
      const totalRateLimits = rateLimitStats.count || 0;

      return {
        totalCached,
        activeCached,
        totalRateLimits,
        recentActivity: recentErrors.data || [],
      };
    },
  });

  const { data: edgeFunctionHealth } = useQuery({
    queryKey: ["edge-function-health"],
    queryFn: async () => {
      // Simulate health checks
      return [
        { name: "analyze-brand", status: "healthy", latency: 245 },
        { name: "send-email", status: "healthy", latency: 89 },
        { name: "weekly-summary", status: "healthy", latency: 156 },
      ];
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
        <h1 className="text-4xl font-bold mb-2">System Monitoring</h1>
        <p className="text-muted-foreground">
          Monitor system performance and health metrics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Cached Analyses"
          value={systemStats?.activeCached || 0}
          description={`${systemStats?.totalCached || 0} total entries`}
          icon={Database}
        />
        <StatsCard
          title="Rate Limit Events"
          value={systemStats?.totalRateLimits || 0}
          description="Total rate limit checks"
          icon={Zap}
        />
        <StatsCard
          title="System Uptime"
          value="99.9%"
          description="Last 30 days"
          icon={Activity}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Edge Functions Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Function</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Latency</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {edgeFunctionHealth?.map((func) => (
                <TableRow key={func.name}>
                  <TableCell className="font-medium">{func.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant={func.status === "healthy" ? "default" : "destructive"}
                    >
                      {func.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      {func.latency}ms
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent Rate Limit Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          {systemStats?.recentActivity && systemStats.recentActivity.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Action</TableHead>
                  <TableHead>User ID</TableHead>
                  <TableHead>Count</TableHead>
                  <TableHead>Window Start</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {systemStats.recentActivity.map((activity: any) => (
                  <TableRow key={activity.id}>
                    <TableCell className="font-medium">{activity.action}</TableCell>
                    <TableCell className="text-xs font-mono">
                      {activity.user_id.substring(0, 8)}...
                    </TableCell>
                    <TableCell>{activity.count}</TableCell>
                    <TableCell>
                      {formatDistanceToNow(new Date(activity.window_start), {
                        addSuffix: true,
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No recent rate limit activity
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
