import React from "react";
import CreateOwnTemplateIcon from "@/shared/src/assets/icons/CreateOwnTemplateIcon";
import DiscoverTemplatesIcon from "@/shared/src/assets/icons/DiscoverTemplatesIcon";
import BeezoraCreateIcon from "@/shared/src/assets/icons/BeezoraCreateIcon";

export interface SelectionOption {
  id: string;
  title: string;
  description: string;
  icon: (isActive: boolean) => React.ReactNode;
}

export const getSelectionOptions = (): SelectionOption[] => [
  {
    id: "create-own",
    title: "Create your own template",
    description: "Create your own Whatsapp template from scratch",
    icon: (isActive: boolean) => (
      <CreateOwnTemplateIcon isActive={isActive} size={32} />
    ),
  },
  {
    id: "discover",
    title: "Discover popular templates",
    description: "Choose a template from our exclusive templates.",
    icon: (isActive: boolean) => (
      <DiscoverTemplatesIcon isActive={isActive} size={32} />
    ),
  },
  {
    id: "beezora",
    title: "Let Beezora Create a template",
    description: "Create your own Whatsapp template from scratch",
    icon: (isActive: boolean) => (
      <BeezoraCreateIcon isActive={isActive} size={32} />
    ),
  },
];
