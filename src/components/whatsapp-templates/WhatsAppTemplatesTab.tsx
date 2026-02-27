"use client";

import React from "react";
import WhatsAppTemplateSelectionModal from "./components/WhatsAppTemplateSelectionModal";
import WhatsAppTemplateCreationModal from "./components/WhatsAppTemplateCreationModal";
import DiscoverTemplatesModal from "./components/DiscoverTemplatesModal";
import BeezoraCreateModal from "./components/BeezoraCreateModal";
import { TemplatesDashboard } from "./components/TemplatesDashboard";
import { useWhatsAppTemplates } from "./hooks/useWhatsAppTemplates";
import { useWhatsAppModalStates } from "./hooks/useWhatsAppModalStates";
import GeneralTemplatesDashboard from "./components/GeneralTemplatesDashboard";
import GeneralTemplateCreationModal from "./components/GeneralTemplateCreationModal";
import { useGeneralTemplates } from "./hooks/useGeneralTemplates";

import { WhatsAppTemplatesTabProps } from "./types";

export default function WhatsAppTemplatesTab({
  activeView,
  onViewChange,
}: WhatsAppTemplatesTabProps) {
  const g = useGeneralTemplates();
  const w = useWhatsAppTemplates();
  const m = useWhatsAppModalStates();

  const handleOpenGeneralCreation = () => g.handleOpenCreation();

  return (
    <div className="w-full">
      {activeView === "whatsapp" && (
        <>
          <TemplatesDashboard
            accounts={w.accounts}
            selectedAccount={w.selectedAccount}
            onAccountChange={w.handleAccountChange}
            onCreateClick={m.openSelection}
            templates={w.templates}
            searchQuery={w.searchQuery}
            onSearchChange={w.handleSearchChange}
            categoryFilter={w.categoryFilter}
            setCategoryFilter={w.setCategoryFilter}
            statusFilter={w.statusFilter}
            setStatusFilter={w.setStatusFilter}
            resetFilters={w.resetFilters}
            selectedTemplateIds={w.selectedTemplateIds}
            onToggleSelect={w.handleToggleSelect}
            onToggleAll={w.handleToggleAll}
            onDelete={w.handleDelete}
            currentPage={w.currentPage}
            totalPages={w.totalPages}
            onPageChange={w.setCurrentPage}
          />
          <WhatsAppTemplateSelectionModal
            isOpen={m.isSelectionModalOpen}
            onClose={m.closeSelection}
            onContinue={m.handleSelectionContinue}
          />
          <DiscoverTemplatesModal
            isOpen={m.isDiscoverModalOpen}
            onClose={m.closeDiscover}
            onUseTemplate={m.handleUseTemplate}
            onCreateNewTemplate={m.openCreationFromDiscover}
          />
          <BeezoraCreateModal
            isOpen={m.isBeezoraModalOpen}
            onClose={m.closeBeezora}
            onCreate={m.handleBeezoraCreate}
          />
          <WhatsAppTemplateCreationModal
            isOpen={m.isCreationModalOpen}
            onClose={m.closeCreation}
            onBack={m.handleCreationBack}
            onContinue={m.handleCreationContinue}
            initialData={m.templateToCreate}
          />
        </>
      )}

      {activeView === "general" && (
        <>
          <GeneralTemplatesDashboard
            templates={g.templates}
            searchQuery={g.generalSearch}
            onSearchChange={(e) => g.setGeneralSearch(e.target.value)}
            categoryFilter={g.categoryFilter}
            setCategoryFilter={g.setCategoryFilter}
            statusFilter={g.statusFilter}
            setStatusFilter={g.setStatusFilter}
            resetFilters={g.resetFilters}
            selectedTemplateIds={g.selectedGeneralIds}
            onToggleSelect={g.handleToggleSelect}
            onToggleAll={g.handleToggleAll}
            onDelete={() => {}}
            currentPage={g.generalPage}
            totalPages={1}
            onPageChange={g.setGeneralPage}
            onCreateClick={g.handleOpenCreation}
          />
          <GeneralTemplateCreationModal
            isOpen={g.isGeneralCreationOpen}
            onClose={g.handleCloseCreation}
            onCreate={g.addTemplate}
          />
        </>
      )}
    </div>
  );
}
