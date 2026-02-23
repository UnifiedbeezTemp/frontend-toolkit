"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { formatEnumString } from "./formatEnumString";
import { cn } from "../lib/utils";

interface MarkdownTextProps {
  text: string;
  className?: string;
}

/**
 * Pre-processes text to convert SCREAMING_SNAKE_CASE enum values
 * (e.g. "FOLLOW_UP" → "Follow Up") before markdown rendering.
 */
function preprocessEnums(text: string): string {
  if (!text) return text;
  const enumPattern = /\b([A-Z]{2,}(?:_[A-Z]{2,})+)\b/g;
  return text.replace(enumPattern, (match) => formatEnumString(match));
}

export default function MarkdownText({ text, className }: MarkdownTextProps) {
  if (!text) return null;

  const processed = preprocessEnums(text);

  return (
    <span className={cn("inline-block whitespace-pre-wrap w-full", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-80 decoration-1 underline-offset-2"
            >
              {children}
            </a>
          ),
          // Use block display for paragraphs to maintain spacing/breaks
          // but wrap in span-compatible tags to avoid hydration warnings
          p: ({ children }) => <span className="block mb-2 last:mb-0">{children}</span>,
          pre: ({ children }) => (
            <span className="block my-2 overflow-x-auto bg-black/5 p-2 rounded">
              {children}
            </span>
          ),
          code: ({ children }) => (
            <code className="bg-black/10 rounded px-1 py-0.5 text-sm font-mono">
              {children}
            </code>
          ),
          ul: ({ children }) => <span className="block my-2 ml-4 list-disc">{children}</span>,
          ol: ({ children }) => <span className="block my-2 ml-4 list-decimal">{children}</span>,
          li: ({ children }) => <span className="block">{children}</span>,
          blockquote: ({ children }) => (
            <span className="block border-l-4 border-black/20 pl-4 my-2 italic">
              {children}
            </span>
          ),
          h1: ({ children }) => <strong className="block text-xl font-bold my-2">{children}</strong>,
          h2: ({ children }) => <strong className="block text-lg font-bold my-2">{children}</strong>,
          h3: ({ children }) => <strong className="block text-base font-bold my-2">{children}</strong>,
          h4: ({ children }) => <strong className="block text-sm font-bold my-2">{children}</strong>,
          h5: ({ children }) => <strong className="block text-xs font-bold my-2">{children}</strong>,
          h6: ({ children }) => <strong className="block text-xs font-bold my-2 italic">{children}</strong>,
        }}
      >
        {processed}
      </ReactMarkdown>
    </span>
  );
}
