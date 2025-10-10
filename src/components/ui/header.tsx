"use client";
import { Menu } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useActiveSection } from "../../hooks/use-active-section";
import { cn } from "../../lib/utils";

const navItems = [
  { name: "Home", id: "home" },
  { name: "Features", id: "features" },
  { name: "How It Works", id: "how-it-works" },
  { name: "Testimonials", id: "testimonials" },
  { name: "Pricing", id: "pricing" },
  { name: "FAQ", id: "faq" },
];

const sectionIds = navItems.map(item => item.id);

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-slate-900/80 backdrop-blur-lg shadow-lg" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <img
            src="/clyrox.jpg"
            alt="Logo"
            className="h-8 w-8 rounded-lg object-cover"
          />
          <span className="text-xl font-bold text-white">Clyrox</span>
        </div>
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={cn(
                "transition-colors hover:text-white",
                activeSection === item.id ? "text-white font-semibold" : "text-white/70"
              )}
            >
              {item.name}
            </a>
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
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className="rounded-md p-2 text-white/80 hover:bg-slate-700 hover:text-white"
              >
                {item.name}
              </a>
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