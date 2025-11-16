import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AnalyzeResult {
  brand_name: string;
  overall_score?: number;
  ai_systems?: any[];
  findings?: any[];
  recommendations?: any[];
}

export function useAnalyzeBrand() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (brandName: string): Promise<AnalyzeResult> => {
      const { data, error } = await supabase.functions.invoke("analyze-brand", {
        body: { brandName },
      });

      if (error) {
        console.error("Error calling analyze-brand:", error);
        throw new Error(error.message || "Failed to analyze brand");
      }

      if (!data) {
        throw new Error("No data received from analysis");
      }

      return data;
    },
    onError: (error: Error) => {
      toast({
        title: "Analysis Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
