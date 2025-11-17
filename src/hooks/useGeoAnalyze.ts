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
  console.log("🔍 Attempting Railway API call:", {
    url: "https://annoris-production.up.railway.app/analyze",
    method: "POST",
    body: { brandName },
  });

  try {
    const response = await fetch("https://annoris-production.up.railway.app/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ brandName }),
    });

    console.log("📡 Railway response status:", response.status);
    console.log("📡 Railway response headers:", Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Railway API error:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });
      throw new Error(`Railway API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("✅ Railway API success:", data);
    return data;
  } catch (error) {
    console.error("❌ Railway API request failed:", error);
    throw error;
  }
};

export const useGeoAnalyze = () => {
  return useMutation({
    mutationFn: (request: GeoAnalysisRequest) => analyzeBrand(request.brandName),
  });
};
