import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

const capabilities = [
  "Unified learning management system",
  "Real-time collaboration tools",
  "Automated grading and assessments",
  "Parent and guardian portals",
  "Mobile-responsive design",
  "Custom reporting dashboards",
];

const Platform = () => {
  return (
    <section className="py-24 lg:py-36 relative overflow-hidden">
      {/* Background mesh */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/8 to-violet-500/5 blur-3xl" />
        <div className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-accent/6 to-emerald-400/4 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-primary bg-primary/10 px-4 py-1.5 rounded-full">
              Platform Capabilities
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Built for Schools That
              <span className="block text-gradient-hero mt-1">Think Beyond Today</span>
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Education evolves. Your platform should too. Our integrated ecosystem grows with your institution, adapting to new challenges while keeping what matters most at the center: exceptional learning experiences.
            </p>
            
            <ul className="space-y-4">
              {capabilities.map((capability, index) => (
                <li key={index} className="flex items-start gap-3 group">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-accent to-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm shadow-accent/20 group-hover:scale-110 transition-transform duration-200">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-foreground text-lg group-hover:text-primary transition-colors duration-200">{capability}</span>
                </li>
              ))}
            </ul>
            
            <Button size="lg" className="rounded-xl text-base px-8 bg-gradient-to-r from-primary to-violet-600 hover:from-primary/90 hover:to-violet-600/90 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] transition-all duration-300">
              Explore Features
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          
          <div className="relative">
            {/* Video card with glassmorphism */}
            <div className="absolute inset-8 bg-gradient-to-br from-primary/20 to-violet-500/15 rounded-3xl blur-2xl" />
            <div className="relative aspect-video bg-gradient-to-br from-primary via-violet-600 to-accent rounded-3xl shadow-2xl shadow-primary/20 flex items-center justify-center overflow-hidden">
              {/* Grid overlay */}
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              
              <div className="text-center text-white space-y-5 p-8 relative z-10">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-300 cursor-pointer shadow-lg shadow-black/10">
                  <svg className="w-10 h-10 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
                <p className="text-lg font-semibold">Watch Platform Demo</p>
                <p className="text-sm text-white/80">See how it all works together</p>
              </div>
            </div>
            
            {/* Decorative orbs */}
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-accent rounded-full opacity-15 blur-3xl animate-pulse-glow" />
            <div className="absolute -top-8 -left-8 w-40 h-40 bg-primary rounded-full opacity-15 blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Platform;
