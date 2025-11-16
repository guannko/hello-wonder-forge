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
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get all users with analyses from the last week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const { data: recentAnalyses, error } = await supabaseClient
      .from('analyses')
      .select('user_id, overall_score, brand_name, created_at')
      .gte('created_at', oneWeekAgo.toISOString());

    if (error) throw error;

    // Group by user
    const userAnalyses = recentAnalyses.reduce((acc: any, analysis) => {
      if (!acc[analysis.user_id]) {
        acc[analysis.user_id] = [];
      }
      acc[analysis.user_id].push(analysis);
      return acc;
    }, {});

    // Send summary to each user
    const results = [];
    for (const [userId, analyses] of Object.entries(userAnalyses)) {
      const userAnalysesArray = analyses as any[];
      
      // Get user profile
      const { data: profile } = await supabaseClient
        .from('profiles')
        .select('email')
        .eq('id', userId)
        .single();

      if (!profile?.email) continue;

      // Calculate stats
      const totalAnalyses = userAnalysesArray.length;
      const averageScore = userAnalysesArray.reduce((sum, a) => sum + (a.overall_score || 0), 0) / totalAnalyses;
      const topAnalysis = userAnalysesArray.sort((a, b) => (b.overall_score || 0) - (a.overall_score || 0))[0];

      // Send email
      const emailResponse = await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}`,
        },
        body: JSON.stringify({
          to: profile.email,
          subject: 'Your Weekly AI Visibility Summary',
          type: 'weekly_summary',
          data: {
            totalAnalyses,
            averageScore: averageScore.toFixed(1),
            trend: 'stable', // You could calculate actual trend
            topBrand: topAnalysis.brand_name,
            topScore: topAnalysis.overall_score,
          },
        }),
      });

      results.push({
        userId,
        email: profile.email,
        sent: emailResponse.ok,
      });
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        summariesSent: results.length,
        results,
      }), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error sending weekly summaries:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Failed to send summaries' 
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
