"use client";

import { useState } from "react";
import { Check, Copy, Info, ShieldCheck, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export function CodeBlock({
  children,
  lang = "bash",
}: {
  children: string;
  lang?: string;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="group/code my-5 overflow-hidden rounded-xl border border-ink/10 bg-navy-950/70">
      <div className="flex items-center justify-between border-b border-ink/10 px-4 py-2">
        <span className="text-[10px] uppercase tracking-wider text-ink/35">
          {lang}
        </span>
        <button
          onClick={() => {
            navigator.clipboard.writeText(children);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-ink/55 hover:bg-ink/10 hover:text-ink"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-brand" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" /> Copy
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-ink/85">
        <code>{children}</code>
      </pre>
    </div>
  );
}

const tones = {
  info: { icon: Info, cls: "border-aurora-blue/30 bg-aurora-blue/10 text-aurora-blue" },
  privacy: {
    icon: ShieldCheck,
    cls: "border-brand/30 bg-brand/10 text-brand",
  },
  warn: {
    icon: TriangleAlert,
    cls: "border-yellow-400/30 bg-yellow-400/10 text-yellow-200",
  },
};

export function Callout({
  tone = "info",
  children,
}: {
  tone?: keyof typeof tones;
  children: React.ReactNode;
}) {
  const { icon: Icon, cls } = tones[tone];
  return (
    <div className={cn("my-5 flex gap-3 rounded-2xl border px-4 py-3.5 text-sm", cls)}>
      <Icon className="mt-0.5 h-4 w-4 shrink-0" />
      <div className="text-ink/80 [&_strong]:text-ink">{children}</div>
    </div>
  );
}
