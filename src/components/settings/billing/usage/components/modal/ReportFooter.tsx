"use client";

import Button from "../../../../../ui/Button";
import DownloadIcon from "../../../../../../assets/icons/DownloadIcon";

interface ReportFooterProps {
  onClose: () => void;
  onDownload: () => void;
}

export default function ReportFooter({
  onClose,
  onDownload,
}: ReportFooterProps) {
  return (
    <div className="p-[2.4rem] border-t border-border flex flex-col sm:flex-row gap-[1.2rem] bg-primary sticky bottom-0">
      <Button
        variant="secondary"
        className="w-full"
        onClick={onDownload}
      >
        <DownloadIcon size={18} color="var(--text-secondary)" />
        Download PDF Report
      </Button>
      <Button
        onClick={onClose}
        className="w-full"
      >
        Close Report
      </Button>
    </div>
  );
}
