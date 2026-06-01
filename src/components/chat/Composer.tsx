"use client";

import { useEffect, useRef } from "react";
import { ArrowUp, Square } from "lucide-react";
import { cn } from "@/lib/utils";

export function Composer({
  value,
  onChange,
  onSubmit,
  onStop,
  isLoading,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  onStop: () => void;
  isLoading: boolean;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);

  // Auto-grow the textarea up to a max height.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && value.trim()) onSubmit();
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-4">
      <div className="glass-strong flex items-end gap-2 rounded-3xl p-2 pl-4 shadow-lg shadow-navy-950/30 focus-within:ring-1 focus-within:ring-brand/40">
        <textarea
          ref={ref}
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="Message OpenThena…"
          className="max-h-[200px] flex-1 resize-none bg-transparent py-2.5 text-[0.95rem] text-ink placeholder:text-ink/35 focus:outline-none"
        />
        {isLoading ? (
          <button
            onClick={onStop}
            aria-label="Stop generating"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-ink/10 text-ink transition-colors hover:bg-ink/20"
          >
            <Square className="h-4 w-4 fill-current" />
          </button>
        ) : (
          <button
            onClick={onSubmit}
            disabled={!value.trim()}
            aria-label="Send message"
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl transition-all",
              value.trim()
                ? "bg-gradient-to-br from-aurora-cyan to-aurora-blue text-navy-950 hover:scale-105"
                : "bg-ink/10 text-ink/30",
            )}
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        )}
      </div>
      <p className="mt-2 text-center text-[11px] text-ink/35">
        OpenThena stores this chat only in your browser. It can make mistakes —
        verify important info.
      </p>
    </div>
  );
}
