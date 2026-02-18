"use client";

import { logoutUser } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";
import { Flame, LogOut, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/dashboard", label: "Bosh sahifa" },
  { href: "/settings", label: "Sozlamalar" },
];

export function DashboardNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { session, logout } = useAuthStore();
  const [mounted] = useState(() => typeof window !== "undefined");

  const handleLogout = () => {
    logoutUser();
    logout();
    router.replace("/auth/login");
  };

  return (
    <header className="sticky top-0 z-20 backdrop-blur-xl bg-slate-950/70 border-b border-white/5">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-slate-50 shadow-glow">
            <Flame className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">UMD Auth</p>
            <p className="text-lg font-semibold text-slate-50">Premium demo</p>
          </div>
        </Link>

        <nav className="flex items-center gap-2 text-sm font-medium">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-3 py-2 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60",
                pathname === link.href ? "bg-white/10 text-white shadow-glow" : "text-slate-300"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="Tema almashtirish"
            className="glass inline-flex h-11 w-11 items-center justify-center rounded-full transition hover:shadow-glow glow-ring"
          >
            {mounted && theme === "light" ? (
              <Moon className="h-5 w-5 text-slate-900" />
            ) : (
              <Sun className="h-5 w-5 text-amber-300" />
            )}
          </button>

          <div className="hidden text-right sm:block">
            <p className="text-xs text-slate-400">Xush kelibsiz</p>
            <p className="text-sm font-semibold text-slate-50">{session?.fullName ?? "Foydalanuvchi"}</p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="group glass flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-slate-50 transition hover:shadow-glow glow-ring"
          >
            <LogOut className="h-4 w-4 transition group-hover:-translate-x-0.5" />
            <span>Chiqish</span>
          </button>
        </div>
      </div>
    </header>
  );
}
