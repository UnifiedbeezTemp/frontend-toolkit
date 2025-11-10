const CDN_BASE_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/assets/assets`;

export const getAssetUrl = (path: string): string => {
  return `${CDN_BASE_URL}/${path}`;
};

export const SUPABASE_IMAGES = {
  websiteWebChat: "images/website-webchat.png",
  avatar: "images/avatar.png",
  investorXWebsiteImage: "images/beehive-hero-img.png",
  beehiveImg: "images/beehive-img.png",
  aiImg: "images/ai-image.png",
  automationsImg: "images/automationsImg.png",
  womanGivingManCard: "images/woman-giving-man-card.png",
  beeImg: "images/beeImg.png",
  beeBotImg: "images/beebot-icon.svg",
  footerBg: "images/footer-bg.png",
  bgImage: "images/bg-frame.webp",
  img1: "images/img1.jpg",
  img2: "images/img2.jpg",
  img3: "images/img3.jpg",
  autoImg1: "images/auto-img1.png",
  autoImg2: "images/auto-img2.png",
  autoImg3: "images/auto-img3.png",
} as const;

export const SUPABASE_ICONS = {
  searchSmIcon: "icons/search-sm.svg",
  searchIg: "icons/search-lg.svg",
  lucideSearch: "icons/lucide_search.svg",
  filterLinesIcon: "icons/filter-lines.svg",
  linkExternal: "icons/link-external.svg",
  beeZoraWelcome: "icons/beeZoraWelcome.svg",
  beeGreyLeft: "icons/bee-grey-left.svg",
  mingcuteTimeLine: "icons/mingcute_time-line.svg",
  hiveOutlineRounded: "icons/material-symbols_hive-outline-rounded.svg",
  fluentPeople: "icons/fluent_people-team-24-regular.svg",
  users: "icons/users-02.svg",
  bulb: "icons/bulb.svg",
  zap: "icons/zap.svg",
  inbox: "icons/inbox-01.svg",
  home: "icons/home-line.svg",
  data: "icons/data.svg",
  settings: "icons/settings-active.svg",
  threeDot: "icons/dots-vertical.svg",
  checkbox: "icons/Checkbox.svg",

  redTag: "icons/red-tag.svg",
  copy: "icons/copy.svg",
  cart: "icons/tdesign_cart.svg",
  net: "icons/net.svg",
  envelope: "icons/envelope.svg",
  box: "icons/box.svg",
  usersPlus: "icons/users-plus.svg",

  beeGreenRight: "icons/bee-green-right.svg",

  pattern: "icons/Pattern.svg",
  messagingTextSquare: "icons/message-text-square-02.svg",
  userGroup3: "icons/user-group-03.svg",
  dataFlow: "icons/dataflow-01.svg",
  warning: "icons/solar_danger-triangle-outline.svg",
  check: "icons/checkbox-base.svg",

  whatsappIcon: "icons/whatsapp.svg",
  facebookMessengerLogo: "icons/facebook-messenger-logo.svg",
  instagramLogo: "icons/instagram-logo.svg",
  telegramLogo: "icons/telegram-logo.svg",
  linkedinLogo: "icons/linkedin-logo.svg",

  zoomLogo: "icons/zoom-icon-logo.svg",
  microsoftLogo: "icons/Microsoft-logo.svg",
  calendyLogo: "icons/calendly-logo.svg",
  googleLogo: "icons/google-logo.svg",
  hubspotLogo: "icons/hubspot-logo.svg",
  pipedriveLogo: "icons/pipedrive-logo.svg",
  slackLogo: "icons/slack-logo.svg",
  stripeLogo: "icons/stripe-logo.svg",
  paypalLogo: "icons/paypal-logo.svg",
  shopifyLogo: "icons/shopify-logo.svg",

  colorPicker: "icons/color-picker-icon.svg",
  send2: "icons/send2.svg",

  arrowLeft: "icons/arrow-left.svg",
  palette: "icons/palette.svg",
  websiteGreen: "icons/website-green.svg",
  image: "icons/image-01.svg",
  upload: "icons/upload.svg",
  uploadCloud: "icons/upload-cloud.svg",

  featuredIcon1: "icons/featured-icon1.svg",
  featuredIcon2: "icons/featured-icon2.svg",
  featuredIcon3: "icons/featured-icon3.svg",
  featuredIcon4: "icons/featured-icon4.svg",

  smArrowDown: "icons/smArrowDown.svg",
  trash: "icons/trash.svg",
  igIcon: "icons/logo_instagram.svg",
  fbIcon: "icons/logos_facebook.svg",
  youtubeIcon: "icons/logos_youtube-icon.svg",
  twitterIcon: "icons/bi_twitter-x.svg",
  linkedinIcon: "icons/devicon_linkedin.svg",
  monitor: "icons/monitor.svg",

  profileActive: "icons/profile-active.svg",
  profileInactive: "icons/profile-inactive.svg",
  preferenceActive: "icons/preference-active.svg",
  preferenceInactive: "icons/preference-inactive.svg",
  notificationsActive: "icons/notifications-active.svg",
  notificationsInactive: "icons/notifications-inactive.svg",
  securityActive: "icons/security-active.svg",
  securityInactive: "icons/security-inactive.svg",
  channelsActive: "icons/channels-active.svg",
  channelsInactive: "icons/channels-inactive.svg",
  teamActive: "icons/team-active.svg",
  teamInactive: "icons/team-inactive.svg",
  edit: "icons/edit-04.svg",
  luggage: "icons/luggage-02.svg",
  checkMark: "icons/check-white.svg",
  camera: "icons/camera.svg",


  emailpreviewImage: "icons/emailpreviewimage.jpg",
};

export const SUPABASE_GIFS = {
  celebrationPopup: "/celebration-v3.gif",
} as const;
