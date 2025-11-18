import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"></div>
      
      <div className="relative z-10">
        <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-glow">
              <span className="text-primary-foreground font-bold text-lg">C</span>
            </div>
            <span className="font-bold text-xl">CloudApp</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button className="gradient-primary shadow-md hover:shadow-glow transition-smooth">
                Get Started
              </Button>
            </Link>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center space-y-8 mb-16">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Multi-Tenant Cloud Platform
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                Built for Teams
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Manage projects, collaborate with your team, and track tasks across multiple workspaces. 
              A modern SaaS solution designed for efficiency.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="gradient-primary shadow-lg hover:shadow-glow transition-smooth">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-24">
            {[
              { title: "Multi-Tenant Architecture", description: "Secure workspace isolation for teams and organizations" },
              { title: "Real-Time Collaboration", description: "Work together seamlessly with instant updates" },
              { title: "Advanced Task Management", description: "Organize, prioritize, and track work efficiently" },
            ].map((feature, i) => (
              <div key={i} className="glass-card p-6 space-y-3 hover:shadow-md transition-smooth">
                <CheckCircle2 className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
