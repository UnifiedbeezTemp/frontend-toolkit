import { useMemo } from "react";
import {
  getAssetUrl,
  SUPABASE_GIFS,
  SUPABASE_ICONS,
  SUPABASE_IMAGES,
} from "./supabaseAssets";

export const useSupabaseImages = () => {
  return useMemo(
    () => ({
      websiteWebChat: getAssetUrl(SUPABASE_IMAGES.websiteWebChat),
      chatBg: getAssetUrl(SUPABASE_IMAGES.chatBg),
      avatar: getAssetUrl(SUPABASE_IMAGES.avatar),
      investorXWebsiteImage: getAssetUrl(SUPABASE_IMAGES.investorXWebsiteImage),
      beehiveImg: getAssetUrl(SUPABASE_IMAGES.beehiveImg),
      aiImg: getAssetUrl(SUPABASE_IMAGES.aiImg),
      automationsImg: getAssetUrl(SUPABASE_IMAGES.automationsImg),
      womanGivingManCard: getAssetUrl(SUPABASE_IMAGES.womanGivingManCard),
      beeImg: getAssetUrl(SUPABASE_IMAGES.beeImg),
      beeBotImg: getAssetUrl(SUPABASE_IMAGES.beeBotImg),
      footerBg: getAssetUrl(SUPABASE_IMAGES.footerBg),
      bgImage: getAssetUrl(SUPABASE_IMAGES.bgImage),
      img1: getAssetUrl(SUPABASE_IMAGES.img1),
      img2: getAssetUrl(SUPABASE_IMAGES.img2),
      img3: getAssetUrl(SUPABASE_IMAGES.img3),
      autoImg1: getAssetUrl(SUPABASE_IMAGES.autoImg1),
      autoImg2: getAssetUrl(SUPABASE_IMAGES.autoImg2),
      autoImg3: getAssetUrl(SUPABASE_IMAGES.autoImg3),
      darkMode: getAssetUrl(SUPABASE_IMAGES.darkMode),
      authSlide1: getAssetUrl(SUPABASE_IMAGES.authSlide1),
      authSlide2: getAssetUrl(SUPABASE_IMAGES.authSlide2),
      authSlide3: getAssetUrl(SUPABASE_IMAGES.authSlide3),
      authSlide4: getAssetUrl(SUPABASE_IMAGES.authSlide4),
      teamMembers: getAssetUrl(SUPABASE_IMAGES.teamMembers),
    }),
    []
  );
};

export const useSupabaseIcons = () => {
  return useMemo(
    () =>
      Object.keys(SUPABASE_ICONS)
        .map((key) => ({
          [key]: getAssetUrl(
            SUPABASE_ICONS[key as keyof typeof SUPABASE_ICONS]
          ),
        }))
        .reduce((acc, curr) => ({ ...acc, ...curr }), {}),
    []
  ) as Record<keyof typeof SUPABASE_ICONS, string>
}

export const useSupabaseGifs = () => {
  return useMemo(
    () => ({
      celebrationPopup: getAssetUrl(SUPABASE_GIFS.celebrationPopup),
      lightMode: getAssetUrl(SUPABASE_GIFS.lightMode),
      darkMode: getAssetUrl(SUPABASE_GIFS.darkMode),
      copilotSidebarOne: getAssetUrl(SUPABASE_GIFS.copilotSidebarOne),
      copilotSidebarTwo: getAssetUrl(SUPABASE_GIFS.copilotSidebarTwo),
      copilotSidebarThree: getAssetUrl(SUPABASE_GIFS.copilotSidebarThree),
      copilotSidebarFour: getAssetUrl(SUPABASE_GIFS.copilotSidebarFour),
      copilotSidebarFive: getAssetUrl(SUPABASE_GIFS.copilotSidebarFive),
    }),
    []
  );
};
