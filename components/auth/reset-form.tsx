"use client";

import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import { PasswordStrengthBar } from "@/components/ui/password-strength";
import { resetPassword, verifyResetToken } from "@/lib/auth";
import { resetSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { KeyRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type ResetValues = z.infer<typeof resetSchema>;

export function ResetForm({ token }: { token: string }) {
  const router = useRouter();
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const passwordValue = watch("password");

  useEffect(() => {
    const res = verifyResetToken(token);
    setTokenValid(res.ok);
  }, [token]);

  const onSubmit = async (values: ResetValues) => {
    setLoading(true);
    const res = await resetPassword({ token, newPassword: values.password });
    if (!res.ok) {
      toast.error(res.message ?? "Token noto'g'ri");
      setLoading(false);
      setTokenValid(false);
      return;
    }
    toast.success("Parol yangilandi", {
      description: "Endi yangi parol bilan kiring",
    });
    setTimeout(() => router.replace("/auth/login"), 500);
  };

  if (tokenValid === false) {
    return (
      <div className="space-y-4 text-center">
        <p className="text-lg font-semibold text-red-200">Token eskirgan yoki noto&apos;g&apos;ri</p>
        <Button variant="outline" type="button" onClick={() => router.push("/auth/forgot-password")}>
          Yangi token so&apos;rash
        </Button>
      </div>
    );
  }

  if (tokenValid === null) {
    return (
      <div className="flex items-center justify-center py-6 text-slate-200">
        Tekshirilmoqda...
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      <motion.div
        className="space-y-3"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <PasswordInput
          label="Yangi parol"
          placeholder="Kuchli parol"
          autoComplete="new-password"
          error={errors.password?.message}
          {...register("password")}
        />
        <PasswordStrengthBar password={passwordValue} />
        <PasswordInput
          label="Parolni takrorlang"
          placeholder="Parolingizni tasdiqlang"
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
      </motion.div>

      <Button type="submit" className="w-full" loading={loading}>
        <KeyRound className="h-4 w-4" />
        Parolni yangilash
      </Button>
    </form>
  );
}
