import { InfiniteNewsTicker } from "./InfiniteNewsTicker"
import { useSupabaseIcons } from "../../lib/supabase/useSupabase"
import ImageComponent from "../ui/ImageComponent"

export default function CommunicationChannelsFooter() {
  const {
    whatsappIcon,
    facebookMessengerLogo,
    instagramLogo,
    calendyLogo,
    chatLogo,
    zoomLogo,
    slackLogo,
    shopifyLogo,
    paypalLogo,
  } = useSupabaseIcons()
  const communicationChannelsInOrder = [
    whatsappIcon,
    facebookMessengerLogo,
    instagramLogo,
    calendyLogo,
    chatLogo,
    zoomLogo,
    slackLogo,
    shopifyLogo,
    paypalLogo,
  ]
  return (
    <InfiniteNewsTicker
      speed={0.5}
      gap={1}
      className="items-center pt-8"
      items={communicationChannelsInOrder.map((commChannel, idx) => (
        <ImageComponent
          key={commChannel+idx}
          width={64}
          height={64}
          alt={`${commChannel} logo`}
          className="animate-bounce duration-[2s] w-25 h-25"
          src={commChannel}
          style={{
            animationDelay: `${idx * 0.2}s`,
          }}
        />
      ))}
    />
  )
}
