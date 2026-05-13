"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/apresentation", label: "Início" },
    { href: "/infoEnterprise", label: "Sobre" },
  ];

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-300",
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border py-3 shadow-lg"
            : "bg-gradient-to-b from-black/60 to-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-16 flex items-center justify-between">
          <Link href="/apresentation" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-white font-black text-xl">IF</span>
            </div>
            <span
              className={cn(
                "text-2xl font-black transition-colors",
                scrolled
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent"
                  : "text-white drop-shadow-lg"
              )}
            >
              Connected
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-medium transition-colors hover:text-primary",
                  scrolled ? "text-foreground" : "text-white/90 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/login">
              <Button
                variant={scrolled ? "ghost" : "ghost"}
                className={cn(
                  "hidden sm:inline-flex",
                  !scrolled && "text-white hover:text-white hover:bg-white/10"
                )}
              >
                Entrar
              </Button>
            </Link>
            <Link href="/register">
              <Button
                className={cn(
                  "hidden md:inline-flex rounded-full px-6",
                  scrolled
                    ? "bg-primary hover:bg-primary/90"
                    : "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/30"
                )}
              >
                Criar Conta
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className={cn("md:hidden", !scrolled && "text-white")}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-all duration-300",
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        <div
          className="absolute inset-0 bg-background/95 backdrop-blur-xl"
          onClick={() => setMobileMenuOpen(false)}
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-semibold text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 mt-6">
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full">Entrar</Button>
            </Link>
            <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full">Criar Conta</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
