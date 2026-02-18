"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { formatDate } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";
import { getUsers, logoutUser } from "@/lib/auth";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Clock3,
  KeyRound,
  Shield,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const activities = [
  { title: "Kirish muvaffaqiyatli", time: "Bugun, 10:24", status: "Ok" },
  { title: "Parol o'zgartirish so'rovi", time: "Kecha, 21:03", status: "Yangi" },
  { title: "Profil ma'lumotlari yangilandi", time: "15 fevral", status: "Ok" },
];

export function DashboardScreen() {
  const { session, logout } = useAuthStore();
  const router = useRouter();
  const [createdAt, setCreatedAt] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !session) return;
    const user = getUsers().find((u) => u.id === session.userId);
    setCreatedAt(user?.createdAt ?? null);
  }, [session]);

  const handleLogout = () => {
    logoutUser();
    logout();
    router.replace("/auth/login");
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="glass relative overflow-hidden rounded-3xl border border-white/10 p-6 md:p-8"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/15 via-purple-500/10 to-cyan-400/15 opacity-70" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-indigo-100/80">Dashboard</p>
            <h1 className="text-3xl font-bold text-white md:text-4xl">
              Salom, {session?.fullName ?? "Foydalanuvchi"}
            </h1>
            <p className="text-sm text-slate-200/80">
              Email: <span className="text-white">{session?.email}</span>
            </p>
            <p className="text-sm text-slate-200/80">
              Ro&apos;yxatdan o&apos;tgan sana:{" "}
              <span className="text-white">{createdAt ? formatDate(createdAt) : "-"}</span>
            </p>
            <div className="flex flex-wrap gap-2 pt-2 text-xs text-slate-200">
              <span className="rounded-full bg-white/10 px-3 py-1">LocalStorage session</span>
              <span className="rounded-full bg-white/10 px-3 py-1">Animatsiyali UI</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <Link href="/settings" className="w-full md:w-auto">
              <Button variant="outline" className="w-full md:w-auto">
                <KeyRound className="h-4 w-4" />
                Sozlamalarga o&apos;tish
              </Button>
            </Link>
            <Button onClick={handleLogout} className="w-full md:w-auto" variant="primary">
              <Shield className="h-4 w-4" />
              Chiqish
            </Button>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <StatCard
          icon={<User className="h-5 w-5" />}
          label="Faol sessiya"
          value="1 ta (demo)"
          trend="7 kun qolgan"
          accent="primary"
        />
        <StatCard
          icon={<Activity className="h-5 w-5" />}
          label="So&apos;ngi faollik"
          value="3 ta hodisa"
          trend="Yangilandi"
          accent="accent"
        />
        <StatCard
          icon={<BarChart3 className="h-5 w-5" />}
          label="Demo ko'rsatkichlar"
          value="+18% haftada"
          trend="Stabil"
        />
      </motion.div>

      <div className="grid gap-4 lg:grid-cols-[1.7fr_1fr]">
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">So&apos;ngi faollik</p>
              <h3 className="text-lg font-semibold text-white">Real vaqt rejimida (demo)</h3>
            </div>
            <Clock3 className="h-5 w-5 text-cyan-300" />
          </div>
          <div className="space-y-3">
            {activities.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 px-4 py-3"
              >
                <div>
                  <p className="font-medium text-white">{item.title}</p>
                  <p className="text-xs text-slate-400">{item.time}</p>
                </div>
                <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-200">
                  {item.status}
                </span>
              </motion.div>
            ))}
          </div>
        </Card>

        <Card className="space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-indigo-300" />
            <div>
              <p className="text-sm text-slate-300">Tezkor amallar</p>
              <h3 className="text-lg font-semibold text-white">Xavfsizlik</h3>
            </div>
          </div>
          <div className="space-y-2">
            {[
              { title: "Parolni yangilash", href: "/settings" },
              { title: "2FA (demo UI)", href: "/settings" },
            ].map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className="group flex items-center justify-between rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:border-white/20 hover:bg-white/10"
              >
                <span>{action.title}</span>
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
