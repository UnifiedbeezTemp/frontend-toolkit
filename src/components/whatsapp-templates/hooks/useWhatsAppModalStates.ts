import { useState } from "react";
import { TemplateFormData } from "../types";

export function useWhatsAppModalStates() {
  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false);
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const [isDiscoverModalOpen, setIsDiscoverModalOpen] = useState(false);
  const [isBeezoraModalOpen, setIsBeezoraModalOpen] = useState(false);
  const [templateToCreate, setTemplateToCreate] = useState<
    TemplateFormData | undefined
  >(undefined);

  const handleSelectionContinue = (type: string) => {
    setIsSelectionModalOpen(false);
    if (type === "create-own") {
      setTemplateToCreate(undefined);
      setIsCreationModalOpen(true);
    } else if (type === "discover") {
      setIsDiscoverModalOpen(true);
    } else if (type === "beezora") {
      setIsBeezoraModalOpen(true);
    }
  };

  const handleUseTemplate = (templateData: TemplateFormData) => {
    setTemplateToCreate(templateData);
    setIsDiscoverModalOpen(false);
    setIsCreationModalOpen(true);
  };

  const handleCreationBack = () => {
    setIsCreationModalOpen(false);
    setIsSelectionModalOpen(true);
  };

  const handleCreationContinue = (data: TemplateFormData) => {
    setIsCreationModalOpen(false);
    setTemplateToCreate(undefined);
  };

  const handleBeezoraCreate = (data: any) => {
    setIsBeezoraModalOpen(false);
    setIsCreationModalOpen(true);
  };

  const openSelection = () => setIsSelectionModalOpen(true);
  const closeSelection = () => setIsSelectionModalOpen(false);
  const closeDiscover = () => setIsDiscoverModalOpen(false);
  const closeCreation = () => setIsCreationModalOpen(false);
  const closeBeezora = () => setIsBeezoraModalOpen(false);

  const openCreationFromDiscover = () => {
    setTemplateToCreate(undefined);
    setIsCreationModalOpen(true);
  };

  return {
    isSelectionModalOpen,
    isCreationModalOpen,
    isDiscoverModalOpen,
    isBeezoraModalOpen,
    templateToCreate,
    handleSelectionContinue,
    handleUseTemplate,
    handleCreationBack,
    handleCreationContinue,
    handleBeezoraCreate,
    openSelection,
    closeSelection,
    closeDiscover,
    closeCreation,
    closeBeezora,
    openCreationFromDiscover,
  };
}
