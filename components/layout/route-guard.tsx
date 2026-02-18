"use client";

import { useAuthStore } from "@/stores/auth-store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { getSession } from "@/lib/auth";

type RouteGuardProps = {
  children: React.ReactNode;
};

export function RouteGuard({ children }: RouteGuardProps) {
  const router = useRouter();
  const { session, setSession } = useAuthStore();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const existing = getSession();
    if (existing) {
      setSession(existing);
      setChecking(false);
      return;
    }
    setChecking(false);
    router.replace("/auth/login");
  }, [router, setSession]);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="glass flex items-center gap-3 px-6 py-4">
          <Loader2 className="h-5 w-5 animate-spin text-indigo-400" />
          <p className="text-sm text-slate-200">Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  return <>{children}</>;
}
