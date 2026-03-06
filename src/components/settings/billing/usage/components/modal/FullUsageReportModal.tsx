"use client";

import { useState } from "react";
import Modal from "../../../../../modal/Modal";
import ReportHeader from "./ReportHeader";
import ReportSummaryCards from "./ReportSummaryCards";
import ReportDetailedSections from "./ReportDetailedSections";
import ReportInsights from "./ReportInsights";
import ReportFooter from "./ReportFooter";
import IconActionModal from "../../../../../modal/IconActionModal";
import { useSupabaseIcons } from "../../../../../../lib/supabase/useSupabase";
import {
  UsageReportData,
  MessagingUsageData,
  EmailUsageData,
  CrmUsageData,
  TeamUsageData,
} from "../../hooks/useUsageSettings";

interface FullUsageReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportData: UsageReportData;
  messaging: MessagingUsageData;
  email: EmailUsageData;
  crm: CrmUsageData;
  team: TeamUsageData;
}

export default function FullUsageReportModal({
  isOpen,
  onClose,
  reportData,
  messaging,
  email,
  crm,
  team,
}: FullUsageReportModalProps) {
  const icons = useSupabaseIcons();
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xxl"
        className="overflow-hidden w-full lg:w-[85.2rem] !p-0 h-[98dvh] sm:h-auto rounded-t-[2rem] sm:rounded-t-auto"
        bottomSheet
      >
        <ReportHeader
          period={reportData.period}
          daysRemaining={reportData.daysRemaining}
          onClose={onClose}
        />

        <div className="p-[2.4rem] space-y-[3.2rem] pb-[4.8rem]">
          <ReportSummaryCards summaries={reportData.summaries} />

          <ReportDetailedSections
            messaging={messaging}
            email={email}
            crm={crm}
            team={team}
          />

          <ReportInsights insights={reportData.insights} />
        </div>

        <ReportFooter
          onClose={onClose}
          onDownload={() => setIsDownloadModalOpen(true)}
        />
      </Modal>

      <IconActionModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        title="Download Not Available"
        description="This feature is not yet available to you!"
        icon={{ src: icons.infoCircle2, alt: "info" }}
        primaryAction={{
          label: "Close",
          onClick: () => setIsDownloadModalOpen(false),
        }}
      />
    </>
  );
}
