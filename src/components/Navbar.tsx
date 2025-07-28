import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { name: "Blogs", path: "/blog" },
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
    <header className="p-4">
      <div className="flex items-center justify-between">

        <div className="flex items-center space-x-4">
        <Link
          to="/"
          className={`text-lg transition-all duration-200 hover:text-primary ${
                isActive("/")
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
        >
          Home
        </Link>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-lg transition-all duration-200 hover:text-primary ${
                isActive(link.path)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;