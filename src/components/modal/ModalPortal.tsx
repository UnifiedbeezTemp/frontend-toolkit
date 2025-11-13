"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

interface ModalPortalProps {
  children: React.ReactNode;
  isOpen: boolean;
}

export default function ModalPortal({ children, isOpen }: ModalPortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted || !isOpen) return null;

  return createPortal(
    children,
    document.body
  );
}