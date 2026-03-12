"use client";

import { useState, useCallback, useEffect } from "react";
import { Contact } from "../../../../types";

export function useContactInfo(contact: Contact) {
  const [firstName, ...lastNameParts] = contact.name.split(" ");
  const initialLastName = lastNameParts.join(" ");

  const [formState, setFormState] = useState({
    firstName: firstName || "",
    lastName: initialLastName || "",
    email: contact.email || "",
    phone: contact.phone || "",
    address: "",
  });

  const [isCopied, setIsCopied] = useState(false);

  const handleInputChange = useCallback(
    (field: keyof typeof formState, value: string) => {
      setFormState((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const copyEmail = useCallback(() => {
    if (!formState.email) return;

    navigator.clipboard.writeText(formState.email).then(() => {
      setIsCopied(true);
    });
  }, [formState.email]);

  useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [isCopied]);

  return {
    formState,
    isCopied,
    handleInputChange,
    copyEmail,
  };
}
