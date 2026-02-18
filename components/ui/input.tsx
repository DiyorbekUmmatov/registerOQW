import { cn } from "@/lib/utils";
import { forwardRef } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  label?: string;
  icon?: React.ReactNode;
  hint?: string;
};

export const InputField = forwardRef<HTMLInputElement, InputProps>(
  ({ error, label, icon, hint, className, ...props }, ref) => {
    return (
      <label className="block space-y-2 text-left text-sm font-medium text-slate-200">
        {label ? <span>{label}</span> : null}
        <div
          className={cn(
            "group relative flex items-center gap-3 rounded-xl border bg-white/5 px-4 py-3 text-base text-slate-50 transition focus-within:border-cyan-400/60 focus-within:bg-white/10 focus-within:shadow-glow",
            error ? "border-red-400/60" : "border-white/10",
            className
          )}
        >
          {icon ? <span className="text-slate-300">{icon}</span> : null}
          <input
            ref={ref}
            className="w-full bg-transparent text-base text-slate-50 placeholder:text-slate-500 focus:outline-none"
            {...props}
          />
        </div>
        {error ? (
          <p className="text-sm text-red-300">{error}</p>
        ) : hint ? (
          <p className="text-xs text-slate-400">{hint}</p>
        ) : null}
      </label>
    );
  }
);

InputField.displayName = "InputField";
