"use client";

import { useCallback, useEffect, useState } from "react";
import type { Message } from "ai";

export type Conversation = {
  id: string;
  title: string;
  messages: Message[];
  updatedAt: number;
};

const STORAGE_KEY = "openthena.conversations.v1";

function load(): Conversation[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Conversation[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persist(items: Conversation[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* storage full or unavailable — privacy-first means we just move on */
  }
}

function titleFrom(messages: Message[]): string {
  const firstUser = messages.find((m) => m.role === "user");
  if (!firstUser?.content) return "New chat";
  const text = firstUser.content.trim().replace(/\s+/g, " ");
  return text.length > 42 ? `${text.slice(0, 42)}…` : text;
}

/**
 * Browser-local conversation store. Everything lives in localStorage only —
 * there is no server, no sync, and no account. This is the privacy promise.
 */
export function useLocalConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setConversations(load());
    setHydrated(true);
  }, []);

  /** Create-or-update a conversation by id. Empty message lists are ignored. */
  const upsert = useCallback((id: string, messages: Message[]) => {
    if (messages.length === 0) return;
    setConversations((prev) => {
      const existing = prev.find((c) => c.id === id);
      const next: Conversation = existing
        ? {
            ...existing,
            messages,
            title:
              existing.title === "New chat"
                ? titleFrom(messages)
                : existing.title,
            updatedAt: Date.now(),
          }
        : {
            id,
            title: titleFrom(messages),
            messages,
            updatedAt: Date.now(),
          };
      const others = prev.filter((c) => c.id !== id);
      const merged = [next, ...others].sort(
        (a, b) => b.updatedAt - a.updatedAt,
      );
      persist(merged);
      return merged;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setConversations((prev) => {
      const next = prev.filter((c) => c.id !== id);
      persist(next);
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    persist([]);
    setConversations([]);
  }, []);

  return { conversations, hydrated, upsert, remove, clearAll };
}
