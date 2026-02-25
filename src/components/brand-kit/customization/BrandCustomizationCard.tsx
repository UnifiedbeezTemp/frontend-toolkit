"use client";

import React, { useState } from "react";
import BrandColors from "./sub-components/BrandColors";
import BrandFont from "./sub-components/BrandFont";
import SocialLinks from "./sub-components/SocialLinks";
import ButtonColors from "./sub-components/colors/ButtonColors";
import { useBrandKit } from "../BrandKitContext";
import { cn } from "../../../lib/utils";
import Heading from "../../ui/Heading";
import Text from "../../ui/Text";
import ImageComponent from "../../ui/ImageComponent";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import CompanyLogo from "./sub-components/CompanyLogo";
import { motion, AnimatePresence } from "framer-motion";
import WebsiteImport from "./sub-components/WebsiteImport";

interface Props {
  onShowPreview?: () => void;
}

type TabType = "logo" | "colors" | "fonts" | "links";


export default function BrandCustomizationCard({ onShowPreview }: Props) {
  const { colorHandlers } = useBrandKit();
  const icons = useSupabaseIcons();
  const [activeTab, setActiveTab] = useState<TabType>("logo");

  const tabs = [
    { id: "logo", label: "Company Logo" },
    { id: "colors", label: "Brand Colors" },
    { id: "fonts", label: "Brand Font" },
    { id: "links", label: "Social Links" },
  ] as const;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex flex-col h-full">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-[3.2rem] sm:p-[2.4rem] flex-1 overflow-y-auto overflow-x-hidden"
      >
        <motion.div variants={itemVariants}>
          <WebsiteImport />
        </motion.div>

        <div className="flex lg:hidden overflow-x-auto items-center gap-[2.4rem] border sm:rounded-[.8rem] border-input-stroke no-scrollbar px-[1rem] py-[.5rem] w-screen sm:w-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={cn(
                "whitespace-nowrap py-[.5rem] px-[1rem] text-[1.4rem] font-[500] transition-all relative rounded-[0.8rem]",
                activeTab === tab.id
                  ? "border border-input-stroke bg-soft-green/10"
                  : "text-text-secondary hover:bg-muted/5",
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 border border-input-stroke rounded-[0.8rem] -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Desktop: Show all | Mobile: Show active tab */}
        <div className="flex flex-col gap-[3.2rem] px-[1rem] lg:px-0 pb-[1.6rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              <div className={cn(activeTab !== "logo" && "hidden lg:block")}>
                <motion.div variants={itemVariants}>
                  <CompanyLogo />
                </motion.div>
              </div>

              <div className={cn(activeTab !== "colors" && "hidden lg:block")}>
                <motion.div
                  variants={itemVariants}
                  className="flex flex-col gap-[3.2rem]"
                >
                  <BrandColors />
                  <ButtonColors {...colorHandlers.button} />
                </motion.div>
              </div>

              <div className={cn(activeTab !== "fonts" && "hidden lg:block")}>
                <motion.div variants={itemVariants}>
                  <BrandFont />
                </motion.div>
              </div>

              <div className={cn(activeTab !== "links" && "hidden lg:block")}>
                <motion.div variants={itemVariants}>
                  <SocialLinks />
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Email preview card (mobile only) */}
          <motion.div
            variants={itemVariants}
            onClick={onShowPreview}
            className="lg:hidden flex items-center justify-between p-[1.5rem] bg-primary border border-input-stroke rounded-[1.2rem] cursor-pointer hover:border-brand-primary transition-all shadow-sm group"
          >
            <div className="flex items-center gap-[1.5rem]">
              <div className="w-[4.8rem] h-[4.8rem] bg-soft-green/30 rounded-[1rem] flex items-center justify-center group-hover:scale-110 transition-transform">
                <ImageComponent
                  src={icons.monitor}
                  alt="preview"
                  width={24}
                  height={24}
                />
              </div>
              <div className="flex flex-col gap-[0.2rem]">
                <Heading size="xs">Email preview</Heading>
                <Text size="xs" className="text-text-secondary">
                  Click to see how it looks
                </Text>
              </div>
            </div>
            <div className="w-[3.2rem] h-[3.2rem] rounded-full flex items-center justify-center bg-muted/10 group-hover:translate-x-1 transition-all">
              <ImageComponent
                src={icons.arrowRight}
                alt="arrow"
                width={16}
                height={16}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
