import { useMutation } from "@tanstack/react-query";

interface GeoAnalysisRequest {
  brandName: string;
}

interface GeoAnalysisResponse {
  chatgpt?: number;
  deepseek?: number;
  mistral?: number;
  grok?: number;
  gemini?: number;
}

const analyzeBrand = async (brandName: string): Promise<GeoAnalysisResponse> => {
  const response = await fetch("https://annoris-production.up.railway.app/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ brandName }),
  });

  if (!response.ok) {
    throw new Error("Failed to analyze brand");
  }

  return response.json();
};

export const useGeoAnalyze = () => {
  return useMutation({
    mutationFn: (request: GeoAnalysisRequest) => analyzeBrand(request.brandName),
  });
};
