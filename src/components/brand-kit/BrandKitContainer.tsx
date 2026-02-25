import React from "react";
import { cn } from "../../lib/utils";
import { BrandKitProvider } from "./BrandKitContext";
import BrandCustomizationCard from "./customization/BrandCustomizationCard";
import BrandPreviewCard from "./preview/BrandPreviewCard";
import { motion, AnimatePresence } from "framer-motion";

export default function BrandKitContainer() {
  const [activeView, setActiveView] = React.useState<
    "customization" | "preview"
  >("customization");

  return (
    <BrandKitProvider>
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col lg:flex-row gap-[2.4rem] w-full bg-primary sm:border rounded-[1.2rem] border-input-stroke overflow-hidden min-h-[calc(100vh-20rem)] lg:min-h-0"
      >
        <AnimatePresence mode="wait">
          {activeView === "customization" && (
            <motion.div
              key="customization"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className="flex-1 block"
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
        <div className="flex-1 hidden lg:block">
          <BrandPreviewCard />
        </div>
      </motion.div>
    </BrandKitProvider>
  );
}
