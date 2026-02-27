"use client";

import React, { useState } from "react";
import Card from "../../ui/Card";
import {
  useSupabaseIcons,
  useSupabaseImages,
} from "../../../lib/supabase/useSupabase";
import PreviewHeader from "./PreviewHeader";
import EmailMockupContainer from "./sub-components/EmailMockupContainer";
import EmailHeader from "./sub-components/EmailHeader";
import EmailLogo from "./sub-components/EmailLogo";
import EmailMainImage from "./sub-components/EmailMainImage";
import EmailFeatureText from "./sub-components/EmailFeatureText";
import EmailProductGrid from "./sub-components/EmailProductGrid";
import EmailFooter from "./sub-components/EmailFooter";
import { EMAIL_PREVIEW_PRODUCTS } from "./constants/previewConstants";
import { useBrandKit } from "../BrandKitContext";
import ImageComponent from "../../ui/ImageComponent";
import Heading from "../../ui/Heading";
import { motion } from "framer-motion";

interface Props {
  onBack?: () => void;
}


export default function BrandPreviewCard({ onBack }: Props) {
  const icons = useSupabaseIcons();
  const images = useSupabaseImages();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { colors, fonts, logo, socialLinks } = useBrandKit();

  const currentColors = isDarkMode ? colors.dark : colors.light;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="py-[2.4rem] px-[1rem] flex flex-col h-full overflow-y-auto lg:h-auto lg:overflow-visible"
    >
      <div className="flex items-center gap-[1.5rem] mb-[1rem] lg:hidden">
        <button
          onClick={onBack}
          className="p-[0.8rem] rounded-full hover:bg-muted/10 transition-colors border border-input-stroke"
        >
          <ImageComponent
            src={icons.arrowLeft}
            alt="back"
            width={16}
            height={16}
          />
        </button>
        <Heading size="xs">Email Preview</Heading>
      </div>

      <PreviewHeader
        isDarkMode={isDarkMode}
        onToggle={() => setIsDarkMode(!isDarkMode)}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex-1"
      >
        <EmailMockupContainer colors={currentColors}>
          <EmailHeader colors={currentColors} fonts={fonts} />

          <EmailLogo logo={logo} colors={currentColors} />

          <EmailMainImage src={icons.emailpreviewImage} />

          <EmailFeatureText
            colors={currentColors}
            fonts={fonts}
            buttonColors={colors.button}
          />

          <EmailProductGrid
            products={EMAIL_PREVIEW_PRODUCTS}
            images={images}
            colors={currentColors}
            fonts={fonts}
            buttonColors={colors.button}
          />

          <EmailFooter
            colors={currentColors}
            fonts={fonts}
            socialLinks={socialLinks}
          />
        </EmailMockupContainer>
      </motion.div>

      <div className="mt-auto lg:hidden">
        <button
          onClick={onBack}
          className="w-full py-[1.2rem] text-[1.6rem] font-[600] text-text-primary border border-input-stroke rounded-[1rem] hover:bg-muted/10 transition-colors"
        >
          Go back
        </button>
      </div>
    </motion.div>
  );
}
