"use client";

import { useCreditSettings } from "./hooks/useCreditSettings";
import CreditSummary from "./components/CreditSummary";
import CreditUsageChart from "./components/CreditUsageChart";
import DailyTrendChart from "./components/DailyTrendChart";
import UsageBreakdown from "./components/UsageBreakdown";
import Heading from "../../../ui/Heading";
import CreditPurchaseModal from "./components/modal/CreditPurchaseModal";
import CreditPaymentModal from "./components/modal/CreditPaymentModal";
import CreditSuccessModal from "./components/modal/CreditSuccessModal";
import IconActionModal from "../../../modal/IconActionModal";
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";

export default function CreditSettings() {
  const {
    creditStats,
    monthlyUsageData,
    dailyTrendData,
    usageBreakdown,
    activeFilter,
    dailyTrendFilter,
    creditPackages,
    isPurchaseModalOpen,
    purchaseStep,
    selectedPackageId,
    selectedPackage,
    isDownloadModalOpen,
    handlePurchaseCredits,
    handleClosePurchaseModal,
    handleContinuePurchase,
    handleBackToPackages,
    handleCompletePurchase,
    handleDownloadReceipt,
    handleCloseDownloadModal,
    handleSelectPackage,
    handleFilterChange,
    handleDailyTrendFilterChange,
  } = useCreditSettings();

  const icons = useSupabaseIcons();

  return (
    <div className="w-full p-[1rem] lg:p-0 flex flex-col gap-[2.4rem]">
      <div className="mb-[0.8rem]">
        <Heading className="text-[1.6rem] sm:text-[2.4rem] font-bold text-text-secondary">
          Credits
        </Heading>
      </div>

      <CreditSummary stats={creditStats} onPurchase={handlePurchaseCredits} />

      <CreditUsageChart
        data={monthlyUsageData}
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      />

      <div className="grid grid-cols-1 gap-[1.6rem]">
        <DailyTrendChart
          data={dailyTrendData}
          activeFilter={dailyTrendFilter}
          onFilterChange={handleDailyTrendFilterChange}
        />
        <UsageBreakdown items={usageBreakdown} />
      </div>

      <CreditPurchaseModal
        isOpen={isPurchaseModalOpen && purchaseStep === "package"}
        onClose={handleClosePurchaseModal}
        onContinue={handleContinuePurchase}
        packages={creditPackages}
        selectedId={selectedPackageId}
        onSelect={handleSelectPackage}
      />

      <CreditPaymentModal
        isOpen={isPurchaseModalOpen && purchaseStep === "payment"}
        onClose={handleClosePurchaseModal}
        onBack={handleBackToPackages}
        onComplete={handleCompletePurchase}
        selectedPackage={selectedPackage}
      />

      <CreditSuccessModal
        isOpen={isPurchaseModalOpen && purchaseStep === "success"}
        onClose={handleClosePurchaseModal}
        onDownload={handleDownloadReceipt}
        selectedPackage={selectedPackage}
      />

      <IconActionModal
        isOpen={isDownloadModalOpen}
        onClose={handleCloseDownloadModal}
        title="Download Not Available"
        description="The receipt download feature is currently under development. Please check back soon!"
        icon={{
          src: icons.infoCircle2,
          alt: "Info",
        }}
        primaryAction={{
          label: "Got it",
          onClick: handleCloseDownloadModal,
        }}
      />
    </div>
  );
}
