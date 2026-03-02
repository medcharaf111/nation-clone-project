import { BookOpen, Users, BarChart3, Shield, Cloud, Zap } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Comprehensive Learning Management",
    description: "Create, organize, and deliver engaging courses with powerful tools for educators and administrators.",
    gradient: "from-blue-500 to-violet-600",
    shadowColor: "shadow-blue-500/20",
  },
  {
    icon: Users,
    title: "Student-Centered Experience",
    description: "Intuitive interface that keeps students engaged and connected to their learning journey.",
    gradient: "from-violet-500 to-purple-600",
    shadowColor: "shadow-violet-500/20",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Data-driven insights to track progress, identify trends, and improve educational outcomes.",
    gradient: "from-emerald-500 to-teal-600",
    shadowColor: "shadow-emerald-500/20",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level security with role-based access control and data encryption to protect sensitive information.",
    gradient: "from-amber-500 to-orange-600",
    shadowColor: "shadow-amber-500/20",
  },
  {
    icon: Cloud,
    title: "Cloud-Based Platform",
    description: "Access from anywhere, on any device. Automatic updates and 99.9% uptime guarantee.",
    gradient: "from-sky-500 to-blue-600",
    shadowColor: "shadow-sky-500/20",
  },
  {
    icon: Zap,
    title: "Seamless Integration",
    description: "Connect with your existing tools and systems through our powerful API and integrations.",
    gradient: "from-rose-500 to-pink-600",
    shadowColor: "shadow-rose-500/20",
  },
];

const Features = () => {
  return (
    <section className="py-24 lg:py-36 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-5">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-primary bg-primary/10 px-4 py-1.5 rounded-full">
            Powerful Features
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Everything You Need to
            <span className="block text-gradient-hero mt-2">Shape the Future</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A complete ecosystem designed for modern education. Streamline operations, enhance learning experiences, and drive better outcomes.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative glass-strong rounded-2xl p-7 hover:shadow-xl ${feature.shadowColor} transition-all duration-500 hover:-translate-y-1 animate-fade-up stagger-${index + 1}`}
            >
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/[0.02] to-accent/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative space-y-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg ${feature.shadowColor} group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
