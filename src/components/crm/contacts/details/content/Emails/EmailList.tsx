"use client";

import React from "react";
import EmailItem from "./EmailItem";
import { EmailActivity } from "../types";
import Text from "../../../../../ui/Text";
import Button from "../../../../../ui/Button";
import ImageComponent from "../../../../../ui/ImageComponent";
import { useSupabaseIcons } from "../../../../../../lib/supabase/useSupabase";

interface EmailListProps {
  emails: EmailActivity[];
  onSendEmail: () => void;
}

export default function EmailList({ emails, onSendEmail }: EmailListProps) {
  const icons = useSupabaseIcons() as Record<string, string>;

  return (
    <div className="flex flex-col gap-[1.6rem]">
      <div className="flex items-center justify-between px-[0.4rem]">
        <Text className="text-[2rem] font-bold text-text-secondary">
          Emails ({emails.length})
        </Text>
        <Button
          variant="secondary"
          onClick={onSendEmail}
          className="flex items-center gap-[0.8rem] h-[4rem] px-[1.2rem] sm:px-[1.6rem] rounded-[0.8rem] border border-input-stroke bg-primary hover:bg-gray-50"
        >
          <ImageComponent
            src={icons.plus}
            alt="new"
            width={16}
            height={16}
            className="brightness-0"
          />
          <span className="hidden sm:inline text-[1.4rem] font-bold text-text-primary">
            Send e-mail
          </span>
        </Button>
      </div>

      <div className="flex flex-col">
        {emails.length > 0 ? (
          emails.map((email, index) => (
            <EmailItem
              key={email.id}
              email={email}
              isLast={index === emails.length - 1}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-[6rem] bg-primary border border-dashed border-border rounded-[1.2rem]">
            <Text className="text-[1.6rem] text-dark-base-40 font-medium">
              No emails found matching your search
            </Text>
          </div>
        )}
      </div>
    </div>
  );
}
