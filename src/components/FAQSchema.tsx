import { Helmet } from "react-helmet-async";

export default function FAQSchema() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is AI Visibility Tracking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AI Visibility Tracking monitors how your brand appears across major AI platforms like ChatGPT, Claude, Gemini, Perplexity, and Grok. It provides visibility scores (1-100) and actionable insights to improve your brand's presence in AI-generated responses."
        }
      },
      {
        "@type": "Question",
        "name": "Which AI systems do you monitor?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We monitor 5+ major AI systems including ChatGPT, Claude, Perplexity, Gemini, and Grok. Our platform provides real-time analysis of how each system perceives and presents your brand."
        }
      },
      {
        "@type": "Question",
        "name": "What is GEO (Generative Engine Optimization)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "GEO (Generative Engine Optimization) is the practice of optimizing your online presence to improve how AI systems understand and reference your brand. It's similar to SEO but focused on AI-generated content and responses."
        }
      },
      {
        "@type": "Question",
        "name": "How long does an analysis take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A complete brand analysis typically takes 30-60 seconds. Our AI systems check multiple platforms simultaneously and provide comprehensive visibility scores, competitor comparisons, and actionable recommendations."
        }
      },
      {
        "@type": "Question",
        "name": "Can I track my competitors?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Pro and Enterprise plans include competitor tracking features. You can monitor how your competitors appear across AI systems and compare their visibility scores with yours."
        }
      },
      {
        "@type": "Question",
        "name": "What kind of insights do I get?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You receive detailed visibility scores (1-100) for each AI system, competitor comparisons, specific findings about how AI perceives your brand, and actionable GEO recommendations to improve your AI presence."
        }
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </Helmet>
  );
}
