import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import GeoAnalysisModal from "@/components/GeoAnalysisModal";

const CTASection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-20 bg-gradient-hero relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-ai-purple/10 to-ai-cyan/20"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-ai-purple/30 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-ai-cyan/30 rounded-full blur-3xl animate-pulse-glow"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          {/* Header */}
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to See How AI Views Your Brand?
          </h2>
          <p className="text-xl text-white/90 mb-12">
            Join 10,000+ companies tracking their AI visibility
          </p>

          {/* CTA Button */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-strong border border-white/20">
            <div className="text-center">
              <Button
                size="lg"
                onClick={() => setIsModalOpen(true)}
                className="bg-white text-primary hover:bg-white/90 shadow-strong transition-all duration-300 hover:scale-105 h-14 px-8"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Get Free Analysis
              </Button>
              <p className="text-white/70 text-sm mt-4">
                Free analysis • No credit card required • Results in 60 seconds
              </p>
            </div>
          </div>
        </div>
      </div>

      <GeoAnalysisModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </section>
  );
};

export default CTASection;
