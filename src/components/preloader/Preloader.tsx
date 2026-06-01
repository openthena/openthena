"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const SESSION_KEY = "ot_loaded";

/**
 * Full-screen logo-reveal preloader.
 *
 * - The OpenThena mark scales/fades in behind a glow.
 * - A thin accent ring "draws" itself around the mark.
 * - A progress counter fills to 100, then the overlay fades away.
 * - Plays once per browser session (sessionStorage) and is skipped entirely
 *   for visitors who prefer reduced motion.
 */
export function Preloader() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const alreadyLoaded =
      window.sessionStorage.getItem(SESSION_KEY) === "1";

    if (alreadyLoaded || reduceMotion) {
      setVisible(false);
      return;
    }

    setVisible(true);
    document.body.style.overflow = "hidden";

    let current = 0;
    const tick = window.setInterval(() => {
      // Ease toward 100 with a little randomness so it feels organic.
      const remaining = 100 - current;
      current += Math.max(1, Math.round(remaining * 0.12) + Math.random() * 4);
      if (current >= 100) {
        current = 100;
        window.clearInterval(tick);
        window.setTimeout(() => {
          window.sessionStorage.setItem(SESSION_KEY, "1");
          setVisible(false);
          document.body.style.overflow = "";
        }, 520);
      }
      setProgress(current);
    }, 130);

    return () => {
      window.clearInterval(tick);
      document.body.style.overflow = "";
    };
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-navy-950"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } }}
        >
          {/* ambient glow */}
          <div className="pointer-events-none absolute h-[28rem] w-[28rem] rounded-full bg-aurora-blue/20 blur-[120px] animate-pulse-glow" />

          <div className="relative flex h-44 w-44 items-center justify-center">
            {/* drawing accent ring */}
            <svg
              className="absolute inset-0 h-full w-full -rotate-90"
              viewBox="0 0 100 100"
              fill="none"
            >
              <circle
                cx="50"
                cy="50"
                r="46"
                stroke="rgba(245,246,246,0.08)"
                strokeWidth="1.5"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="46"
                stroke="url(#ot-ring)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: progress / 100 }}
                transition={{ ease: "easeOut", duration: 0.3 }}
              />
              <defs>
                <linearGradient id="ot-ring" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#38e1d6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>

            {/* the mark, revealed with a glow */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0, filter: "blur(8px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-24 w-24 drop-shadow-[0_0_24px_rgba(56,225,214,0.45)]"
            >
              <Image
                src="/openthena.svg"
                alt="OpenThena"
                fill
                priority
                className="object-contain"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex flex-col items-center gap-3"
          >
            <p className="text-lg font-semibold tracking-tight">
              Open<span className="text-brand">Thena</span>
            </p>
            <p className="text-xs uppercase tracking-[0.3em] text-ink/40">
              Privacy-first AI · {Math.round(progress)}%
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
