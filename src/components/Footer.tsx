import { Github, Mail, Rss } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/30 mt-16">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div>
            <p>© 2024 Your Name. Built with ❤️ and curiosity.</p>
          </div>
          
          <div className="flex items-center space-x-6">
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
              <span>Email</span>
            </a>
            
            <a
              href="/rss.xml"
              className="flex items-center space-x-2 hover:text-foreground transition-colors"
            >
              <Rss size={16} />
              <span>RSS</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;