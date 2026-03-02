const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-border/50">
      {/* Subtle gradient top edge */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div>
            <h3 className="font-bold text-foreground mb-5 text-sm tracking-wider uppercase">Platform</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">Features</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">Integrations</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">Security</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">Pricing</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-foreground mb-5 text-sm tracking-wider uppercase">Solutions</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">For Schools</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">For Universities</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">For Districts</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">Case Studies</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-foreground mb-5 text-sm tracking-wider uppercase">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">Documentation</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">Help Center</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">Blog</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">Webinars</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-foreground mb-5 text-sm tracking-wider uppercase">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">About Us</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">Careers</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">Contact</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">Partners</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <a href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center shadow-md shadow-primary/20">
              <span className="text-white font-bold text-xs">E</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground">
              Edu<span className="text-gradient">Learn</span>
            </span>
          </a>
          
          <p className="text-sm text-muted-foreground">
            © {currentYear} EduLearn. All rights reserved.
          </p>
          
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
