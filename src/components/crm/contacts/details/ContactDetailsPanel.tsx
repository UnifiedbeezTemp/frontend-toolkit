import React from "react";
import { useContactDetails } from "./hooks/useContactDetails";
import ContactDetailsSidepanel from "./sidepanel/ContactDetailsSidepanel";
import ContactDetailsContent from "./content/ContactDetailsContent";

export default function ContactDetailsPanel() {
  const { contact } = useContactDetails();

  if (!contact) {
    return (
      <div className="p-[2.4rem] text-center">
        <h2 className="text-[2rem] font-bold text-dark-base-70">
          Contact not found
        </h2>
      </div>
    );
  }

  return (
    <div className="lg:flex flex-col lg:flex-row w-full lg:h-[calc(100vh-18rem)] overflow-hidden">
      <div className="w-full lg:w-[25%] h-full lg:overflow-y-auto custom-scrollbar">
        <ContactDetailsSidepanel />
      </div>

      <div className="w-full lg:w-[75%] h-full overflow-y-auto custom-scrollbar ">
        <ContactDetailsContent />
      </div>
    </div>
  );
}
