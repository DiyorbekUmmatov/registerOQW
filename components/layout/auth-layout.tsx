"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, Zap } from "lucide-react";
import Link from "next/link";

type AuthLayoutProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  illustrationHint?: string;
};

export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
  illustrationHint,
}: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-10 md:px-8 lg:px-12">
      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent blur-3xl" />
      <div className="glass gradient-border shadow-2xl">
        <div className="grid max-h-[780px] grid-cols-1 overflow-hidden rounded-[18px] border border-white/10 lg:grid-cols-[1.05fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 p-10 text-slate-100 lg:block"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-slate-900 shadow-glow">
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-indigo-200">UMD Auth</p>
                <p className="text-lg font-semibold text-white">Premium Security</p>
              </div>
            </div>

            <div className="mt-12 space-y-6">
              <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl">
                Oson, xavfsiz va chiroyli <span className="gradient-text">kirish tajribasi</span>
              </h1>
              <p className="max-w-lg text-base text-slate-300">
                Mahalliy demo autentifikatsiya — real loyihadagidek validatsiya, animatsiya va micro-interactionlar bilan.
              </p>

              <div className="space-y-3 text-sm text-slate-200/90">
                {[
                  "Framer Motion bilan jonli sahifa transitionlar",
                  "Zod + React Hook Form yordamida kuchli validatsiya",
                  "Glassmorphism va gradientlar bilan premium UI",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-2.5 backdrop-blur">
                    <ShieldCheck className="h-4 w-4 text-cyan-300" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-white/10 px-6 py-5 text-sm text-indigo-100/80">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur">
                  <Zap className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-semibold text-white">Kreativ dizayn</p>
                  <p className="text-xs text-slate-300">{illustrationHint ?? "Gradient bloblar va shaffof kartalar"}</p>
                </div>
              </div>
              <Link
                href="/auth/register"
                className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white/20"
              >
                Boshlash
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 26 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="relative flex h-full flex-col justify-center bg-slate-900/60 px-6 py-8 backdrop-blur md:px-10 lg:px-12"
          >
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-slate-900 shadow-glow">
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-indigo-200">UMD Auth</p>
                <p className="text-lg font-semibold text-white">Premium Security</p>
              </div>
            </div>

            <div className="mb-6 space-y-2">
              <p className="text-sm uppercase tracking-[0.28em] text-indigo-200">
                Xush kelibsiz
              </p>
              <h2 className="text-3xl font-bold text-white md:text-4xl">{title}</h2>
              {subtitle ? (
                <p className="text-base text-slate-300">{subtitle}</p>
              ) : null}
            </div>

            <div className="glass relative rounded-2xl border border-white/10 p-6 shadow-xl">
              {children}
            </div>

            {footer ? <div className="mt-6 text-sm text-slate-300">{footer}</div> : null}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
