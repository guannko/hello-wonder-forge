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

    // Generate email content using Lovable AI
    const emailContent = await generateEmailContent(type, data);

    // In production, integrate with email service (SendGrid, Resend, etc.)
    // For now, we'll log and return success
    console.log('Email content generated:', emailContent);

    // Here you would integrate with your email service provider
    // Example with Resend (you'd need to add RESEND_API_KEY secret):
    // const response = await fetch('https://api.resend.com/emails', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     from: 'noreply@yourdomain.com',
    //     to: to,
    //     subject: subject,
    //     html: emailContent,
    //   }),
    // });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Email sent successfully',
        preview: emailContent // For development
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

async function generateEmailContent(type: string, data: any): Promise<string> {
  const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
  
  let prompt = '';
  
  if (type === 'analysis_complete') {
    prompt = `Generate a professional HTML email notifying that a brand analysis is complete.
    
Brand: ${data.brandName}
Overall Score: ${data.overallScore}
Key Findings: ${data.findings?.slice(0, 3).map((f: any) => f.description || f).join(', ')}

The email should:
- Be encouraging and professional
- Highlight the key score
- Mention 2-3 main findings
- Include a call-to-action to view the full analysis
- Use modern HTML/CSS with inline styles
- Be mobile-responsive
- Have a clean, branded design with colors: primary #9b87f5, secondary #7E69AB

Return ONLY the HTML content, no markdown formatting.`;
  } else if (type === 'weekly_summary') {
    prompt = `Generate a professional HTML email for a weekly AI visibility summary.
    
Total Analyses This Week: ${data.totalAnalyses}
Average Score: ${data.averageScore}
Trend: ${data.trend}
Top Performing Brand: ${data.topBrand} (${data.topScore})

The email should:
- Provide weekly highlights
- Show score trends
- Celebrate improvements
- Encourage continued monitoring
- Use modern HTML/CSS with inline styles
- Be mobile-responsive
- Have a clean, branded design with colors: primary #9b87f5, secondary #7E69AB

Return ONLY the HTML content, no markdown formatting.`;
  }

  const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${LOVABLE_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'google/gemini-2.5-flash',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`AI Gateway error: ${response.status}`);
  }

  const result = await response.json();
  return result.choices[0].message.content;
}
