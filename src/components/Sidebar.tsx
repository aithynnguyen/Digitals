import { Link, useLocation } from "react-router-dom";
import { Instagram, Linkedin, Github } from "lucide-react";

const navItems = [
  { label: "About", path: "/about" },
  { label: "Cameras", path: "/cameras" },
  { label: "Contact", path: "/contact" },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[var(--sidebar-width)] bg-background z-40 hidden lg:flex flex-col justify-between py-10 px-8 border-r border-border">
      {/* Logo */}
      <div>
        <Link to="/" className="block mb-12">
          <span className="font-mono text-lg tracking-tight">Digitals</span>
          <span className="block font-mono text-[10px] text-muted-foreground tracking-widest uppercase mt-0.5">
            by Aithy Ngoc Nguyen
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-nav-link ${
              location.pathname === item.path ? "active" : ""
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Social */}
      <div className="flex items-center gap-4">
        <a
          href="https://www.instagram.com/aithynnguyen.cam/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Instagram"
        >
          <Instagram size={15} />
        </a>
        <a
          href="https://www.linkedin.com/in/aithy-nguyen"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="LinkedIn"
        >
          <Linkedin size={15} />
        </a>
        <a
          href="https://github.com/aithynnguyen"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="GitHub"
        >
          <Github size={15} />
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
