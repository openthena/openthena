"use client";

import Link from "next/link";
import { MessageSquarePlus, Trash2, ShieldCheck, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import type { Conversation } from "./useLocalConversations";

export function ConversationSidebar({
  conversations,
  activeId,
  open,
  onClose,
  onSelect,
  onNew,
  onDelete,
  onClearAll,
}: {
  conversations: Conversation[];
  activeId: string | null;
  open: boolean;
  onClose: () => void;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
}) {
  return (
    <>
      {/* mobile scrim */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-navy-950/60 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-ink/10 bg-navy-950/80 backdrop-blur-xl transition-transform duration-300 md:static md:z-auto md:translate-x-0 md:bg-transparent",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-4 py-4">
          <Logo />
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink/60 hover:bg-ink/5 md:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-3">
          <button
            onClick={onNew}
            className="flex w-full items-center gap-2 rounded-2xl bg-gradient-to-r from-aurora-cyan/15 to-aurora-blue/15 px-4 py-3 text-sm font-medium text-ink ring-1 ring-brand/20 transition-colors hover:ring-brand/40"
          >
            <MessageSquarePlus className="h-4 w-4 text-brand" />
            New chat
          </button>
        </div>

        <div className="mt-4 flex-1 overflow-y-auto px-3">
          <p className="px-2 pb-2 text-[11px] uppercase tracking-wider text-ink/35">
            History
          </p>
          {conversations.length === 0 ? (
            <p className="px-2 py-6 text-sm text-ink/40">
              No conversations yet.
            </p>
          ) : (
            <ul className="space-y-1">
              {conversations.map((c) => (
                <li key={c.id}>
                  <div
                    className={cn(
                      "group flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm transition-colors",
                      c.id === activeId
                        ? "bg-ink/10 text-ink"
                        : "text-ink/65 hover:bg-ink/5 hover:text-ink",
                    )}
                  >
                    <button
                      onClick={() => onSelect(c.id)}
                      className="flex-1 truncate text-left"
                    >
                      {c.title}
                    </button>
                    <button
                      onClick={() => onDelete(c.id)}
                      className="opacity-0 transition-opacity hover:text-red-400 group-hover:opacity-100"
                      aria-label="Delete conversation"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="space-y-3 border-t border-ink/10 p-3">
          {conversations.length > 0 && (
            <button
              onClick={onClearAll}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs text-ink/50 transition-colors hover:bg-ink/5 hover:text-red-400"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Clear all conversations
            </button>
          )}
          <div className="flex items-center gap-2 rounded-xl bg-navy-900/50 px-3 py-2.5 text-[11px] leading-snug text-ink/50">
            <ShieldCheck className="h-4 w-4 shrink-0 text-brand" />
            Stored only in your browser. Nothing is sent to a server log.
          </div>
          <Link
            href="/"
            className="block px-3 text-xs text-ink/40 hover:text-ink/70"
          >
            ← Back to home
          </Link>
        </div>
      </aside>
    </>
  );
}
