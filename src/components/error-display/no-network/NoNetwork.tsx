"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import Heading from "../../ui/Heading";
import Text from "../../ui/Text";
import Button from "../../ui/Button";
import ImageComponent from "../../ui/ImageComponent";

interface NoNetworkProps {
  onRefresh?: () => void;
  title?: string;
  description?: string;
  actionText?: string;
}

export default function NoNetwork({
  onRefresh = () => window.location.reload(),
  title = "You're Offline",
  description = "We can't reach our servers right now. Please check your internet connection and try again.",
  actionText = "Refresh Page",
}: NoNetworkProps) {
  const icons = useSupabaseIcons();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-[1.6rem] py-[4rem] text-center bg-background-gradient">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-[60rem] mb-[4rem]"
      >
        <ImageComponent
          src={icons.noInternet}
          alt="No Internet"
          width={700}
          height={600}
          className="w-full h-auto object-contain"
          priority
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col gap-[1.6rem] max-w-[60rem]"
      >
        <Heading className="text-muted leading-tight text-center lg:text-[4.8rem]">
          {title}
        </Heading>

        <Text className="text-text-primary text-[1.4rem] mb-[2.4rem] text-center mx-auto">
          {description}
        </Text>

        <div className="flex justify-center">
          <Button
            onClick={onRefresh}
            className="px-[3.2rem] py-[1.2rem] rounded-[1.2rem] font-bold text-[1.6rem] grad-btn border-0 shadow-xl"
          >
            {actionText}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
