import React from "react";

/**
 * Parses simple markdown syntax and returns React elements.
 * Supports:
 * - Bold: **text** or __text__
 * - Links: URLs are auto-linked
 * - Italic: *text* or _text_
 */
export function parseSimpleMarkdown(text: string): React.ReactNode {
  if (!text) return text;

  // Split by markdown patterns and rebuild as React elements
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  // Pattern for bold (**text** or __text__), italic (*text* or _text_), and URLs
  const patterns = [
    { regex: /\*\*(.+?)\*\*/g, render: (match: string) => <strong key={key++}>{match}</strong> },
    { regex: /__(.+?)__/g, render: (match: string) => <strong key={key++}>{match}</strong> },
    { regex: /(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, render: (match: string) => <em key={key++}>{match}</em> },
    { regex: /(?<!_)_(?!_)(.+?)(?<!_)_(?!_)/g, render: (match: string) => <em key={key++}>{match}</em> },
  ];

  // Process the text character by character looking for patterns
  const combinedRegex = /(\*\*(.+?)\*\*|__(.+?)__|(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)|(?<!_)_(?!_)(.+?)(?<!_)_(?!_)|(https?:\/\/[^\s]+))/g;
  
  let lastIndex = 0;
  let match;

  while ((match = combinedRegex.exec(text)) !== null) {
    // Add text before this match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const fullMatch = match[0];
    
    // Bold (**text** or __text__)
    if (fullMatch.startsWith("**") && fullMatch.endsWith("**")) {
      parts.push(<strong key={key++}>{fullMatch.slice(2, -2)}</strong>);
    } else if (fullMatch.startsWith("__") && fullMatch.endsWith("__")) {
      parts.push(<strong key={key++}>{fullMatch.slice(2, -2)}</strong>);
    }
    // URL
    else if (fullMatch.startsWith("http://") || fullMatch.startsWith("https://")) {
      parts.push(
        <a 
          key={key++} 
          href={fullMatch} 
          target="_blank" 
          rel="noopener noreferrer"
          className="underline hover:opacity-80"
        >
          {fullMatch}
        </a>
      );
    }
    // Italic (*text* or _text_)
    else if ((fullMatch.startsWith("*") && fullMatch.endsWith("*")) || 
             (fullMatch.startsWith("_") && fullMatch.endsWith("_"))) {
      parts.push(<em key={key++}>{fullMatch.slice(1, -1)}</em>);
    }

    lastIndex = match.index + fullMatch.length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}
