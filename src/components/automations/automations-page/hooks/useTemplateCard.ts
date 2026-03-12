import { useState } from "react";
import { Template } from "../utils/data";
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";
import { useAutomationRedirection } from "../../hooks/useAutomationRedirection";

export const useTemplateCard = () => {
  const [showModal, setShowModal] = useState(false);
  const icons = useSupabaseIcons();
  const { handleRedirection, handleGoToDashboard } = useAutomationRedirection();

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleGetStarted = (template: Template) => {
    handleRedirection(template.title);
  };

  return {
    showModal,
    openModal,
    closeModal,
    handleGetStarted,
    handleGoToDashboard,
    icons,
  };
};
