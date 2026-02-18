"use client";

import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import { InputField } from "./input";

type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export function PasswordInput({ label, error, ...props }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <InputField
        type={visible ? "text" : "password"}
        label={label}
        error={error}
        icon={<Lock className="h-4 w-4" />}
        {...props}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label="Parolni ko'rsatish"
        className="absolute inset-y-[34px] right-3 flex items-center text-slate-300 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
      >
        {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}
