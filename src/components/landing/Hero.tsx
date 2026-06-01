"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 pt-28">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto flex max-w-4xl flex-col items-center text-center"
      >
        <motion.div variants={item}>
          <Badge className="mb-6">
            <Sparkles className="h-3.5 w-3.5 text-brand" />
            Open-source · Privacy-first · LiteLLM-powered
          </Badge>
        </motion.div>

        <motion.h1
          variants={item}
          className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          AI that answers you,
          <br />
          <span className="text-gradient-brand">not about you.</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink/65"
        >
          OpenThena is a fully open-source AI assistant powered by a
          LiteLLM-style gateway and the Xiaomi MiMo brain. It streams answers in
          real time — and keeps every conversation on your device. No accounts,
          no tracking, no stored chats.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Button href="/chat" size="lg">
            Start chatting
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button href="/docs" variant="secondary" size="lg">
            Read the docs
          </Button>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-8 flex items-center gap-2 text-xs text-ink/45"
        >
          <ShieldCheck className="h-4 w-4 text-brand" />
          Zero-storage architecture · your chats never touch a database
        </motion.div>

        {/* floating preview card */}
        <motion.div
          variants={item}
          className="relative mt-16 w-full max-w-2xl animate-float"
        >
          <div className="glass-strong glow-ring rounded-3xl p-5 text-left">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
              <span className="ml-3 text-xs text-ink/40">
                openthena.com/chat
              </span>
            </div>
            <div className="space-y-3 text-sm">
              <div className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-md bg-aurora-blue/20 px-4 py-2.5 text-ink">
                Is my conversation stored anywhere?
              </div>
              <div className="w-fit max-w-[88%] rounded-2xl rounded-bl-md glass px-4 py-2.5 text-ink/85">
                Nope. Your messages stream straight to the model and back —
                nothing is written to any server or database. This chat lives
                only in <span className="text-brand">your browser</span>. ✨
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
