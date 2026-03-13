import React from "react";

export interface WhatsAppAccount {
  id: string;
  name: string;
  icon: string;
}

export interface WhatsAppTemplate {
  id: string;
  name: string;
  category: string;
  language: string;
  status: "Approved" | "Pending" | "Rejected";
}

export interface TemplateButton {
  type: "Quick reply" | "URL" | "Phone number";
  text: string;
  url?: string;
  phone?: string;
}

export interface TemplateFormData {
  account: string;
  name: string;
  category: string;
  language: string;
  message: string;
  hasAttachment: boolean;
  headerType: "attachment" | "headline";
  attachmentType: "image" | "video" | "pdf";
  headline: string;
  hasFooter: boolean;
  footerText: string;
  hasButton: boolean;
  buttons: TemplateButton[];
  folder: string;
}

export type HandleChange = <K extends keyof TemplateFormData>(
  field: K,
  value: TemplateFormData[K],
) => void;

export interface WhatsAppTemplatesTabProps {
  activeView: "whatsapp" | "general";
  onViewChange: (view: string) => void;
}

export interface WhatsAppTemplatesControlsProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  categoryFilter: string;
  setCategoryFilter: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  resetFilters: () => void;
}

export interface TemplatesDashboardProps {
  accounts: WhatsAppAccount[];
  selectedAccount: WhatsAppAccount;
  onAccountChange: (id: string) => void;
  onCreateClick: () => void;
  templates: WhatsAppTemplate[];
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  categoryFilter: string;
  setCategoryFilter: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  resetFilters: () => void;
  selectedTemplateIds: string[];
  onToggleSelect: (id: string) => void;
  onToggleAll: () => void;
  onDelete: (id: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface GeneralTemplatesDashboardProps {
  onCreateClick: () => void;
  templates: WhatsAppTemplate[];
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  categoryFilter: string;
  setCategoryFilter: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  resetFilters: () => void;
  selectedTemplateIds: string[];
  onToggleSelect: (id: string) => void;
  onToggleAll: () => void;
  onDelete: (id: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
