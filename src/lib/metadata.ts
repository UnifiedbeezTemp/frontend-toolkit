import { Metadata } from "next";

export function constructMetadata({
  title = "Unifiedbeez - All-in-One AI-Powered Customer Conversations",
  description = "All Your Customer Conversations, Unified in One AI-Powered Workspace. Streamline WhatsApp, SMS, and Email into a single hub.",
  image = "https://woplvzpumzbpydgumpgc.supabase.co/storage/v1/object/public/assets/assets/website/website-herof.png",
  icons = "/icon.svg",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@unifiedbeez",
    },
    icons,
    metadataBase: new URL("https://unifiedbeez.com"),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
