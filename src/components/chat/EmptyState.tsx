"use client";

import Image from "next/image";
import { PROMPT_SUGGESTIONS } from "@/lib/constants";

export function EmptyState({
  onPick,
}: {
  onPick: (prompt: string) => void;
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-4 text-center">
      <div className="relative h-16 w-16 animate-float drop-shadow-[0_0_24px_rgba(56,225,214,0.35)]">
        <Image
          src="/openthena.svg"
          alt="OpenThena"
          fill
          className="object-contain"
        />
      </div>
      <h2 className="mt-6 text-2xl font-semibold tracking-tight">
        How can I help, privately?
      </h2>
      <p className="mt-2 max-w-md text-sm text-ink/55">
        Ask anything. Your conversation is stored only in this browser — never on
        a server.
      </p>

      <div className="mt-8 grid w-full max-w-xl gap-3 sm:grid-cols-2">
        {PROMPT_SUGGESTIONS.map((p) => (
          <button
            key={p}
            onClick={() => onPick(p)}
            className="rounded-2xl glass px-4 py-3 text-left text-sm text-ink/75 transition-all hover:-translate-y-0.5 hover:border-brand/30 hover:text-ink"
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
