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

interface JobResponse {
  jobId: string;
  status: string;
  input: string;
  tier: string;
}

interface ResultResponse {
  jobId: string;
  status: "pending" | "processing" | "completed" | "failed";
  result?: {
    chatgpt?: number;
    deepseek?: number;
    mistral?: number;
    grok?: number;
    gemini?: number;
    score?: number;
    brandName?: string;
  };
  error?: string;
}

const BASE_URL = "https://annoris-production.up.railway.app";

const pollResults = async (jobId: string, maxAttempts = 30): Promise<GeoAnalysisResponse> => {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const response = await fetch(`${BASE_URL}/api/analyzer/results/${jobId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch results: ${response.status}`);
    }

    const data: ResultResponse = await response.json();
    console.log(`📊 Poll attempt ${attempt + 1}:`, data.status);

    if (data.status === "completed" && data.result) {
      console.log("✅ Analysis completed:", data.result);
      return {
        chatgpt: data.result.chatgpt,
        deepseek: data.result.deepseek,
        mistral: data.result.mistral,
        grok: data.result.grok,
        gemini: data.result.gemini,
      };
    }

    if (data.status === "failed") {
      throw new Error(data.error || "Analysis failed");
    }

    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  throw new Error("Analysis timeout");
};

const analyzeBrand = async (brandName: string): Promise<GeoAnalysisResponse> => {
  console.log("🔍 Starting GEO analysis for:", brandName);

  const response = await fetch(`${BASE_URL}/api/analyzer/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      input: brandName,
      tier: "free",
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("❌ Job creation failed:", response.status, errorText);
    throw new Error(`Failed to start analysis: ${response.status}`);
  }

  const jobData: JobResponse = await response.json();
  console.log("✅ Job created:", jobData.jobId);

  return pollResults(jobData.jobId);
};

export const useGeoAnalyze = () => {
  return useMutation({
    mutationFn: (request: GeoAnalysisRequest) => analyzeBrand(request.brandName),
  });
};
