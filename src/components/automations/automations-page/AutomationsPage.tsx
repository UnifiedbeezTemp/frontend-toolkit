"use client";

import Head from "./Head";
import AIInput from "./AIInput";
import TemplateList from "./TemplateList";
import { AnimatePresence, motion } from "framer-motion";
import { useAutomationsPage } from "./hooks/useAutomationsPage";

export default function AutomationsPage() {
  const { icons } = useAutomationsPage();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        className="h-full mb-[10rem] mt-[9rem] px-4"
      >
        <Head />

        <div className="w-full md:w-[60%] lg:w-[50%] mx-auto transition-all duration-300">
          <AIInput sendIcon={icons.send2} />

          <div className="flex items-center gap-2 my-[2.4rem]">
            <div className="h-[1px] w-full bg-input-stroke" />
            <span className="text-[1.4rem] text-text-secondary">or</span>
            <div className="h-[1px] w-full bg-input-stroke" />
          </div>
        </div>

        <TemplateList icons={icons} />
      </motion.div>
    </AnimatePresence>
  );
}
