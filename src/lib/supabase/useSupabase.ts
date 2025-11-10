import { useMemo } from "react";
import {
  getAssetUrl,
  SUPABASE_GIFS,
  SUPABASE_ICONS,
  SUPABASE_IMAGES,
} from "./supabaseAssets";
import { profile } from "console";

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
      img1: getAssetUrl(SUPABASE_IMAGES.img1),
      img2: getAssetUrl(SUPABASE_IMAGES.img2),
      img3: getAssetUrl(SUPABASE_IMAGES.img3),
      autoImg1: getAssetUrl(SUPABASE_IMAGES.autoImg1),
      autoImg2: getAssetUrl(SUPABASE_IMAGES.autoImg2),
      autoImg3: getAssetUrl(SUPABASE_IMAGES.autoImg3),
    }),
    []
  );
};

export const useSupabaseIcons = () => {
  return useMemo(
    () => ({
      searchSmIcon: getAssetUrl(SUPABASE_ICONS.searchSmIcon),
      searchIg: getAssetUrl(SUPABASE_ICONS.searchIg),
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

      smArrowDown: getAssetUrl(SUPABASE_ICONS.smArrowDown),
      trash: getAssetUrl(SUPABASE_ICONS.trash),
      igIcon: getAssetUrl(SUPABASE_ICONS.igIcon),
      fbIcon: getAssetUrl(SUPABASE_ICONS.fbIcon),
      // whatsappIcon: getAssetUrl(SUPABASE_ICONS.whatsappIcon),
      youtubeIcon: getAssetUrl(SUPABASE_ICONS.youtubeIcon),
      twitterIcon: getAssetUrl(SUPABASE_ICONS.twitterIcon),
      linkedinIcon: getAssetUrl(SUPABASE_ICONS.linkedinIcon),
      emailpreviewImage: getAssetUrl(SUPABASE_ICONS.emailpreviewImage),

      profileActive: getAssetUrl(SUPABASE_ICONS.profileActive),
      profileInactive: getAssetUrl(SUPABASE_ICONS.profileInactive),
      preferenceActive: getAssetUrl(SUPABASE_ICONS.preferenceActive),
      preferenceInactive: getAssetUrl(SUPABASE_ICONS.preferenceInactive), 
      notificationsActive: getAssetUrl(SUPABASE_ICONS.notificationsActive), 
      notificationsInactive: getAssetUrl(SUPABASE_ICONS.notificationsInactive), 
      securityActive: getAssetUrl(SUPABASE_ICONS.securityActive),
      securityInactive: getAssetUrl(SUPABASE_ICONS.securityInactive),
      channelsActive: getAssetUrl(SUPABASE_ICONS.channelsActive),
      channelsInactive: getAssetUrl(SUPABASE_ICONS.channelsInactive),
      teamActive: getAssetUrl(SUPABASE_ICONS.teamActive),
      teamInactive: getAssetUrl(SUPABASE_ICONS.teamInactive),
      edit: getAssetUrl(SUPABASE_ICONS.edit),
      luggage: getAssetUrl(SUPABASE_ICONS.luggage),
      checkMark: getAssetUrl(SUPABASE_ICONS.checkMark),
      camera: getAssetUrl(SUPABASE_ICONS.camera),
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
