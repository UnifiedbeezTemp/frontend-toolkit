"use client";

import { useState } from "react";
import { useContactContent } from "./hooks/useContactContent";
import ContentSearch from "./sub-components/ContentSearch";
import ContentTabs from "./sub-components/ContentTabs";
import { useContactDetails } from "../hooks/useContactDetails";
import ActivityTimeline from "./Activity/ActivityTimeline";
import EmailList from "./Emails/EmailList";
import EmailComposer from "./Emails/EmailComposer/EmailComposer";
import CommunicationList from "./Communication/CommunicationList";
import DocumentList from "./Documents/DocumentList";
import { getDummyContactDetails } from "./mockData";
import TaskSection from "./Tasks/TaskSection";
import { EmailActivity, EmailDraft } from "./types";

const EMPTY_DRAFT: EmailDraft = {
  to: [],
  cc: [],
  subject: "",
  body: "",
  attachments: [],
};

export default function ContactDetailsContent() {
  const { contact } = useContactDetails();
  const { activeTab, searchQuery, handleTabChange, handleSearchChange } =
    useContactContent();

  const [isComposing, setIsComposing] = useState(false);
  const [emailDraft, setEmailDraft] = useState<EmailDraft>(EMPTY_DRAFT);
  const [sentEmails, setSentEmails] = useState<EmailActivity[]>([]);

  if (!contact) return null;

  const dummyDetails = getDummyContactDetails(contact.id);
  const allEmails = [...sentEmails, ...dummyDetails.emails];

  // Filtering logic
  const query = searchQuery.toLowerCase();

  const filteredActivities = dummyDetails.activities.filter(
    (a) =>
      a.title.toLowerCase().includes(query) ||
      a.description.toLowerCase().includes(query),
  );

  const filteredEmails = allEmails.filter(
    (e) =>
      e.subject.toLowerCase().includes(query) ||
      e.preview.toLowerCase().includes(query),
  );

  const filteredCommunications = dummyDetails.communications.filter(
    (c) =>
      c.title.toLowerCase().includes(query) ||
      c.description.toLowerCase().includes(query),
  );

  const filteredDocuments = dummyDetails.documents.filter((d) =>
    d.title.toLowerCase().includes(query),
  );

  const handleSendEmail = () => {
    setEmailDraft({ ...EMPTY_DRAFT, to: [dummyDetails.handle] });
    setIsComposing(true);
  };

  const handleCancelComposer = () => {
    setIsComposing(false);
    setEmailDraft(EMPTY_DRAFT);
  };

  const handleSend = () => {
    if (!emailDraft.subject && !emailDraft.body) return;

    const newEmail: EmailActivity = {
      id: `sent-${Date.now()}`,
      subject: emailDraft.subject || "(No Subject)",
      preview: emailDraft.body.replace(/<[^>]*>/g, "").slice(0, 120) || "...",
      date: "Just now",
      status: "read",
      senderName: "You",
      senderHandle: "@you",
      senderAvatar: "",
    };

    setSentEmails((prev) => [newEmail, ...prev]);
    setIsComposing(false);
    setEmailDraft(EMPTY_DRAFT);
  };

  const handleUpdateDraft = (updates: Partial<EmailDraft>) => {
    setEmailDraft((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div className="h-full flex flex-col gap-[2.4rem] lg:p-[2.4rem] bg-primary">
      {/* {!isComposing && ( */}
      <>
        <ContentSearch
          value={searchQuery}
          onChange={handleSearchChange}
          onFilterClick={() => console.log("Filter clicked")}
        />
        <ContentTabs activeTab={activeTab} onTabChange={handleTabChange} />
      </>
      {/* )} */}

      <div className="p-[1rem] sm:p-[2.4rem]">
        {isComposing ? (
          <EmailComposer
            draft={emailDraft}
            onUpdate={handleUpdateDraft}
            onCancel={handleCancelComposer}
            onSend={handleSend}
            contactName={dummyDetails.name}
          />
        ) : (
          <>
            {activeTab === "activity" && (
              <ActivityTimeline
                activities={filteredActivities}
                contactName={dummyDetails.name}
                contactAvatar="img1"
                onSelectActivity={(id) => console.log("Selected:", id)}
              />
            )}

            {activeTab === "tasks" && (
              <TaskSection
                contactId={dummyDetails.id}
                searchQuery={searchQuery}
              />
            )}

            {activeTab === "emails" && (
              <EmailList
                emails={filteredEmails}
                onSendEmail={handleSendEmail}
              />
            )}

            {activeTab === "communication" && (
              <CommunicationList communications={filteredCommunications} />
            )}

            {activeTab === "documents" && (
              <DocumentList
                contactName={dummyDetails.name}
                contactAvatar="img1"
                documents={filteredDocuments}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
