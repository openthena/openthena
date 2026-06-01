import type { Metadata } from "next";
import { ChatShell } from "@/components/chat/ChatShell";

export const metadata: Metadata = {
  title: "Chat",
  description:
    "Chat privately with OpenThena. Your conversation is stored only in your browser — never on a server.",
  robots: { index: false, follow: true },
};

export default function ChatPage() {
  return <ChatShell />;
}
