"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { EmailDraft } from "../types";

export interface UseEmailComposerProps {
  draft: EmailDraft;
  onUpdate: (updates: Partial<EmailDraft>) => void;
  onCancel: () => void;
  onSend: () => void;
}

export type PopoverType = "link" | "image" | "emoji" | null;

export function useEmailComposer({
  draft,
  onUpdate,
  onCancel,
  onSend,
}: UseEmailComposerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [tempCc, setTempCc] = useState("");
  const [tempTo, setTempTo] = useState("");

  const [activeStyles, setActiveStyles] = useState<Record<string, boolean>>({});
  const [activePopover, setActivePopover] = useState<PopoverType>(null);
  const [savedSelection, setSavedSelection] = useState<Range | null>(null);
  const [currentLinkUrl, setCurrentLinkUrl] = useState<string | null>(null);

  const updateActiveStyles = useCallback(() => {
    setActiveStyles({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
      insertOrderedList: document.queryCommandState("insertOrderedList"),
      insertUnorderedList: document.queryCommandState("insertUnorderedList"),
    });
  }, []);

  const saveSelection = useCallback(() => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      setSavedSelection(sel.getRangeAt(0).cloneRange());
    }
  }, []);

  const restoreSelection = useCallback(() => {
    if (savedSelection) {
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(savedSelection);
    }
  }, [savedSelection]);

  const handleAddCc = useCallback(() => {
    if (tempCc) {
      onUpdate({ cc: [...draft.cc, tempCc] });
      setTempCc("");
    }
  }, [tempCc, draft.cc, onUpdate]);

  const handleAddTo = useCallback(() => {
    if (tempTo) {
      onUpdate({ to: [...draft.to, tempTo] });
      setTempTo("");
    }
  }, [tempTo, draft.to, onUpdate]);

  const handleRemoveTo = useCallback(
    (handle: string) => {
      onUpdate({ to: draft.to.filter((h) => h !== handle) });
    },
    [draft.to, onUpdate],
  );

  const handleRemoveCc = useCallback(
    (handle: string) => {
      onUpdate({ cc: draft.cc.filter((h) => h !== handle) });
    },
    [draft.cc, onUpdate],
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        const newFileNames = Array.from(files).map((f) => f.name);
        onUpdate({ attachments: [...draft.attachments, ...newFileNames] });
      }
    },
    [draft.attachments, onUpdate],
  );

  const handleRemoveAttachment = useCallback(
    (fileName: string) => {
      onUpdate({
        attachments: draft.attachments.filter((f) => f !== fileName),
      });
    },
    [draft.attachments, onUpdate],
  );

  const triggerFileSelect = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const toggleExpanded = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const handleEditorChange = useCallback(() => {
    if (editorRef.current) {
      onUpdate({ body: editorRef.current.innerHTML });
    }
    updateActiveStyles();
  }, [onUpdate, updateActiveStyles]);

  const execAction = useCallback(
    (command: string, value?: string) => {
      editorRef.current?.focus();
      if (
        command === "createLink" ||
        command === "insertImage" ||
        command === "emoji"
      ) {
        saveSelection();
        setActivePopover(
          command === "createLink"
            ? "link"
            : command === "insertImage"
              ? "image"
              : "emoji",
        );
      } else {
        document.execCommand(command, false, value);
        handleEditorChange();
      }
    },
    [handleEditorChange, saveSelection],
  );

  const applyCustomAction = useCallback(
    (command: string, value: string) => {
      restoreSelection();
      editorRef.current?.focus();
      if (command === "createLink") {
        try {
          const { url, text } = JSON.parse(value);
          const linkHtml = `<a href="${url}" class="text-primary-blue underline hover:opacity-80 transition-opacity" title="${url}">${text}</a>`;
          document.execCommand("insertHTML", false, linkHtml);
        } catch {
          document.execCommand("createLink", false, value);
        }
      } else if (command === "insertImage") {
        document.execCommand("insertImage", false, value);
      } else if (command === "insertText") {
        document.execCommand("insertText", false, value);
      }
      setActivePopover(null);
      handleEditorChange();
    },
    [restoreSelection, handleEditorChange],
  );

  const handleEditorClick = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "A") {
      setCurrentLinkUrl(target.getAttribute("href"));
    } else {
      setCurrentLinkUrl(null);
    }
  }, []);

  useEffect(() => {
    const onSelectionChange = () => {
      if (document.activeElement === editorRef.current) {
        updateActiveStyles();
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
          let node: Node | null = sel.anchorNode;
          while (node && node !== editorRef.current) {
            if (node.nodeName === "A") {
              setCurrentLinkUrl((node as HTMLAnchorElement).href);
              return;
            }
            node = node.parentNode;
          }
        }
        setCurrentLinkUrl(null);
      }
    };
    document.addEventListener("selectionchange", onSelectionChange);
    return () =>
      document.removeEventListener("selectionchange", onSelectionChange);
  }, [updateActiveStyles]);

  return {
    fileInputRef,
    editorRef,
    focusedField,
    setFocusedField,
    isExpanded,
    tempCc,
    setTempCc,
    tempTo,
    setTempTo,
    activeStyles,
    activePopover,
    setActivePopover,
    handleAddCc,
    handleAddTo,
    handleRemoveTo,
    handleRemoveCc,
    handleFileChange,
    handleRemoveAttachment,
    triggerFileSelect,
    toggleExpanded,
    execAction,
    applyCustomAction,
    handleEditorChange,
    handleEditorClick,
    currentLinkUrl,
    onUpdate,
    onCancel,
    onSend,
    draft,
  };
}
