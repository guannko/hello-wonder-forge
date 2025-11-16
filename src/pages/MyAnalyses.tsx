import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { FileText, Eye, Search, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";

export default function MyAnalyses() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");
  const [filterScore, setFilterScore] = useState("all");

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

  // Filter and sort analyses
  const filteredAnalyses = useMemo(() => {
    if (!analyses) return [];

    let filtered = analyses.filter((analysis) => {
      // Search filter
      const matchesSearch = analysis.brand_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      // Score filter
      const score = analysis.overall_score || 0;
      let matchesScore = true;
      if (filterScore === "high") matchesScore = score >= 70;
      if (filterScore === "medium") matchesScore = score >= 40 && score < 70;
      if (filterScore === "low") matchesScore = score < 40;

      return matchesSearch && matchesScore;
    });

    // Sort
    if (sortBy === "date-desc") {
      filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else if (sortBy === "date-asc") {
      filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    } else if (sortBy === "score-desc") {
      filtered.sort((a, b) => (b.overall_score || 0) - (a.overall_score || 0));
    } else if (sortBy === "score-asc") {
      filtered.sort((a, b) => (a.overall_score || 0) - (b.overall_score || 0));
    }

    return filtered;
  }, [analyses, searchQuery, sortBy, filterScore]);

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

      {/* Search and Filters */}
      {analyses && analyses.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by brand name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date-desc">Date (Newest first)</SelectItem>
                  <SelectItem value="date-asc">Date (Oldest first)</SelectItem>
                  <SelectItem value="score-desc">Score (High to Low)</SelectItem>
                  <SelectItem value="score-asc">Score (Low to High)</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterScore} onValueChange={setFilterScore}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by score" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Scores</SelectItem>
                  <SelectItem value="high">High (70+)</SelectItem>
                  <SelectItem value="medium">Medium (40-69)</SelectItem>
                  <SelectItem value="low">Low (&lt;40)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}

      {filteredAnalyses && filteredAnalyses.length > 0 ? (
        <div className="grid gap-6">
          {filteredAnalyses.map((analysis) => (
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
