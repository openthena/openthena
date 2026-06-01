"use client";

import { useState } from "react";
import type { Message } from "ai";
import { Check, Copy, RotateCcw, User } from "lucide-react";
import Image from "next/image";
import { MarkdownMessage } from "./MarkdownMessage";
import { cn } from "@/lib/utils";

export function MessageBubble({
  message,
  isLast,
  isLoading,
  onRegenerate,
}: {
  message: Message;
  isLast: boolean;
  isLoading: boolean;
  onRegenerate?: () => void;
}) {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);

  return (
    <div
      className={cn(
        "group flex gap-3.5 px-1 py-4",
        isUser ? "flex-row-reverse" : "flex-row",
      )}
    >
      {/* avatar */}
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ring-1",
          isUser
            ? "bg-aurora-blue/20 ring-aurora-blue/30"
            : "bg-navy-950 ring-brand/30",
        )}
      >
        {isUser ? (
          <User className="h-4 w-4 text-ink/80" />
        ) : (
          <Image
            src="/openthena.svg"
            alt="OpenThena"
            width={18}
            height={18}
            className="object-contain"
          />
        )}
      </div>

      <div className={cn("min-w-0 max-w-[85%]", isUser && "flex flex-col items-end")}>
        <div
          className={cn(
            "rounded-2xl px-4 py-3",
            isUser
              ? "rounded-br-md bg-aurora-blue/15 text-ink"
              : "rounded-bl-md glass text-ink/90",
          )}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap break-words text-[0.95rem] leading-relaxed">
              {message.content}
            </p>
          ) : message.content ? (
            <MarkdownMessage content={message.content} />
          ) : (
            <TypingDots />
          )}
        </div>

        {/* actions (assistant only) */}
        {!isUser && message.content && (
          <div className="mt-1.5 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              onClick={() => {
                navigator.clipboard.writeText(message.content);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-ink/50 hover:bg-ink/5 hover:text-ink"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-brand" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </button>
            {isLast && onRegenerate && !isLoading && (
              <button
                onClick={onRegenerate}
                className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-ink/50 hover:bg-ink/5 hover:text-ink"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Regenerate
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <span className="flex items-center gap-1.5 py-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-2 w-2 animate-pulse rounded-full bg-brand/70"
          style={{ animationDelay: `${i * 0.18}s` }}
        />
      ))}
    </span>
  );
}
