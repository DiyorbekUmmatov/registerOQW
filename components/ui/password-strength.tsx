"use client";

import { motion } from "framer-motion";

const meter = [
  { label: "Kuchsiz", color: "bg-red-400" },
  { label: "O'rtacha", color: "bg-amber-400" },
  { label: "Yaxshi", color: "bg-emerald-400" },
  { label: "Kuchli", color: "bg-cyan-400" },
];

export function passwordScore(password: string) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return Math.min(score, meter.length - 1);
}

export function PasswordStrengthBar({ password }: { password: string }) {
  const score = password ? passwordScore(password) : 0;

  return (
    <div className="space-y-1">
      <div className="flex gap-1">
        {meter.map((level, idx) => (
          <motion.div
            key={level.label}
            className="h-2 flex-1 rounded-full bg-white/10"
            animate={{
              backgroundColor: idx <= score ? undefined : "rgba(255,255,255,0.06)",
              scale: idx <= score ? 1.02 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            {idx <= score ? (
              <motion.div
                className={`h-2 rounded-full ${level.color}`}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.35 }}
              />
            ) : null}
          </motion.div>
        ))}
      </div>
      <p className="text-xs text-slate-400">
        Kuchlilik: <span className="text-slate-200">{meter[score].label}</span>
      </p>
    </div>
  );
}
