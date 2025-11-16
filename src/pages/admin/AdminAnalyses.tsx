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
import { format } from "date-fns";

export default function AdminAnalyses() {
  const { data: analyses, isLoading } = useQuery({
    queryKey: ["admin-analyses"],
    queryFn: async () => {
      const { data: analysesData, error: analysesError } = await supabase
        .from("analyses")
        .select("*")
        .order("created_at", { ascending: false });

      if (analysesError) throw analysesError;

      const analysesWithUsers = await Promise.all(
        analysesData.map(async (analysis) => {
          const { data: profile } = await supabase
            .from("profiles")
            .select("email, full_name")
            .eq("id", analysis.user_id)
            .single();

          return {
            ...analysis,
            userEmail: profile?.email || "Unknown",
            userName: profile?.full_name || "Unknown",
          };
        })
      );

      return analysesWithUsers;
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
        <h1 className="text-4xl font-bold mb-2">Analyses Monitoring</h1>
        <p className="text-muted-foreground">
          Monitor all brand analyses across the platform
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Analyses ({analyses?.length || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Brand</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {analyses && analyses.length > 0 ? (
                analyses.map((analysis) => (
                  <TableRow key={analysis.id}>
                    <TableCell className="font-medium">
                      {analysis.brand_name}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{analysis.userName}</div>
                        <div className="text-sm text-muted-foreground">
                          {analysis.userEmail}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-2xl font-bold text-primary">
                        {analysis.overall_score || "N/A"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={analysis.status === "completed" ? "default" : "secondary"}>
                        {analysis.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {format(new Date(analysis.created_at), "PP p")}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No analyses found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
