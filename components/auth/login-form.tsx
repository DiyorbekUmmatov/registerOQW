"use client";

import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { loginSchema } from "@/lib/schemas";
import { loginUser } from "@/lib/auth";
import { useAuthStore } from "@/stores/auth-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Mail, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { SocialLoginButtons } from "./social-login-buttons";

type LoginValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const { setSession } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: true,
    },
  });

  const onSubmit = async (values: LoginValues) => {
    try {
      setLoading(true);
      const result = await loginUser(values);
      if (!result.ok || !result.session) {
        toast.error(result.message ?? "Kirishda xatolik");
        return;
      }

      setSession(result.session);
      toast.success("Xush kelibsiz!", {
        description: "Dashboardga yo'naltirilmoqda...",
      });
      setTimeout(() => router.replace("/dashboard"), 450);
    } catch (error) {
      console.error(error);
      toast.error("Kutilmagan xato");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      <motion.div
        className="space-y-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08 } },
        }}
      >
        <motion.div variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
          <SocialLoginButtons />
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
          <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="text-xs uppercase tracking-[0.2em] text-slate-400">yoki email</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
        </motion.div>

        <motion.div
          className="space-y-3"
          variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
        >
          <InputField
            label="Email"
            placeholder="siz@example.com"
            type="email"
            autoComplete="email"
            error={errors.email?.message}
            icon={<Mail className="h-4 w-4" />}
            {...register("email")}
          />
          <PasswordInput
            label="Parol"
            placeholder="••••••••"
            autoComplete="current-password"
            error={errors.password?.message}
            {...register("password")}
          />
        </motion.div>
      </motion.div>

      <div className="flex items-center justify-between text-sm text-slate-300">
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-white/30 bg-white/5 text-indigo-500 focus:ring-2 focus:ring-cyan-400/50"
            {...register("remember")}
          />
          <span>Meni eslab qol</span>
        </label>
        <Link href="/auth/forgot-password" className="text-indigo-200 hover:text-indigo-100">
          Parolni unutdingizmi?
        </Link>
      </div>

      <Button type="submit" className="w-full" loading={loading}>
        <ShieldCheck className="h-4 w-4" />
        Kirish
      </Button>

      <div className="text-center text-sm text-slate-300">
        Hisobingiz yo&apos;qmi?{" "}
        <Link href="/auth/register" className="text-indigo-200 hover:text-indigo-100">
          Ro&apos;yxatdan o&apos;ting
        </Link>
      </div>
    </form>
  );
}
