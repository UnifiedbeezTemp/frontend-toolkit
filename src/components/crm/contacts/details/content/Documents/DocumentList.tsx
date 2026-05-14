"use client";

import React from "react";
import Text from "../../../../../ui/Text";
import DocumentItem from "./DocumentItem";
import DocumentPreviewModal from "./DocumentPreviewModal";
import { useDocumentList } from "../hooks/useDocumentList";
import type { DocumentActivity } from "../types";

interface DocumentListProps {
  contactName: string;
  contactAvatar: string;
  documents?: DocumentActivity[];
}

export default function DocumentList({
  contactName,
  contactAvatar,
  documents: initialDocuments,
}: DocumentListProps) {
  const {
    documents,
    documentCount,
    previewDocument,
    handlePreview,
    handleClosePreview,
  } = useDocumentList(initialDocuments);

  return (
    <div className="flex flex-col gap-[2.4rem]">
      <Text className="text-[2rem] font-bold text-text-secondary">
        Documents ({documentCount})
      </Text>
      <div className="flex flex-col gap-[1.6rem]">
        {documents.length > 0 ? (
          documents.map((doc) => (
            <DocumentItem
              key={doc.id}
              document={doc}
              contactName={contactName}
              contactAvatar={contactAvatar}
              onPreview={() => handlePreview(doc)}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-[6rem] bg-primary border border-dashed border-border rounded-[1.2rem]">
            <Text className="text-[1.6rem] text-dark-base-40 font-medium">
              No documents yet
            </Text>
          </div>
        )}
      </div>

      <DocumentPreviewModal
        isOpen={!!previewDocument}
        onClose={handleClosePreview}
        documentTitle={previewDocument?.title || ""}
      />
    </div>
  );
}
