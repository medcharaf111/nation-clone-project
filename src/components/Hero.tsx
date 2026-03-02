import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@/assets/hero-illustration.png";

const Hero = () => {
  return (
    <section className="relative overflow-hidden mesh-gradient noise-overlay">
      {/* Animated background orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/15 to-violet-500/10 blur-3xl animate-float-slow" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-accent/12 to-emerald-400/8 blur-3xl animate-float-medium" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-violet-500/5 to-primary/5 blur-3xl animate-pulse-glow" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-24 lg:py-40 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 text-xs font-medium text-primary bg-primary/10 px-4 py-1.5 rounded-full animate-fade-up stagger-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              #1 Education Platform of 2026
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] tracking-tight animate-fade-up stagger-2">
              Transform Education with
              <span className="block text-gradient-hero mt-2">Modern Learning Solutions</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl animate-fade-up stagger-3">
              Empower your institution with an integrated platform that brings teaching, learning, and administration together. Built for schools that embrace innovation and put student success first.
            </p>
            
            <div className="flex flex-wrap gap-4 animate-fade-up stagger-4">
              <Button size="lg" className="rounded-xl text-base px-8 h-13 bg-gradient-to-r from-primary to-violet-600 hover:from-primary/90 hover:to-violet-600/90 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] transition-all duration-300">
                Request a Demo
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-xl text-base px-8 h-13 border-border/60 hover:bg-muted/60 hover:scale-[1.02] transition-all duration-300 group">
                <Play className="w-4 h-4 mr-2 group-hover:text-primary transition-colors" />
                Watch Video
              </Button>
            </div>
            
            {/* Stats */}
            <div className="flex items-center gap-8 pt-4 animate-fade-up stagger-5">
              <div className="text-center">
                <div className="text-3xl font-extrabold text-gradient">500+</div>
                <div className="text-sm text-muted-foreground mt-0.5">Schools</div>
              </div>
              <div className="h-12 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
              <div className="text-center">
                <div className="text-3xl font-extrabold text-gradient">100K+</div>
                <div className="text-sm text-muted-foreground mt-0.5">Students</div>
              </div>
              <div className="h-12 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
              <div className="text-center">
                <div className="text-3xl font-extrabold text-gradient">98%</div>
                <div className="text-sm text-muted-foreground mt-0.5">Satisfaction</div>
              </div>
            </div>
          </div>
          
          <div className="relative animate-fade-up stagger-3">
            {/* Glow behind image */}
            <div className="absolute inset-4 bg-gradient-to-br from-primary/20 via-violet-500/15 to-accent/10 rounded-3xl blur-2xl" />
            <div className="relative glass-strong rounded-3xl p-2 shadow-2xl shadow-primary/10">
              <img 
                src={heroImage} 
                alt="EduLearn Platform Dashboard showing learning management features" 
                className="w-full h-auto rounded-2xl"
              />
            </div>
            {/* Floating accent cards */}
            <div className="absolute -bottom-4 -left-4 glass-strong rounded-2xl px-5 py-3 shadow-xl shadow-black/5 animate-float-slow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-emerald-500 flex items-center justify-center">
                  <span className="text-white text-lg">📈</span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">+47%</div>
                  <div className="text-xs text-muted-foreground">Student engagement</div>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 glass-strong rounded-2xl px-5 py-3 shadow-xl shadow-black/5 animate-float-medium">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center">
                  <span className="text-white text-lg">⭐</span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">4.9/5</div>
                  <div className="text-xs text-muted-foreground">User rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
