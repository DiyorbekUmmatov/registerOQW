"use client";

import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input";
import { forgotSchema } from "@/lib/schemas";
import { createResetToken } from "@/lib/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Mail, Share2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type ForgotValues = z.infer<typeof forgotSchema>;

export function ForgotForm() {
  const [resetLink, setResetLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotValues>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: ForgotValues) => {
    setLoading(true);
    const res = createResetToken(values.email);
    if (!res.ok || !res.token) {
      toast.error(res.message ?? "Email topilmadi");
      setLoading(false);
      return;
    }
    const link = `${window.location.origin}/auth/reset-password?token=${res.token.token}`;
    setResetLink(link);
    toast.success("Reset havolasi yaratildi", {
      description: "Demo rejim: havolani ko'rishda foydalaning",
    });
    setLoading(false);
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      <motion.div
        className="space-y-3"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
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
      </motion.div>

      <Button type="submit" className="w-full" loading={loading}>
        <Share2 className="h-4 w-4" />
        Reset havolasini yuborish
      </Button>

      {resetLink ? (
        <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-4 text-sm text-slate-200">
          <p className="font-semibold text-cyan-300">Demo reset link:</p>
          <Link href={resetLink} className="text-indigo-200 hover:text-indigo-100 break-all">
            {resetLink}
          </Link>
          <p className="mt-1 text-xs text-slate-400">
            Havola 1 soat ichida amal qiladi. Real loyihada bu email orqali yuboriladi.
          </p>
        </div>
      ) : null}

      <div className="text-center text-sm text-slate-300">
        Parolni esladingizmi?{" "}
        <Link href="/auth/login" className="text-indigo-200 hover:text-indigo-100">
          Kirish
        </Link>
      </div>
    </form>
  );
}
