import MessagingUsage from "./components/MessagingUsage";
import EmailUsage from "./components/EmailUsage";
import CrmUsage from "./components/CrmUsage";
import TeamUsage from "./components/TeamUsage";
import UsageSummary from "./components/UsageSummary";
import FullUsageReportModal from "./components/modal/FullUsageReportModal";
import BuyMessagesModal from "./components/modal/BuyMessagesModal";
import BuyEmailsModal from "./components/modal/BuyEmailsModal";
import BuyContactsModal from "./components/modal/BuyContactsModal";
import { useUsageSettings } from "./hooks/useUsageSettings";
import Heading from "../../../ui/Heading";

export default function UsageSettings() {
  const {
    messagingUsage,
    emailUsage,
    crmUsage,
    teamUsage,
    usageSummary,
    usageReport,
    isReportModalOpen,
    setIsReportModalOpen,
    isBuyMessagesModalOpen,
    setIsBuyMessagesModalOpen,
    messagePackages,
    selectedPackageId,
    setSelectedPackageId,
    isBuyEmailsModalOpen,
    setIsBuyEmailsModalOpen,
    emailPackages,
    selectedEmailPackageId,
    setSelectedEmailPackageId,
    isBuyContactsModalOpen,
    setIsBuyContactsModalOpen,
    contactPackages,
    selectedContactPackageId,
    setSelectedContactPackageId,
  } = useUsageSettings();

  return (
    <div className="w-full p-[1rem] lg:p-0 flex flex-col gap-[2.4rem]">
      <div className="flex flex-col gap-[0.8rem]">
        <Heading className="text-[2.4rem] font-bold text-text-secondary">
          Usage
        </Heading>
      </div>

      <div className="grid grid-cols-1 gap-[2.4rem]">
        <MessagingUsage
          data={messagingUsage}
          onBuyMore={() => setIsBuyMessagesModalOpen(true)}
        />
        <EmailUsage
          data={emailUsage}
          onBuyMore={() => setIsBuyEmailsModalOpen(true)}
        />
        <CrmUsage
          data={crmUsage}
          onBuyMore={() => setIsBuyContactsModalOpen(true)}
        />
        <TeamUsage data={teamUsage} />
        <UsageSummary
          data={usageSummary}
          onViewReport={() => setIsReportModalOpen(true)}
        />
      </div>

      <FullUsageReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        reportData={usageReport}
        messaging={messagingUsage}
        email={emailUsage}
        crm={crmUsage}
        team={teamUsage}
      />

      <BuyMessagesModal
        isOpen={isBuyMessagesModalOpen}
        onClose={() => setIsBuyMessagesModalOpen(false)}
        usage={messagingUsage.sms}
        packages={messagePackages}
        selectedPackageId={selectedPackageId}
        onSelectPackage={(id) => setSelectedPackageId(id)}
      />

      <BuyEmailsModal
        isOpen={isBuyEmailsModalOpen}
        onClose={() => setIsBuyEmailsModalOpen(false)}
        usage={emailUsage.monthlySends}
        packages={emailPackages}
        selectedPackageId={selectedEmailPackageId}
        onSelectPackage={(id) => setSelectedEmailPackageId(id)}
      />

      <BuyContactsModal
        isOpen={isBuyContactsModalOpen}
        onClose={() => setIsBuyContactsModalOpen(false)}
        usage={crmUsage.contacts}
        packages={contactPackages}
        selectedPackageId={selectedContactPackageId}
        onSelectPackage={(id) => setSelectedContactPackageId(id)}
      />
    </div>
  );
}
