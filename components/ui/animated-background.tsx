"use client";

import { motion, useReducedMotion } from "framer-motion";

const blobs = [
  { size: 360, color: "from-indigo-500/35 to-purple-500/25", x: "-12%", y: "-14%" },
  { size: 280, color: "from-cyan-400/35 to-emerald-400/25", x: "60%", y: "10%" },
  { size: 320, color: "from-fuchsia-500/28 to-indigo-500/22", x: "35%", y: "70%" },
];

export function AnimatedBackground() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.12),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(6,182,212,0.12),transparent_30%),radial-gradient(circle_at_50%_85%,rgba(139,92,246,0.12),transparent_28%)]" />
      {!prefersReducedMotion &&
        blobs.map((blob, index) => (
          <motion.div
            key={index}
            className={`absolute blur-3xl`}
            style={{
              width: blob.size,
              height: blob.size,
              left: blob.x,
              top: blob.y,
            }}
            animate={{
              x: ["-6%", "4%", "-2%"],
              y: ["-4%", "6%", "-2%"],
              rotate: [0, 8, -4],
            }}
            transition={{
              duration: 18 + index * 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div
              className={`h-full w-full rounded-full bg-gradient-to-br ${blob.color} opacity-60`}
            />
          </motion.div>
        ))}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04),transparent_45%)]" />
    </div>
  );
}
