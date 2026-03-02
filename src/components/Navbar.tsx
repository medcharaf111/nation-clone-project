import { Button } from "@/components/ui/button";
import { ChevronDown, Menu } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-18 items-center justify-between">
          <div className="flex items-center gap-10">
            <a href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-shadow duration-300">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                Edu<span className="text-gradient">Learn</span>
              </span>
            </a>
            
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList className="gap-1">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-muted/60 data-[state=open]:bg-muted/60 rounded-xl transition-colors">Platform</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[420px] gap-2 p-4">
                      <li>
                        <NavigationMenuLink asChild>
                          <a href="#" className="block select-none space-y-1 rounded-xl p-4 leading-none no-underline outline-none transition-all hover:bg-primary/5 hover:shadow-sm group">
                            <div className="text-sm font-semibold leading-none group-hover:text-primary transition-colors">Learning Management</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1.5">
                              Comprehensive tools for course creation and delivery
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a href="#" className="block select-none space-y-1 rounded-xl p-4 leading-none no-underline outline-none transition-all hover:bg-primary/5 hover:shadow-sm group">
                            <div className="text-sm font-semibold leading-none group-hover:text-primary transition-colors">Student Portal</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1.5">
                              Engaging interface for students to access content
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-muted/60 data-[state=open]:bg-muted/60 rounded-xl transition-colors">Solutions</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[420px] gap-2 p-4">
                      <li>
                        <NavigationMenuLink asChild>
                          <a href="#" className="block select-none space-y-1 rounded-xl p-4 leading-none no-underline outline-none transition-all hover:bg-primary/5 hover:shadow-sm group">
                            <div className="text-sm font-semibold leading-none group-hover:text-primary transition-colors">For Schools</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1.5">
                              Complete education management solutions
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a href="#" className="block select-none space-y-1 rounded-xl p-4 leading-none no-underline outline-none transition-all hover:bg-primary/5 hover:shadow-sm group">
                            <div className="text-sm font-semibold leading-none group-hover:text-primary transition-colors">For Universities</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1.5">
                              Scalable platforms for higher education
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <a href="#pricing" className="group inline-flex h-10 w-max items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition-all hover:bg-muted/60">
                    Pricing
                  </a>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <a href="#about" className="group inline-flex h-10 w-max items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition-all hover:bg-muted/60">
                    About
                  </a>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="hidden md:inline-flex rounded-xl hover:bg-muted/60">
              Login
            </Button>
            <Button size="lg" className="rounded-xl bg-gradient-to-r from-primary to-violet-600 hover:from-primary/90 hover:to-violet-600/90 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300">
              Request Demo
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden rounded-xl">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
