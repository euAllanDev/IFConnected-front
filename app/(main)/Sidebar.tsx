"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  User,
  MapPin,
  LogOut,
  Bell,
  Calendar,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { User as UserType } from "@/types";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ThemeToggle from "@/components/ThemeToggle";
import { Separator } from "@/components/ui/separator";

const navItems = [
  { href: "/feed", icon: Home, label: "Feed Principal" },
  { href: "/regional", icon: MapPin, label: "Campus & Perto" },
  { href: "/notifications", icon: Bell, label: "Notificações" },
  { href: "/events", icon: Calendar, label: "Eventos" },
];

interface SidebarProps {
  user: UserType | null;
}

export default function Sidebar({ user }: SidebarProps) {
  const { logout } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!user) return null;

  const userId = user?.id;
  const isActive = (href: string) =>
    pathname === href || (href === "/feed" && pathname === "/");

  const NavLink = ({
    href,
    icon: Icon,
    label,
    isMobile = false,
  }: {
    href: string;
    icon: any;
    label: string;
    isMobile?: boolean;
  }) => {
    const active = isActive(href);

    if (isMobile) {
      return (
        <Link
          href={href}
          onClick={() => setMobileMenuOpen(false)}
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
            active
              ? "bg-primary/10 text-primary font-semibold"
              : "text-foreground hover:bg-accent"
          )}
        >
          <Icon size={22} className={cn(active && "text-primary")} />
          <span>{label}</span>
        </Link>
      );
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={href}
            className={cn(
              "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group",
              "hover:bg-accent",
              active
                ? "font-bold text-primary bg-primary/5"
                : "text-foreground font-medium"
            )}
          >
            <Icon
              size={26}
              className={cn(
                "transition-colors",
                active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
              )}
            />
            <span className="hidden xl:inline text-lg">{label}</span>
            {active && (
              <div className="absolute left-0 w-1 h-8 bg-primary rounded-r-full hidden xl:block" />
            )}
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right" className="xl:hidden">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    );
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <TooltipProvider>
        <aside className="w-[275px] hidden md:flex flex-col p-4 fixed h-screen z-20">
          {/* Logo */}
          <div className="p-3 mb-2">
            <Link href="/feed" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="text-white font-black text-xl">IF</span>
              </div>
              <span className="hidden xl:inline font-bold text-2xl bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                Connected
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-1 mt-4">
            {navItems.map((item) => (
              <NavLink key={item.href} {...item} />
            ))}
            <NavLink
              href={userId ? `/profile/${userId}` : "#"}
              icon={User}
              label="Perfil"
            />
          </nav>

          {/* Theme Toggle */}
          <div className="mt-auto pt-4">
            <div className="flex items-center justify-between px-4 mb-4">
              <span className="text-sm text-muted-foreground hidden xl:inline">
                Aparência
              </span>
              <ThemeToggle />
            </div>

            <Separator className="mb-4" />

            {/* User Card */}
            <div className="flex items-center justify-between w-full p-3 rounded-xl hover:bg-accent transition cursor-pointer group">
              <div className="flex items-center gap-3 overflow-hidden">
                <Avatar className="h-10 w-10 ring-2 ring-primary/10">
                  <AvatarImage src={user?.profileImageUrl || undefined} />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {user?.username?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>

                <div className="hidden xl:block overflow-hidden">
                  <p className="font-semibold text-sm truncate">
                    {user?.username || "Usuário"}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    @{user?.email?.split("@")?.[0] || "..."}
                  </p>
                </div>
              </div>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={logout}
                    className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <LogOut size={18} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Sair</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </aside>
      </TooltipProvider>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 glass border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/feed" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <span className="text-white font-black text-sm">IF</span>
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              Connected
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <SheetHeader>
                  <SheetTitle className="text-left flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                      <span className="text-white font-black text-sm">IF</span>
                    </div>
                    Menu
                  </SheetTitle>
                </SheetHeader>

                <div className="mt-6 flex flex-col gap-1">
                  {navItems.map((item) => (
                    <NavLink key={item.href} {...item} isMobile />
                  ))}
                  <NavLink
                    href={userId ? `/profile/${userId}` : "#"}
                    icon={User}
                    label="Perfil"
                    isMobile
                  />
                </div>

                <Separator className="my-4" />

                {/* Mobile User Info */}
                <div className="flex items-center gap-3 px-4 py-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user?.profileImageUrl || undefined} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {user?.username?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">
                      {user?.username}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <Button
                  variant="destructive"
                  className="w-full mt-4"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                >
                  <LogOut size={18} className="mr-2" />
                  Sair da Conta
                </Button>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
