import { Link } from "react-router-dom";
import BlogLayout from "@/components/BlogLayout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Mail } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";

const Index = () => {
  return (
    <BlogLayout>
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          {/* Profile Photo */}
          <div className="mb-8">
            <img 
              src={profilePhoto} 
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto blog-shadow object-cover"
            />
          </div>

          {/* Intro */}
          <h1 className="text-4xl font-bold text-foreground mb-6">
            Hi, I'm [Your Name]
          </h1>
          
          <div className="max-w-2xl mx-auto space-y-4 text-lg text-muted-foreground leading-relaxed">
            <p>
              I'm a mathematician, programmer, and occasional musician who finds beauty 
              in the intersection of logic and creativity.
            </p>
            <p>
              This is where I share thoughts on algorithms, musical patterns, 
              mathematical insights, and the random ideas that emerge from 
              late-night coding sessions.
            </p>
          </div>
        </div>

        {/* Purpose Section */}
        <div className="bg-card border border-border rounded-lg p-8 blog-shadow mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-4 text-center">
            Why This Blog Exists
          </h2>
          <div className="max-w-2xl mx-auto text-muted-foreground space-y-4">
            <p>
              Too often, technical knowledge gets trapped in academic papers or 
              buried in documentation. I believe in making complex ideas accessible 
              without dumbing them down.
            </p>
            <p>
              Whether it's explaining Fourier transforms through intuition, 
              exploring the mathematics behind jazz harmony, or documenting 
              the lessons learned from building software—this space is for 
              curious minds who appreciate both rigor and clarity.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-6">
          <Link to="/blog">
            <Button size="lg" className="px-8">
              Read My Thoughts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          
          <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-foreground transition-colors"
            >
              <Github size={16} />
              <span>GitHub</span>
            </a>
            
            <a
              href="mailto:your.email@example.com"
              className="flex items-center space-x-2 hover:text-foreground transition-colors"
            >
              <Mail size={16} />
              <span>Get in touch</span>
            </a>
          </div>
        </div>
      </div>
    </BlogLayout>
  );
};

export default Index;
