"use client";

import { DocumentActivity } from "../types";

const DOCUMENTS: DocumentActivity[] = [
  {
    id: "doc-1",
    title: "Q1 2026 Proposal.pdf",
    type: "pdf",
    category: "Proposal",
    size: "2.4 MB",
    date: "Mar 5, 2026",
    time: "3:15 PM",
    uploadedBy: { name: "You", avatar: "" },
  },
  {
    id: "doc-2",
    title: "Product Demo Screenshot.png",
    type: "image",
    category: "Screenshot",
    size: "1.1 MB",
    date: "Mar 4, 2026",
    time: "10:30 AM",
    uploadedBy: { name: "Sarah Miller", avatar: "img2" },
  },
  {
    id: "doc-3",
    title: "Onboarding Walkthrough.mp4",
    type: "video",
    category: "Training",
    size: "45.2 MB",
    date: "Mar 2, 2026",
    time: "1:00 PM",
    uploadedBy: { name: "You", avatar: "" },
  },
  {
    id: "doc-4",
    title: "Service Agreement v2.pdf",
    type: "pdf",
    category: "Contract",
    size: "890 KB",
    date: "Feb 28, 2026",
    time: "4:45 PM",
    uploadedBy: { name: "John Carter", avatar: "img1" },
  },
  {
    id: "doc-5",
    title: "Meeting Notes - Kickoff.docx",
    type: "document",
    category: "Notes",
    size: "156 KB",
    date: "Feb 25, 2026",
    time: "11:00 AM",
    uploadedBy: { name: "You", avatar: "" },
  },
  {
    id: "doc-6",
    title: "Brand Guidelines.pdf",
    type: "pdf",
    category: "Design",
    size: "5.8 MB",
    date: "Feb 20, 2026",
    time: "9:30 AM",
    uploadedBy: { name: "Sarah Miller", avatar: "img2" },
  },
];

export const useDocuments = () => {
  return { documents: DOCUMENTS };
};
