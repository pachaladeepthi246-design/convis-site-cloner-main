"use client";
import { Menu } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useActiveSection } from "../../hooks/use-active-section";
import { cn } from "../../lib/utils";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { name: "Home", id: "home", path: "/" },
  { name: "Features", id: "features", path: "/#features" },
  { name: "Pricing", id: "pricing", path: "/#pricing" },
  { name: "Blog", id: "blog", path: "/blog" },
  { name: "Contact", id: "contact", path: "/contact" },
];

const sectionIds = navItems.filter(item => item.path.startsWith("/#")).map(item => item.id);

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const activeSection = useActiveSection(sectionIds);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    setIsMenuOpen(false);
    if (path.startsWith("/#")) {
      e.preventDefault();
      const id = path.substring(2);
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getLinkClassName = (item: typeof navItems[0]) => {
    const isActive = isHomePage 
      ? activeSection === item.id 
      : location.pathname === item.path || (item.path === "/blog" && location.pathname.startsWith("/blog/"));
      
    return cn(
      "transition-colors hover:text-white",
      isActive ? "text-white font-semibold" : "text-white/70"
    );
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled || !isHomePage ? "bg-slate-900/80 backdrop-blur-lg shadow-lg" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/clyrox.jpg"
            alt="Logo"
            className="h-8 w-8 rounded-lg object-cover"
          />
          <span className="text-xl font-bold text-white">Clyrox</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              onClick={(e) => handleNavClick(e, item.path)}
              className={getLinkClassName(item)}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-4 md:flex">
          <a href="#" className="text-white/70 hover:text-white">
            Log in
          </a>
          <a
            href="#"
            className="rounded-md bg-white px-4 py-2 text-slate-900"
          >
            Sign up
          </a>
        </div>
        <div className="flex items-center md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="container mx-auto mt-2 rounded-lg bg-slate-800/90 p-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={(e) => handleNavClick(e, item.path)}
                className="rounded-md p-2 text-white/80 hover:bg-slate-700 hover:text-white"
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-4 border-t border-slate-700 pt-4">
              <a href="#" className="rounded-md p-2 text-white/80 hover:bg-slate-700 hover:text-white">
                Log in
              </a>
              <a
                href="#"
                className="rounded-md bg-white px-4 py-2 text-center text-slate-900"
              >
                Sign up
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};