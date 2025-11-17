import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Mail, Twitter, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="text-2xl font-bold">
                <span className="text-background">BRAIN</span>
                <span className="text-brand-orange">INDEX</span>
              </div>
            </div>
            <p className="text-background/70 mb-6 leading-relaxed">
              The leading platform for AI visibility analytics. Track how AI systems 
              see and recommend your brand.
            </p>
            <div className="flex space-x-4">
              <Button size="sm" variant="ghost" className="text-background/70 hover:text-background hover:bg-background/10">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-background/70 hover:text-background hover:bg-background/10">
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-background/70 hover:text-background hover:bg-background/10">
                <Github className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-lg font-semibold text-background mb-4">Product</h4>
            <ul className="space-y-3">
              <li><a href="/#features" className="text-background/70 hover:text-background transition-colors">Features</a></li>
              <li><a href="/#pricing" className="text-background/70 hover:text-background transition-colors">Pricing</a></li>
              <li><a href="/faq" className="text-background/70 hover:text-background transition-colors">FAQ</a></li>
              <li><a href="/contact" className="text-background/70 hover:text-background transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold text-background mb-4">Company</h4>
            <ul className="space-y-3">
              <li><a href="/about" className="text-background/70 hover:text-background transition-colors">About Us</a></li>
              <li><a href="/privacy-policy" className="text-background/70 hover:text-background transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="text-background/70 hover:text-background transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold text-background mb-4">Stay Updated</h4>
            <p className="text-background/70 mb-4">
              Get insights about AI visibility trends and updates.
            </p>
            <div className="flex space-x-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
              />
              <Button size="sm" className="bg-brand-orange hover:bg-brand-orange-light text-white">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <Separator className="bg-background/20 mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-background/70 text-sm">
            © 2025 Brain Index. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="/privacy-policy" className="text-background/70 hover:text-background transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-background/70 hover:text-background transition-colors">
              Terms of Service
            </a>
            <a href="/contact" className="text-background/70 hover:text-background transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;