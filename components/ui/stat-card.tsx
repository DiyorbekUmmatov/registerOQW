import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type StatCardProps = {
  icon: ReactNode;
  label: string;
  value: string;
  trend?: string;
  accent?: "primary" | "accent";
};

export function StatCard({ icon, label, value, trend, accent = "primary" }: StatCardProps) {
  return (
    <div className="glass relative overflow-hidden rounded-2xl border border-white/10 p-5 transition hover:-translate-y-1 hover:shadow-glow">
      <div
        className={cn(
          "absolute inset-0 opacity-60 blur-3xl",
          accent === "primary"
            ? "bg-gradient-to-br from-indigo-500/20 via-purple-500/15 to-cyan-400/20"
            : "bg-gradient-to-br from-emerald-400/15 via-cyan-400/15 to-indigo-500/10"
        )}
      />
      <div className="relative flex items-center justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
          {icon}
        </div>
        {trend ? (
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-emerald-200">
            {trend}
          </span>
        ) : null}
      </div>
      <div className="relative mt-4 space-y-1">
        <p className="text-sm text-slate-300">{label}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
}
