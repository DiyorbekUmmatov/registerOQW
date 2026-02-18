"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle2, MailCheck, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function VerifyEmailCard() {
  const [loading, setLoading] = useState(false);
  const [resent, setResent] = useState(false);

  const handleResend = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResent(true);
      toast.success("Tasdiqlash havolasi qayta yuborildi");
    }, 700);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      <div className="flex items-center gap-3 rounded-xl border border-cyan-500/30 bg-cyan-500/5 px-4 py-3 text-sm text-slate-200">
        <MailCheck className="h-5 w-5 text-cyan-300" />
        <span>Email manzilingizga tasdiqlash xati yuborildi (demo UI).</span>
      </div>
      <p className="text-sm text-slate-300">
        Real loyihada bu yerda backenddan olingan status ko&apos;rsatiladi. Hozircha shunchaki
        jarayonni ko&apos;rsatadigan UI va micro-interactionlar mavjud.
      </p>

      <div className="flex flex-col gap-3 md:flex-row">
        <Button type="button" className="w-full md:w-auto" onClick={handleResend} loading={loading}>
          <RefreshCcw className="h-4 w-4" />
          Qayta yuborish
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full md:w-auto"
          onClick={() => toast.success("Tasdiqlangan deb belgilandi (demo)")}
        >
          <CheckCircle2 className="h-4 w-4" />
          Tasdiqlandi deb belgilash
        </Button>
      </div>

      {resent ? (
        <p className="text-xs text-slate-400">
          So&apos;nggi yuborish vaqti: {new Date().toLocaleTimeString("uz-UZ")}
        </p>
      ) : null}
    </motion.div>
  );
}
