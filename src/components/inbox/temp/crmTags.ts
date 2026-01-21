import { Tag } from "../types";

export const allTags: Tag[] = [
  // Contact Type
  {
    id: 'returning-customer',
    label: 'Returning-customer',
    category: 'contact-type',
  },
  {
    id: 'new-customer',
    label: 'New customer',
    category: 'contact-type',
  },
  {
    id: 'vip-customer',
    label: 'Vip-customer',
    category: 'contact-type',
  },
  
  // Intent & Action
  {
    id: 'hot-buyer',
    label: 'Hot-buyer',
    category: 'intent-action',
  },
  {
    id: 'deal-seeker',
    label: 'Deal-seeker',
    category: 'intent-action',
  },
  {
    id: 'window-shopper',
    label: 'Window-shopper',
    category: 'intent-action',
  },
  {
    id: 'wishlist-user',
    label: 'Wishlist-user',
    category: 'intent-action',
  },
  {
    id: 'first-time-visitor',
    label: 'First-time-visitor',
    category: 'intent-action',
  },
  
  // Source / Origin
  {
    id: 'instagram-ad',
    label: 'Instagram-ad',
    category: 'source-origin',
  },
  {
    id: 'facebook-ad',
    label: 'facebook-ad',
    category: 'source-origin',
  },
  {
    id: 'google-shopping',
    label: 'google-shopping',
    category: 'source-origin',
  },
  {
    id: 'tiktok-shop',
    label: 'tiktok-shop',
    category: 'source-origin',
  },
  {
    id: 'amazon-storefront',
    label: 'amazon-storefront',
    category: 'source-origin',
  },
  {
    id: 'etsy-store',
    label: 'etsy-store',
    category: 'source-origin',
  },
  {
    id: 'shopify-store',
    label: 'shopify-store',
    category: 'source-origin',
  },
  {
    id: 'email-campaign',
    label: 'email-campaign',
    category: 'source-origin',
  },
  
  // Engagement Level
  {
    id: 'viewed-product',
    label: 'Viewed-product',
    category: 'engagement-level',
  },
  {
    id: 'added-to-cart',
    label: 'added-to-cart',
    category: 'engagement-level',
  },
  {
    id: 'checkout-started',
    label: 'checkout-started',
    category: 'engagement-level',
  },
  {
    id: 'cart-abandoned',
    label: 'cart-abandoned',
    category: 'engagement-level',
  },
  {
    id: 'order-placed',
    label: 'order-placed',
    category: 'engagement-level',
  },
  {
    id: 'reorder-interest',
    label: 'reorder-interest',
    category: 'engagement-level',
  },
  
  // Actions & Behavior
  {
    id: 'clicked-product-email',
    label: 'Clicked-product-email',
    category: 'actions-behavior',
  },
  {
    id: 'opened-sms-offer',
    label: 'opened-sms-offer',
    category: 'actions-behavior',
  },
  {
    id: 'chat-responded',
    label: 'chat-responded',
    category: 'actions-behavior',
  },
  {
    id: 'left-review',
    label: 'last-touch-ref',
    category: 'actions-behavior',
  },
  {
    id: 'joined-waitlist',
    label: 'joined-waitlist',
    category: 'actions-behavior',
  }
];
