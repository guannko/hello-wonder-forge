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

    // Get user from auth header
    const authHeader = req.headers.get('Authorization');
    let userId = null;
    let supabaseClient = null;

    if (authHeader) {
      supabaseClient = createClient(
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
        userId = user.id;

        // Check rate limit: 10 analyses per hour
        const { data: rateLimitCheck, error: rateLimitError } = await supabaseClient
          .rpc('check_rate_limit', {
            _user_id: userId,
            _action: 'analyze_brand',
            _max_requests: 10,
            _window_minutes: 60
          });

        if (rateLimitError) {
          console.error('Rate limit check error:', rateLimitError);
        }

        if (rateLimitCheck === false) {
          return new Response(
            JSON.stringify({ 
              error: 'Rate limit exceeded. You can only perform 10 analyses per hour.' 
            }),
            {
              status: 429,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          );
        }

        // Check cache
        const { data: cachedData } = await supabaseClient
          .from('analyses_cache')
          .select('cache_data')
          .eq('brand_name', brandName.trim().toLowerCase())
          .gt('expires_at', new Date().toISOString())
          .maybeSingle();

        if (cachedData?.cache_data) {
          console.log('Returning cached analysis for:', brandName);
          return new Response(JSON.stringify(cachedData.cache_data), {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
      }
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

    // Cache the result for authenticated users
    if (userId && supabaseClient) {
      await supabaseClient
        .from('analyses_cache')
        .upsert({
          brand_name: brandName.trim().toLowerCase(),
          cache_data: analysisData,
          expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        }, {
          onConflict: 'brand_name'
        });

      // Save to database
      const { error: insertError } = await supabaseClient
        .from('analyses')
        .insert({
          user_id: userId,
          brand_name: brandName.trim(),
          overall_score: analysisData.overall_score || null,
          ai_systems: analysisData.ai_systems || [],
          findings: analysisData.findings || [],
          recommendations: analysisData.recommendations || [],
          status: 'completed',
        });

      if (insertError) {
        console.error('Error saving analysis:', insertError);
      } else {
        console.log('Analysis saved to database');

        // Check if user wants email notifications
        const { data: preferences } = await supabaseClient
          .from('email_preferences')
          .select('analysis_complete')
          .eq('user_id', userId)
          .maybeSingle();

        // Send email if enabled (default is true if no preference set)
        if (!preferences || preferences.analysis_complete !== false) {
          // Get user email for notification
          const { data: profile } = await supabaseClient
            .from('profiles')
            .select('email')
            .eq('id', userId)
            .single();

          // Send completion email notification (fire and forget)
          if (profile?.email) {
            fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/send-email`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': authHeader || '',
              },
              body: JSON.stringify({
                to: profile.email,
                subject: `Your ${brandName} Analysis is Complete!`,
                type: 'analysis_complete',
                data: {
                  brandName: brandName.trim(),
                  overallScore: analysisData.overall_score,
                  completedAt: new Date().toISOString(),
                },
              }),
            }).catch(err => console.error('Email notification failed:', err));
          }
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
