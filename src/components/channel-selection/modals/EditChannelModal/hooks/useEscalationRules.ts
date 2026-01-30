import { useState, useCallback, useEffect } from "react";
import { useAppSelector } from "../../../../../store/hooks/useRedux";
import { useTeamMembers } from "../../../../members/hooks/useTeamMembers";

export function useEscalationRules() {
  const { refetchMembers } = useTeamMembers();
  const members = useAppSelector((state) => state.members.members);

  useEffect(() => {
    refetchMembers();
  }, []);

  const [unansweredMessages, setUnansweredMessages] = useState<string | null>(
    null,
  );
  const [keywords, setKeywords] = useState<string[]>([]);
  const [noReplyTime, setNoReplyTime] = useState<string | null>(null);
  const [backupContacts, setBackupContacts] = useState<string[]>([]);

  const handleUnansweredChange = useCallback((value: string) => {
    setUnansweredMessages(value);
  }, []);

  const handleKeywordsChange = useCallback((newKeywords: string[]) => {
    setKeywords(newKeywords);
  }, []);

  const handleNoReplyTimeChange = useCallback((value: string) => {
    setNoReplyTime(value);
  }, []);

  const handleBackupContactsChange = useCallback((memberIds: string[]) => {
    setBackupContacts(memberIds);
  }, []);

  return {
    unansweredMessages,
    keywords,
    noReplyTime,
    backupContacts,
    members,
    handleUnansweredChange,
    handleKeywordsChange,
    handleNoReplyTimeChange,
    handleBackupContactsChange,
  };
}
