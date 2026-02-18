"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { InputField } from "@/components/ui/input";
import { getUsers, saveUsers } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Bell, Check, Lock, Moon, ShieldCheck, SunMedium, User } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const profileSchema = z.object({
  fullName: z.string().min(3, "Kamida 3 ta belgi"),
});

type ProfileForm = z.infer<typeof profileSchema>;

export function SettingsScreen() {
  const { session, setSession } = useAuthStore();
  const { theme, setTheme } = useTheme();
  const [mounted] = useState(() => typeof window !== "undefined");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: session?.fullName ?? "",
    },
  });

  useEffect(() => {
    if (session?.fullName) reset({ fullName: session.fullName });
  }, [session, reset]);

  const onSubmit = (values: ProfileForm) => {
    if (!session) return;
    const users = getUsers();
    const idx = users.findIndex((u) => u.id === session.userId);
    if (idx === -1) {
      toast.error("Foydalanuvchi topilmadi");
      return;
    }
    users[idx].fullName = values.fullName.trim();
    saveUsers(users);
    setSession({ ...session, fullName: values.fullName.trim() });
    toast.success("Profil yangilandi");
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-indigo-100/80">Sozlamalar</p>
        <h1 className="text-3xl font-bold text-white">Profil va xavfsizlik</h1>
        <p className="text-sm text-slate-300">Ma&apos;lumotlaringizni yangilang va mavzuni tanlang.</p>
      </div>

      <motion.div
        className="grid gap-4 lg:grid-cols-[1.4fr_1fr]"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="space-y-5">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-indigo-300" />
            <div>
              <p className="text-sm text-slate-300">Profil ma&apos;lumotlari</p>
              <h3 className="text-lg font-semibold text-white">Asosiy ma&apos;lumotlar</h3>
            </div>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
            <InputField
              label="To'liq ism"
              placeholder="Umidjon Developer"
              error={errors.fullName?.message}
              {...register("fullName")}
            />
            <Button type="submit" className="w-full md:w-auto" loading={isSubmitting}>
              <Check className="h-4 w-4" />
              Saqlash
            </Button>
          </form>
        </Card>

        <Card className="space-y-4">
          <div className="flex items-center gap-2">
            <SunMedium className="h-5 w-5 text-amber-300" />
            <div>
              <p className="text-sm text-slate-300">Ko&apos;rinish</p>
              <h3 className="text-lg font-semibold text-white">Mavzu rejimi</h3>
            </div>
          </div>
          <div className="grid gap-3">
            {[
              { key: "light", title: "Yorug'", icon: <SunMedium className="h-4 w-4" /> },
              { key: "dark", title: "Qorong'u", icon: <Moon className="h-4 w-4" /> },
            ].map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setTheme(item.key)}
                className={cn(
                  "flex items-center justify-between rounded-xl border px-4 py-3 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60",
                  theme === item.key
                    ? "border-cyan-400/40 bg-white/10 text-white shadow-glow"
                    : "border-white/10 bg-white/5 text-slate-200 hover:border-white/20"
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-white/10 p-2">{item.icon}</span>
                  <span>{item.title}</span>
                </div>
                {mounted && theme === item.key ? <ShieldCheck className="h-4 w-4 text-cyan-300" /> : null}
              </button>
            ))}
          </div>
        </Card>
      </motion.div>

      <motion.div
        className="grid gap-4 md:grid-cols-3"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
      >
        {[
          { title: "2FA (demo UI)", desc: "Email OTP yoki authenticator bilan faollashtirish", icon: <ShieldCheck className="h-5 w-5" /> },
          { title: "Bildirishnomalar", desc: "Sessiya va parol o'zgarishlari haqida ogohlantirish", icon: <Bell className="h-5 w-5" /> },
          { title: "Parol siyosati", desc: "Kuchli parol talablarini yoqish", icon: <Lock className="h-5 w-5" /> },
        ].map((item) => (
          <Card
            key={item.title}
            className="flex flex-col gap-2 border-white/5 bg-white/5"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white">
                {item.icon}
              </span>
              <div>
                <p className="font-semibold text-white">{item.title}</p>
                <p className="text-xs text-slate-400">{item.desc}</p>
              </div>
            </div>
            <Button variant="outline" className="mt-auto w-full">
              Faollashtirish
            </Button>
          </Card>
        ))}
      </motion.div>
    </div>
  );
}
