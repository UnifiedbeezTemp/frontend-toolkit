"use client";

import { useState } from "react";
import { useDocuments } from "./useDocuments";
import { DocumentActivity } from "../types";

export const useDocumentList = (initialDocuments?: DocumentActivity[]) => {
  const { documents: allDocuments } = useDocuments();
  const documents = initialDocuments || allDocuments;
  const [previewDocument, setPreviewDocument] =
    useState<DocumentActivity | null>(null);

  const documentCount = documents.length;

  const handlePreview = (doc: DocumentActivity) => {
    setPreviewDocument(doc);
  };

  const handleClosePreview = () => {
    setPreviewDocument(null);
  };

  return {
    documents,
    documentCount,
    previewDocument,
    handlePreview,
    handleClosePreview,
  };
};
