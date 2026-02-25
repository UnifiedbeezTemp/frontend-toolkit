"use client";

import { useState } from "react";
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";
import { useAutomation } from "../../context/AutomationContext";

export const useCreateAutomationModal = () => {
  const { isCreateModalOpen, openCreateModal, closeCreateModal } =
    useAutomation();
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0);
  const supabaseIcons = useSupabaseIcons();

  const openModal = openCreateModal;
  const closeModal = closeCreateModal;
  const showCreateModal = isCreateModalOpen;

  const templates = [
    {
      title: "Build Your Flow",
      description:
        "Automatically follow up with contacts based on their product interests. Once a product tag is added, BeeBot sends personalized messages that match what they care about.",
      tag: "Start from Scratch",
      image: supabaseIcons.copy,
    },
    {
      title: "BeeBot Follow-Up on Product Tags",
      description:
        "Tailor your follow-up flow to match contact interests. This automation kicks in when a product interest is tagged, keeping your messages timely and relevant.",
      tag: "Start from Scratch",
      image: supabaseIcons.envelope,
      icon: supabaseIcons.cart,
    },
    {
      title: "BeeTag: First Contact Labeling",
      description:
        "Track and tag your contacts automatically based on how they engage. Use these real-time tags to power smarter segmentation and insights.",
      tag: "Any Industry",
      image: supabaseIcons.envelope,
      icon: supabaseIcons.redTag,
    },
    {
      title: "BeeTag: First Contact Labeling 2",
      description:
        "Let BeeBot tag contacts by their level of interaction—opens, clicks, replies. These tags help you identify your most active (or quiet) users for better targeting.",
      tag: "Start from Scratch",
      image: supabaseIcons.envelope,
      icon: supabaseIcons.redTag,
    },
  ];

  return {
    showCreateModal,
    openModal,
    closeModal,
    templates,
    selectedTemplateIndex,
    setSelectedTemplateIndex,
  };
};
