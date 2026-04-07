import React, { useState } from "react";
import { useBrandKit } from "./context/BrandKitContext";
import BrandCustomizationCard from "./customization/BrandCustomizationCard";
import BrandPreviewCard from "./preview/BrandPreviewCard";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../ui/Button";
import PreLoader from "../ui/PreLoader";

export default function BrandKitContainer() {
  const { isLoading, error, refetch } = useBrandKit();
  const [activeView, setActiveView] = useState<"customization" | "preview">(
    "customization",
  );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40rem] w-full bg-primary border rounded-[1.2rem] border-input-stroke gap-[2rem]">
        <PreLoader isPage={false} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40rem] w-full bg-primary border rounded-[1.2rem] border-input-stroke gap-[2rem]">
        <div className="text-center">
          <p className="text-[1.6rem] font-medium text-error">
            {"Failed to load Brand Kit"}
          </p>
          <p className="text-[1.4rem] text-secondary mt-2">
            Please try again or contact support if the problem persists.
          </p>
        </div>
        <Button onClick={() => refetch()} variant="secondary" className="px-8">
          Retry Connection
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col lg:flex-row gap-[2.4rem] w-full bg-primary sm:border rounded-[1.2rem] border-input-stroke overflow-hidden min-h-[calc(100vh-20rem)] lg:min-h-0 lg:h-[calc(100vh-20rem)]"
    >
      <AnimatePresence mode="wait">
        {activeView === "customization" && (
          <motion.div
            key="customization"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
            className="flex-1 block lg:h-full lg:overflow-hidden scrollbar-hide"
          >
            <BrandCustomizationCard
              onShowPreview={() => setActiveView("preview")}
            />
          </motion.div>
        )}
        {activeView === "preview" && (
          <motion.div
            key="preview"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3 }}
            className="flex-1 block lg:hidden"
          >
            <BrandPreviewCard onBack={() => setActiveView("customization")} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Preview: Always visible */}
      <div className="flex-1 hidden lg:block lg:h-full lg:overflow-y-auto scrollbar-hide">
        <BrandPreviewCard />
      </div>
    </motion.div>
  );
}
