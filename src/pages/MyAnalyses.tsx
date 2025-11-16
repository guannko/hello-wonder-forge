import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { FileText, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MyAnalyses() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: analyses, isLoading } = useQuery({
    queryKey: ["all-analyses", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("analyses")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
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
        <h1 className="text-4xl font-bold mb-2">My Analyses</h1>
        <p className="text-muted-foreground">
          View all your brand visibility analyses
        </p>
      </div>

      {analyses && analyses.length > 0 ? (
        <div className="grid gap-6">
          {analyses.map((analysis) => (
            <Card key={analysis.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">
                    {analysis.brand_name}
                  </CardTitle>
                  <Badge variant={analysis.overall_score && analysis.overall_score >= 70 ? "default" : "secondary"}>
                    Score: {analysis.overall_score || "N/A"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(analysis.created_at), "PPP 'at' p")}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysis.findings && Array.isArray(analysis.findings) && analysis.findings.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Key Findings:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        {(analysis.findings as any[]).slice(0, 3).map((finding: any, idx: number) => (
                          <li key={idx}>{finding.description || finding}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {analysis.recommendations && Array.isArray(analysis.recommendations) && analysis.recommendations.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Recommendations:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        {(analysis.recommendations as any[]).slice(0, 3).map((rec: any, idx: number) => (
                          <li key={idx}>{rec.description || rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <Button
                    onClick={() => navigate(`/dashboard/analyses/${analysis.id}`)}
                    className="w-full"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Full Analysis
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p className="text-muted-foreground">
              No analyses yet. Start by analyzing your brand!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
