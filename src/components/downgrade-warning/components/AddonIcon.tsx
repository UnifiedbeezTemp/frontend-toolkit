import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import ImageComponent from "../../ui/ImageComponent";

interface AddonIconProps {
  addonType: string;
  addonName?: string;
  className?: string;
}

export default function AddonIcon({
  addonType,
  addonName,
  className,
}: AddonIconProps) {
  const icons = useSupabaseIcons();

  let icon = icons.greenCreditCard; 

  switch (addonType) {
    case "EXTRA_AI_ASSISTANT":
      icon = icons.usersCheck;
      break;
    case "EXTRA_SEAT":
      icon = icons.seatsIcon;
      break;
    case "EXTRA_WHATSAPP_CHANNEL":
      icon = icons.riWhatsappLine;
      break;
    case "MULTI_LANGUAGE_AI":
      icon = icons.languageIcon;
      break;
    case "WHITE_LABEL_PORTAL":
      icon = icons.websiteActive;
      break;
    case "TWILIO_MESSAGE_PACK":
      icon = icons.tabblerBrandTwillo;
      break;
    case "TWILIO_VOICE_PACK":
      icon = icons.tabblerBrandTwillo;
      break;
    case "CRM_CALENDAR_SYNC":
      icon = icons.lucideCalender;
      break;
    case "ECOMMERCE_PACK":
      icon = icons.ecommerceApparel;
      break;
    case "PRIORITY_SUPPORT":
      icon = icons.customerSupport;
      break;
    case "RESELLER_AGENCY_PORTAL":
      icon = icons.websiteActive;
      break;
  }

  return (
    <div className={className}>
      <ImageComponent
        src={icon}
        alt={addonName || addonType}
        width={20}
        height={20}
      />
    </div>
  );
}
