"use client";

import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="dark"
      enableSystem={false}
      storageKey="umd-auth-theme"
    >
      <MotionConfig reducedMotion="user">
        {children}
        <Toaster
          position="top-right"
          closeButton
          richColors
          toastOptions={{
            classNames: {
              toast:
                "glass border border-white/10 shadow-lg text-sm text-slate-50",
              title: "font-semibold text-slate-50",
              description: "text-slate-200/90",
              actionButton:
                "bg-white/10 hover:bg-white/20 text-white rounded-md px-3 py-1",
            },
          }}
        />
      </MotionConfig>
    </ThemeProvider>
  );
}
