"use client";

import { memo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Check, Copy } from "lucide-react";

function CopyButton({ getText }: { getText: () => string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(getText());
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-ink/60 transition-colors hover:bg-ink/10 hover:text-ink"
      aria-label="Copy code"
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
  );
}

export const MarkdownMessage = memo(function MarkdownMessage({
  content,
}: {
  content: string;
}) {
  return (
    <div className="prose-openthena">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[[rehypeHighlight, { detect: true, ignoreMissing: true }]]}
        components={{
          pre({ children }) {
            // Pull raw text out of the nested <code> for the copy button.
            const getText = () => {
              const el = children as {
                props?: { children?: unknown };
              };
              const inner = el?.props?.children;
              return typeof inner === "string"
                ? inner
                : Array.isArray(inner)
                  ? inner.join("")
                  : "";
            };
            return (
              <div className="group/code my-4 overflow-hidden rounded-xl border border-ink/10 bg-navy-950/70">
                <div className="flex items-center justify-between border-b border-ink/10 px-3 py-1.5">
                  <span className="text-[10px] uppercase tracking-wider text-ink/35">
                    code
                  </span>
                  <CopyButton getText={getText} />
                </div>
                <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
                  {children}
                </pre>
              </div>
            );
          },
          code({ className, children }) {
            const isBlock = /language-|hljs/.test(className ?? "");
            if (isBlock) {
              return <code className={className}>{children}</code>;
            }
            return (
              <code className="rounded-md bg-ink/10 px-1.5 py-0.5 font-mono text-[0.85em] text-brand">
                {children}
              </code>
            );
          },
          a({ children, href }) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand underline underline-offset-2 hover:text-aurora-cyan"
              >
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
});
