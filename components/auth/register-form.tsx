"use client";

import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { PasswordStrengthBar } from "@/components/ui/password-strength";
import { registerSchema } from "@/lib/schemas";
import { registerUser } from "@/lib/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { IdCard, Mail, UserRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { SocialLoginButtons } from "./social-login-buttons";

type RegisterValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = watch("password");

  const onSubmit = async (values: RegisterValues) => {
    setLoading(true);
    const res = await registerUser(values);
    if (!res.ok) {
      toast.error(res.message ?? "Ro'yxatdan o'tishda xatolik");
      setLoading(false);
      return;
    }
    toast.success("Akkaunt yaratildi", {
      description: "Kirish sahifasiga o'tmoqdasiz",
    });
    setTimeout(() => {
      router.replace("/auth/login");
    }, 450);
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      <motion.div
        className="space-y-4"
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
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
            label="To'liq ism"
            placeholder="Umidjon Developer"
            error={errors.fullName?.message}
            icon={<UserRound className="h-4 w-4" />}
            autoComplete="name"
            {...register("fullName")}
          />
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
            placeholder="Kuchli parol"
            autoComplete="new-password"
            error={errors.password?.message}
            {...register("password")}
          />
          <PasswordStrengthBar password={passwordValue} />
          <PasswordInput
            label="Parolni tasdiqlang"
            placeholder="Parolingizni takrorlang"
            autoComplete="new-password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
        </motion.div>
      </motion.div>

      <Button type="submit" className="w-full" loading={loading}>
        <IdCard className="h-4 w-4" />
        Ro&apos;yxatdan o&apos;tish
      </Button>

      <div className="text-center text-sm text-slate-300">
        Akkauntingiz bormi?{" "}
        <Link href="/auth/login" className="text-indigo-200 hover:text-indigo-100">
          Kirish
        </Link>
      </div>
    </form>
  );
}
