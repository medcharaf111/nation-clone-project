import { useState } from "react";
import { Sun, Moon } from "lucide-react";
import TermsAgreement from "@/components/TermsAgreement";
import ArabicLanding from "@/components/ArabicLanding";

const Index = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [dark, setDark] = useState(false);

  /* ── Landing page ── */
  if (!showTerms) {
    return (
      <ArabicLanding
        onContinue={() => {
          setShowTerms(true);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    );
  }

  /* ── Terms Agreement (original view) ── */
  return (
    <div className={`min-h-screen mesh-gradient noise-overlay relative overflow-hidden${dark ? " dark" : ""}`}>
      {/* Floating decorative orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-0" aria-hidden>
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/10 blur-3xl animate-float-slow" />
        <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-gradient-to-br from-accent/15 to-emerald-400/10 blur-3xl animate-float-medium" />
        <div className="absolute -bottom-20 left-1/4 w-72 h-72 rounded-full bg-gradient-to-br from-violet-500/10 to-primary/10 blur-3xl animate-pulse-glow" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-white/20">
        <div className="container mx-auto px-4 lg:px-8 flex h-16 items-center justify-between">
          <a href="/" className="flex items-center group">
            <span className="text-xl font-bold tracking-tight text-foreground">
              native<span className="text-gradient">OS</span>
            </span>
          </a>
          <button
            onClick={() => setShowTerms(false)}
            className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-1"
          >
            ← الرجوع للصفحة الرئيسية
          </button>
          <button
            onClick={() => setDark(!dark)}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/50 transition-all duration-200"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 lg:px-8 py-12 lg:py-16 max-w-3xl">
        <div className="animate-fade-up">
          <TermsAgreement />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 glass">
        <div className="container mx-auto px-4 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <span className="text-sm font-semibold text-foreground">nativeOS</span>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} nativeOS. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-4 text-xs">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">الخصوصية</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">الشروط</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
