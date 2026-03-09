"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import Heading from "../../ui/Heading";
import Text from "../../ui/Text";
import Button from "../../ui/Button";
import ImageComponent from "../../ui/ImageComponent";

interface NotFoundProps {
  onBackToHome?: () => void;
  homeHref?: string;
  title?: string;
  description?: string;
  actionText?: string;
}

export default function NotFound({
  onBackToHome,
  homeHref = "/",
  title = "Error 404: Page Not Found",
  description = "The page you're looking for doesn't exist, was moved, or never made it past beta. Let's get you back to where conversations actually happen.",
  actionText = "Go back to Homepage",
}: NotFoundProps) {
  const icons = useSupabaseIcons();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-[1.6rem] py-[4rem] text-center bg-background-gradient">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-[65rem] mb-[4.8rem]"
      >
        <ImageComponent
          src={icons.notFoundIllustration}
          alt="404 Not Found"
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
        className="flex flex-col gap-[1.6rem] max-w-[80rem]"
      >
        <Heading className="text-text-secondary leading-tight text-center lg:text-[4.8rem]">
          {title}
        </Heading>

        <Text className="text-text-primary text-[1.4rem] mb-[2.4rem] text-center max-w-[50rem] mx-auto">
          {description}
        </Text>

        <div className="flex justify-center">
          <Button
            href={homeHref}
            onClick={onBackToHome}
            className="px-[1.2rem]  w-fit rounded-[.8rem] font-bold text-[1.6rem] grad-btn border-0"
          >
            {actionText}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
