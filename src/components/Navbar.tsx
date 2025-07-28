import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  
  const navLinks = [
    { name: "All Blogs", path: "/" },
    { name: "Math", path: "/category/math" },
    { name: "Music", path: "/category/music" },
    { name: "Tech", path: "/category/tech" },
    { name: "Misc", path: "/category/misc" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-xl font-bold text-primary hover:text-primary/80 transition-colors"
          >
            ~/blog
          </Link>
          
          <div className="flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm transition-all duration-200 hover:text-primary ${
                  isActive(link.path)
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;