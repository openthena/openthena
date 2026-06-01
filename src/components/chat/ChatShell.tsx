"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import type { Message } from "ai";
import { PanelLeft, AlertTriangle } from "lucide-react";
import { ConversationSidebar } from "./ConversationSidebar";
import { MessageBubble } from "./MessageBubble";
import { Composer } from "./Composer";
import { ModelSelect } from "./ModelSelect";
import { EmptyState } from "./EmptyState";
import { useLocalConversations } from "./useLocalConversations";
import { DEFAULT_MODEL, type ModelId } from "@/lib/constants";
import { uid } from "@/lib/utils";

export function ChatShell() {
  const store = useLocalConversations();
  const [currentId, setCurrentId] = useState<string>("");
  const [model, setModel] = useState<ModelId>(DEFAULT_MODEL);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Pick an active conversation once storage has hydrated.
  useEffect(() => {
    if (!store.hydrated || currentId) return;
    setCurrentId(store.conversations[0]?.id ?? uid("conv"));
  }, [store.hydrated, store.conversations, currentId]);

  const initialMessages = useMemo(
    () => store.conversations.find((c) => c.id === currentId)?.messages ?? [],
    // Only re-derive when the active id changes (not on every token write).
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentId],
  );

  const handleNew = () => {
    setCurrentId(uid("conv"));
    setSidebarOpen(false);
  };

  const handleSelect = (id: string) => {
    setCurrentId(id);
    setSidebarOpen(false);
  };

  const handleDelete = (id: string) => {
    store.remove(id);
    if (id === currentId) {
      const remaining = store.conversations.filter((c) => c.id !== id);
      setCurrentId(remaining[0]?.id ?? uid("conv"));
    }
  };

  const handleClearAll = () => {
    store.clearAll();
    setCurrentId(uid("conv"));
  };

  if (!store.hydrated || !currentId) {
    return <div className="h-dvh w-full bg-navy-950" />;
  }

  return (
    <div className="flex h-dvh w-full overflow-hidden">
      <ConversationSidebar
        conversations={store.conversations}
        activeId={currentId}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onSelect={handleSelect}
        onNew={handleNew}
        onDelete={handleDelete}
        onClearAll={handleClearAll}
      />

      <ChatWindow
        key={currentId}
        conversationId={currentId}
        initialMessages={initialMessages}
        model={model}
        onModelChange={setModel}
        onMessagesChange={(msgs) => store.upsert(currentId, msgs)}
        onOpenSidebar={() => setSidebarOpen(true)}
      />
    </div>
  );
}

function ChatWindow({
  conversationId,
  initialMessages,
  model,
  onModelChange,
  onMessagesChange,
  onOpenSidebar,
}: {
  conversationId: string;
  initialMessages: Message[];
  model: ModelId;
  onModelChange: (id: ModelId) => void;
  onMessagesChange: (messages: Message[]) => void;
  onOpenSidebar: () => void;
}) {
  const {
    messages,
    input,
    setInput,
    handleInputChange,
    append,
    reload,
    stop,
    isLoading,
    error,
  } = useChat({
    api: "/api/chat",
    id: conversationId,
    initialMessages,
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the newest content as it streams.
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  // Persist completed turns to local storage (not on every streamed token).
  useEffect(() => {
    if (!isLoading && messages.length > 0) {
      onMessagesChange(messages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, messages.length]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;
    setInput("");
    append({ role: "user", content: trimmed }, { body: { model } });
  };

  return (
    <main className="relative flex h-full flex-1 flex-col">
      {/* top bar */}
      <header className="flex items-center justify-between gap-3 border-b border-ink/10 px-4 py-3">
        <button
          onClick={onOpenSidebar}
          className="flex h-9 w-9 items-center justify-center rounded-full text-ink/60 hover:bg-ink/5 md:hidden"
          aria-label="Open sidebar"
        >
          <PanelLeft className="h-5 w-5" />
        </button>
        <div className="ml-auto">
          <ModelSelect value={model} onChange={onModelChange} />
        </div>
      </header>

      {/* messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="mx-auto h-full w-full max-w-3xl px-4">
          {messages.length === 0 ? (
            <EmptyState onPick={(p) => send(p)} />
          ) : (
            <div className="py-4">
              {messages.map((m, i) => (
                <MessageBubble
                  key={m.id}
                  message={m}
                  isLast={i === messages.length - 1}
                  isLoading={isLoading}
                  onRegenerate={() => reload({ body: { model } })}
                />
              ))}
              {error && (
                <div className="my-3 flex items-start gap-2 rounded-2xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    Something went wrong reaching the model. Check your API key
                    configuration and try again.
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* composer */}
      <Composer
        value={input}
        onChange={handleInputChange}
        onSubmit={() => send(input)}
        onStop={stop}
        isLoading={isLoading}
      />
    </main>
  );
}
