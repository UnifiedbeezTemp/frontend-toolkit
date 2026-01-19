"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../../lib/utils";
import { PlayButtonOverlayProps } from "../types";
import ImageComponent from "../../ui/ImageComponent";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import Text from "../../ui/Text";

export default function PlayButtonOverlay({
  isPlaying,
  isLoading,
  onClick,
  accentColor = "rgb(0, 100, 80)",
}: PlayButtonOverlayProps) {
  const icons = useSupabaseIcons();
  return (
    <AnimatePresence>
      {(!isPlaying || isLoading) && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer"
          onClick={onClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          aria-label={isLoading ? "Loading video" : "Play video"}
        >
          {isLoading ? (
            <div className="w-[7rem] h-[7rem] sm:w-[9rem] sm:h-[9rem] bg-primary rounded-full flex items-center justify-center shadow-2xl">
              <motion.div
                className="w-[5rem] h-[5rem] sm:w-[6rem] sm:h-[6rem] border-[0.4rem] border-transparent rounded-full"
                style={{
                  borderTopColor: accentColor,
                  borderRightColor: accentColor,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </div>
          ) : (
            <motion.div className="flex items-center flex-col gap-2">
              <motion.div
                className={cn(
                  "w-[3.8rem] lg:w-12.5 h-[3.8rem] lg:h-12.5 bg-primary rounded-full flex items-center justify-center shadow-2xl transition-transform flex-col"
                )}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ImageComponent
                  src={icons.playGreen1}
                  alt="play video"
                  width={24}
                  height={24}
                />
              </motion.div>
              <Text className="text-[1.5rem] font-bold whitespace-nowrap text-white border-0 md:hidden">
                Watch video
              </Text>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
