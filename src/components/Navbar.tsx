import { Link, useLocation } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { navCategories } from "@/data/categories";

const Navbar = () => {
  const location = useLocation();
  const { resolvedTheme, setTheme } = useTheme();

  const navLinks = [
    { name: "All", path: "/blog" },
    ...navCategories.map((c) => ({
      name: c.navLabel ?? c.label,
      path: `/category/${c.id}`,
    })),
    { name: "Books", path: "/books" },
    { name: "Architecture", path: "/architecture" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="p-4">
      <div className="flex items-start justify-between gap-4">
        <nav className="flex flex-wrap items-center gap-x-4 gap-y-2">
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
        </nav>
        <button
          type="button"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className="shrink-0 border border-border p-2 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} theme`}
          title={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} theme`}
        >
          <Sun className="hidden h-4 w-4 dark:block" aria-hidden="true" />
          <Moon className="h-4 w-4 dark:hidden" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;