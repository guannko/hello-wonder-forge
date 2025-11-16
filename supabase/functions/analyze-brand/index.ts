import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { brandName } = await req.json();
    console.log('Analyzing brand:', brandName);

    if (!brandName || brandName.trim().length === 0) {
      throw new Error('Brand name is required');
    }

    // Call Railway API
    const apiResponse = await fetch('https://primary-production-636cc.up.railway.app/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ brand_name: brandName.trim() }),
    });

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      console.error('Railway API error:', errorText);
      throw new Error(`API request failed: ${apiResponse.status} ${errorText}`);
    }

    const analysisData = await apiResponse.json();
    console.log('Analysis completed:', analysisData);

    // Get user from auth header
    const authHeader = req.headers.get('Authorization');
    if (authHeader) {
      const supabaseClient = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_ANON_KEY') ?? '',
        {
          global: {
            headers: { Authorization: authHeader },
          },
        }
      );

      const { data: { user } } = await supabaseClient.auth.getUser();

      if (user) {
        // Save to database
        const { error: insertError } = await supabaseClient
          .from('analyses')
          .insert({
            user_id: user.id,
            brand_name: brandName.trim(),
            overall_score: analysisData.overall_score || null,
            ai_systems: analysisData.ai_systems || [],
            findings: analysisData.findings || [],
            recommendations: analysisData.recommendations || [],
            status: 'completed',
          });

        if (insertError) {
          console.error('Error saving analysis:', insertError);
          // Don't throw - still return the analysis even if save fails
        } else {
          console.log('Analysis saved to database');
        }
      }
    }

    return new Response(JSON.stringify(analysisData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in analyze-brand function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        details: 'Failed to analyze brand. Please try again.' 
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
