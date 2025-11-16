import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Search, Trash2, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminAnalyses() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const { data: analyses, isLoading } = useQuery({
    queryKey: ["admin-analyses", searchQuery, statusFilter],
    queryFn: async () => {
      let query = supabase
        .from("analyses")
        .select("*")
        .order("created_at", { ascending: false });

      if (searchQuery) {
        query = query.ilike("brand_name", `%${searchQuery}%`);
      }

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter);
      }

      const { data: analysesData, error: analysesError } = await query;

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

  const deleteMutation = useMutation({
    mutationFn: async (ids: string[]) => {
      const { error } = await supabase
        .from("analyses")
        .delete()
        .in("id", ids);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-analyses"] });
      setSelectedIds(new Set());
      toast({
        title: "Analyses deleted",
        description: `${selectedIds.size} analyses have been removed.`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error deleting analyses",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const toggleSelection = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === analyses?.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(analyses?.map(a => a.id)));
    }
  };

  const handleBulkDelete = () => {
    if (selectedIds.size === 0) return;
    if (confirm(`Are you sure you want to delete ${selectedIds.size} analyses?`)) {
      deleteMutation.mutate(Array.from(selectedIds));
    }
  };

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
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by brand name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {selectedIds.size > 0 && (
            <div className="flex items-center gap-4 mt-4 p-4 bg-muted rounded-lg">
              <span className="text-sm font-medium">
                {selectedIds.size} selected
              </span>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleBulkDelete}
                disabled={deleteMutation.isPending}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Selected
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedIds.size === analyses?.length && analyses.length > 0}
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
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
                    <TableCell>
                      <Checkbox
                        checked={selectedIds.has(analysis.id)}
                        onCheckedChange={() => toggleSelection(analysis.id)}
                      />
                    </TableCell>
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
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
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
