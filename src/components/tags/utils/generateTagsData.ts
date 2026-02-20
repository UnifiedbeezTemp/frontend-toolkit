import { Tag, TagCategory } from "../../../store/slices/tagSlice";

const categories: TagCategory[] = [
  "contact-type",
  "intent-action",
  "source-origin",
  "engagement-level",
  "actions-behavior",
];

const labelsByCategory: Record<TagCategory, string[]> = {
  "contact-type": [
    "Returning-customer",
    "New customer",
    "Vip-customer",
    "Old-customer",
    "In-active-customer",
    "High-value-lead",
    "Potential-partner",
    "Influencer",
  ],
  "intent-action": [
    "Hot-buyer",
    "Deal-seeker",
    "Window-shopper",
    "Wishlist-user",
    "First-time-visitor",
    "Cart-abandoner",
    "Frequent-buyer",
  ],
  "source-origin": [
    "Instagram-ad",
    "facebook-ad",
    "google-shopping",
    "tiktok-shop",
    "amazon-storefront",
    "etsy-store",
    "shopify-store",
    "email-campaign",
  ],
  "engagement-level": [
    "Viewed-product",
    "added-to-cart",
    "checkout-started",
    "cart-abandoned",
    "order-placed",
    "reorder-interest",
    "highly-engaged",
  ],
  "actions-behavior": [
    "Clicked-product-email",
    "opened-sms-offer",
    "chat-responded",
    "left-review",
    "joined-waitlist",
    "searched-site",
  ],
};

const autoFillTags = [
  "%EMAIL ADDRESS%",
  "%FULL NAME%",
  "%FIRST NAME%",
  "%LAST NAME%",
  "%PHONE NUMBER%",
  "%GEO - COUNTRY%",
  "%GEO - REGION%",
  "%TIME SUBSCRIBED%",
  "%SUBSCRIBER ID%",
  "%POSITION / ROLE%",
];

export const generateTagsData = (count: number = 100): Tag[] => {
  const tags: Tag[] = [];
  for (let i = 0; i < count; i++) {
    const category = categories[i % categories.length];
    const categoryLabels = labelsByCategory[category];
    const labelBase = categoryLabels[i % categoryLabels.length];

    // Add variations if we need more than the labels we have
    const label =
      i >= categoryLabels.length * categories.length
        ? `${labelBase}-${Math.floor(i / (categoryLabels.length * categories.length))}`
        : labelBase;

    tags.push({
      id: `tag-${i}`,
      label,
      category,
      autoFillTag: autoFillTags[i % autoFillTags.length],
    });
  }
  return tags;
};
