import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 lg:py-36 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-violet-600 to-primary animate-gradient-shift" />
      
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      
      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-medium" />
      </div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-white/90 bg-white/15 backdrop-blur-sm px-4 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            Start your journey today
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight tracking-tight">
            Ready to Transform
            <span className="block mt-2">Your Institution?</span>
          </h2>
          
          <p className="text-xl text-white/85 leading-relaxed max-w-2xl mx-auto">
            Join hundreds of schools already using our platform to deliver exceptional education. See how we can help you achieve your goals.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Button 
              size="lg" 
              className="rounded-xl text-base px-8 h-13 bg-white text-primary hover:bg-white/90 shadow-xl shadow-black/10 hover:scale-[1.02] transition-all duration-300 font-semibold"
            >
              Request a Demo
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-xl text-base px-8 h-13 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm hover:scale-[1.02] transition-all duration-300 font-semibold"
            >
              Contact Sales
            </Button>
          </div>
          
          <p className="text-white/70 text-sm flex items-center justify-center gap-3">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-accent"/>No credit card required</span>
            <span className="w-1 h-1 rounded-full bg-white/30"/>
            <span>Free 30-day trial</span>
            <span className="w-1 h-1 rounded-full bg-white/30"/>
            <span>Setup in minutes</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
