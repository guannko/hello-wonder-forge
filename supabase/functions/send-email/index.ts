import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EmailRequest {
  to: string;
  subject: string;
  type: 'analysis_complete' | 'weekly_summary';
  data: any;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, subject, type, data } = await req.json() as EmailRequest;
    console.log('Sending email:', { to, subject, type });

    // Generate email content
    const emailContent = generateEmailHTML(type, data);

    // TODO: Configure RESEND_API_KEY in project secrets
    // Instructions:
    // 1. Go to https://resend.com and sign up
    // 2. Create API key at https://resend.com/api-keys
    // 3. Add RESEND_API_KEY secret to this project
    // 4. Verify your domain at https://resend.com/domains
    
    // Once RESEND_API_KEY is configured, uncomment the code below:
    
    /*
    const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
    
    const emailResponse = await resend.emails.send({
      from: 'AI Visibility Tracker <onboarding@resend.dev>', // Update with your verified domain
      to: [to],
      subject: subject,
      html: emailContent,
    });

    console.log('Email sent successfully via Resend:', emailResponse);
    
    return new Response(JSON.stringify({ success: true, id: emailResponse.id }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
    */

    // Temporary: Log email instead of sending
    console.log('Email preview (configure RESEND_API_KEY to send):', {
      to,
      subject,
      contentLength: emailContent.length
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Email logged (configure RESEND_API_KEY to send actual emails)',
        preview: emailContent.substring(0, 200) + '...'
      }), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Failed to send email' 
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

function generateEmailHTML(type: string, data: any): string {
  if (type === 'analysis_complete') {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .score { font-size: 48px; font-weight: bold; color: #667eea; text-align: center; margin: 20px 0; }
            .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin-top: 20px; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✨ Your AI Analysis is Ready!</h1>
            </div>
            <div class="content">
              <h2>Analysis Complete: ${data.brandName}</h2>
              <p>We've finished analyzing your brand's AI visibility across major platforms.</p>
              
              <div class="score">
                ${data.overallScore || 'N/A'}/100
              </div>
              
              <p>Your overall AI visibility score shows how well your brand appears in AI-powered search results and recommendations.</p>
              
              <center>
                <a href="https://your-app-url.com/dashboard" class="button">
                  View Full Analysis
                </a>
              </center>
              
              <p style="margin-top: 30px; color: #666;">
                Completed at: ${new Date(data.completedAt).toLocaleString()}
              </p>
            </div>
            <div class="footer">
              <p>You're receiving this email because you requested an AI visibility analysis.</p>
              <p>Manage your email preferences in your dashboard settings.</p>
            </div>
          </div>
        </body>
      </html>
    `;
  } else if (type === 'weekly_summary') {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .stat-box { background: white; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #667eea; }
            .stat-number { font-size: 32px; font-weight: bold; color: #667eea; }
            .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin-top: 20px; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📊 Your Weekly AI Visibility Report</h1>
            </div>
            <div class="content">
              <h2>Here's what happened this week</h2>
              
              <div class="stat-box">
                <div class="stat-number">${data.totalAnalyses}</div>
                <p>Total Analyses Completed</p>
              </div>
              
              <div class="stat-box">
                <div class="stat-number">${data.averageScore?.toFixed(1) || 'N/A'}</div>
                <p>Average Visibility Score</p>
              </div>
              
              ${data.topAnalysis ? `
              <div class="stat-box">
                <h3>🏆 Top Performing Brand</h3>
                <p><strong>${data.topAnalysis.brand_name}</strong></p>
                <p>Score: ${data.topAnalysis.overall_score}/100</p>
              </div>
              ` : ''}
              
              <center>
                <a href="https://your-app-url.com/dashboard/my-analyses" class="button">
                  View All Analyses
                </a>
              </center>
            </div>
            <div class="footer">
              <p>You're receiving this weekly summary because you opted in to notifications.</p>
              <p>Manage your email preferences in your dashboard settings.</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  return '<p>Email content not available</p>';
}
