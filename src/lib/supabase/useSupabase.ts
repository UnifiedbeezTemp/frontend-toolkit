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
    }),
    []
  );
};

export const useSupabaseIcons = () => {
  return useMemo(
    () => ({
      searchSmIcon: getAssetUrl(SUPABASE_ICONS.searchSmIcon),
      lucideSearch: getAssetUrl(SUPABASE_ICONS.lucideSearch),
      linkExternal: getAssetUrl(SUPABASE_ICONS.linkExternal),
      filterLinesIcon: getAssetUrl(SUPABASE_ICONS.filterLinesIcon),
      beeZoraWelcome: getAssetUrl(SUPABASE_ICONS.beeZoraWelcome),
      beeGreyLeft: getAssetUrl(SUPABASE_ICONS.beeGreyLeft),
      mingcuteTimeLine: getAssetUrl(SUPABASE_ICONS.mingcuteTimeLine),
      hiveOutlineRounded: getAssetUrl(SUPABASE_ICONS.hiveOutlineRounded),
      fluentPeople: getAssetUrl(SUPABASE_ICONS.fluentPeople),
      users: getAssetUrl(SUPABASE_ICONS.users),
      bulb: getAssetUrl(SUPABASE_ICONS.bulb),
      zap: getAssetUrl(SUPABASE_ICONS.zap),
      inbox: getAssetUrl(SUPABASE_ICONS.inbox),
      home: getAssetUrl(SUPABASE_ICONS.home),
      data: getAssetUrl(SUPABASE_ICONS.data),
      settings: getAssetUrl(SUPABASE_ICONS.settings),
      pattern: getAssetUrl(SUPABASE_ICONS.pattern),
      messagingTextSquare: getAssetUrl(SUPABASE_ICONS.messagingTextSquare),
      userGroup3: getAssetUrl(SUPABASE_ICONS.userGroup3),
      dataFlow: getAssetUrl(SUPABASE_ICONS.dataFlow),
      beeGreenRight: getAssetUrl(SUPABASE_ICONS.beeGreenRight),
      warning: getAssetUrl(SUPABASE_ICONS.warning),
      check: getAssetUrl(SUPABASE_ICONS.check),
      threeDot: getAssetUrl(SUPABASE_ICONS.threeDot),
      checkbox: getAssetUrl(SUPABASE_ICONS.checkbox),
      redTag: getAssetUrl(SUPABASE_ICONS.redTag),
      copy: getAssetUrl(SUPABASE_ICONS.copy),
      net: getAssetUrl(SUPABASE_ICONS.net),
      cart: getAssetUrl(SUPABASE_ICONS.cart),
      envelope: getAssetUrl(SUPABASE_ICONS.envelope),
      box: getAssetUrl(SUPABASE_ICONS.box),
      usersPlus: getAssetUrl(SUPABASE_ICONS.usersPlus),

      whatsappIcon: getAssetUrl(SUPABASE_ICONS.whatsappIcon),
      facebookMessengerLogo: getAssetUrl(SUPABASE_ICONS.facebookMessengerLogo),
      instagramLogo: getAssetUrl(SUPABASE_ICONS.instagramLogo),
      telegramLogo: getAssetUrl(SUPABASE_ICONS.telegramLogo),
      linkedinLogo: getAssetUrl(SUPABASE_ICONS.linkedinLogo),
      zoomLogo: getAssetUrl(SUPABASE_ICONS.zoomLogo),
      microsoftLogo: getAssetUrl(SUPABASE_ICONS.microsoftLogo),
      calendyLogo: getAssetUrl(SUPABASE_ICONS.calendyLogo),
      googleLogo: getAssetUrl(SUPABASE_ICONS.googleLogo),
      hubspotLogo: getAssetUrl(SUPABASE_ICONS.hubspotLogo),
      pipedriveLogo: getAssetUrl(SUPABASE_ICONS.pipedriveLogo),
      slackLogo: getAssetUrl(SUPABASE_ICONS.slackLogo),
      stripeLogo: getAssetUrl(SUPABASE_ICONS.stripeLogo),
      paypalLogo: getAssetUrl(SUPABASE_ICONS.paypalLogo),
      shopifyLogo: getAssetUrl(SUPABASE_ICONS.shopifyLogo),
      chatLogo: getAssetUrl(SUPABASE_ICONS.chatLogo),
      colorPicker: getAssetUrl(SUPABASE_ICONS.colorPicker),
      send2: getAssetUrl(SUPABASE_ICONS.send2),
      arrowLeft: getAssetUrl(SUPABASE_ICONS.arrowLeft),
      palette: getAssetUrl(SUPABASE_ICONS.palette),
      websiteGreen: getAssetUrl(SUPABASE_ICONS.websiteGreen),
      image: getAssetUrl(SUPABASE_ICONS.image),
      upload: getAssetUrl(SUPABASE_ICONS.upload),
      uploadCloud: getAssetUrl(SUPABASE_ICONS.uploadCloud),
      featuredIcon1: getAssetUrl(SUPABASE_ICONS.featuredIcon1),
      featuredIcon2: getAssetUrl(SUPABASE_ICONS.featuredIcon2),
      featuredIcon3: getAssetUrl(SUPABASE_ICONS.featuredIcon3),
      featuredIcon4: getAssetUrl(SUPABASE_ICONS.featuredIcon4),
    }),
    []
  );
};

export const useSupabaseGifs = () => {
  return useMemo(
    () => ({
      celebrationPopup: getAssetUrl(SUPABASE_GIFS.celebrationPopup),
    }),
    []
  );
};
