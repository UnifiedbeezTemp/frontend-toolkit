export type MessageType = "incoming" | "own" | "group"

export interface Message {
  id: string
  type: MessageType
  text: string
  timestamp: string
  senderName?: string
  senderAvatar?: string
}

export interface ConversationMessages {
  conversationId: string
  messages: Message[]
  platformIcon?: string
  status?: string
  tag?: string
}

export const conversationMessages: Record<string, ConversationMessages> = {
  "1": {
    conversationId: "1",
    messages: [
      {
        id: "m1-1",
        type: "incoming",
        text: "I want to know if the price is negotiable, i need about 2 Units",
        timestamp: "2 days ago, 10:30 AM",
      },
      {
        id: "m1-2",
        type: "own",
        text: "Hello Alice! Thank you for your interest. Yes, we can definitely discuss pricing for bulk orders. Let me check our current inventory.",
        timestamp: "2 days ago, 10:35 AM",
      },
      {
        id: "m1-3",
        type: "incoming",
        text: "That would be great! I'm looking to place the order by the end of this week if possible.",
        timestamp: "2 days ago, 11:00 AM",
      },
      {
        id: "m1-4",
        type: "own",
        text: "Perfect! I'll prepare a custom quote for you. Can you share your delivery address?",
        timestamp: "2 days ago, 11:05 AM",
      },
    ],
    tag: "Wishlist-users",
    status: "Online • Active",
  },
  "2": {
    conversationId: "2",
    messages: [
      {
        id: "m2-1",
        type: "incoming",
        text: "Thank you for the quick response! I'm very interested in your product.",
        timestamp: "1 day ago, 2:15 PM",
      },
      {
        id: "m2-2",
        type: "own",
        text: "Hi John! We're thrilled to hear that. As a VIP customer, you have access to exclusive benefits. How can I assist you today?",
        timestamp: "1 day ago, 2:20 PM",
      },
      {
        id: "m2-3",
        type: "incoming",
        text: "I'd like to know more about the premium features and how they differ from the standard package.",
        timestamp: "1 day ago, 2:25 PM",
      },
    ],
    tag: "VIP-customer",
    status: "Online • Active",
  },
  "3": {
    conversationId: "3",
    messages: [
      {
        id: "m3-1",
        type: "incoming",
        text: "Can you provide more information about the shipping options?",
        timestamp: "3 hours ago, 9:00 AM",
      },
      {
        id: "m3-2",
        type: "own",
        text: "Hi Sarah! We offer several shipping options: Standard (5-7 days), Express (2-3 days), and Overnight. Which would you prefer?",
        timestamp: "3 hours ago, 9:10 AM",
      },
      {
        id: "m3-3",
        type: "incoming",
        text: "Express shipping sounds good. What's the cost for that?",
        timestamp: "3 hours ago, 9:15 AM",
      },
    ],
    tag: "New-lead",
    status: "Away • Last seen 1 hour ago",
  },
  "4": {
    conversationId: "4",
    messages: [
      {
        id: "m4-1",
        type: "incoming",
        text: "I'd like to place another order, can I get a discount?",
        timestamp: "5 hours ago, 7:00 AM",
      },
      {
        id: "m4-2",
        type: "own",
        text: "Hello Michael! As a returning customer, you're eligible for a 10% loyalty discount. I'll apply it to your order.",
        timestamp: "5 hours ago, 7:05 AM",
      },
      {
        id: "m4-3",
        type: "incoming",
        text: "That's perfect! I'll proceed with the order then.",
        timestamp: "5 hours ago, 7:10 AM",
      },
    ],
    tag: "Returning-customer",
    status: "Online • Active",
  },
  "5": {
    conversationId: "5",
    messages: [
      {
        id: "m5-1",
        type: "incoming",
        text: "I'm having trouble with my recent purchase, need assistance.",
        timestamp: "1 hour ago, 11:00 AM",
      },
      {
        id: "m5-2",
        type: "own",
        text: "Hi Emily! I'm sorry to hear you're experiencing issues. Can you please describe what problem you're encountering?",
        timestamp: "1 hour ago, 11:05 AM",
      },
      {
        id: "m5-3",
        type: "incoming",
        text: "The product arrived damaged. The packaging was torn and the item inside has scratches.",
        timestamp: "1 hour ago, 11:10 AM",
      },
      {
        id: "m5-4",
        type: "own",
        text: "I sincerely apologize for this. We'll send you a replacement immediately at no cost. I'll also arrange for the damaged item to be picked up.",
        timestamp: "1 hour ago, 11:15 AM",
      },
    ],
    tag: "Support-ticket",
    status: "Online • Active",
  },
  t1: {
    conversationId: "t1",
    messages: [
      {
        id: "mt1-1",
        type: "incoming",
        text: "I want to know if the price is negotiable, i need...",
        timestamp: "2 days ago, 3:00 PM",
      },
      {
        id: "mt1-2",
        type: "own",
        text: "Hi Alice! Let me check with the team about pricing options for your requirements.",
        timestamp: "2 days ago, 3:15 PM",
      },
      {
        id: "mt1-3",
        type: "group",
        text: "Can we discuss this in our team meeting tomorrow?",
        timestamp: "2 days ago, 4:00 PM",
        senderName: "Sarah",
        senderAvatar: "https://i.pravatar.cc/150?img=47",
      },
    ],
    status: "Online • Team discussion",
  },
  t2: {
    conversationId: "t2",
    messages: [
      {
        id: "mt2-1",
        type: "incoming",
        text: "Can we schedule a call to discuss the project details?",
        timestamp: "1 day ago, 1:00 PM",
      },
      {
        id: "mt2-2",
        type: "own",
        text: "Absolutely! I'm available tomorrow afternoon. Does 2 PM work for you?",
        timestamp: "1 day ago, 1:10 PM",
      },
      {
        id: "mt2-3",
        type: "incoming",
        text: "Perfect! I'll send a calendar invite.",
        timestamp: "1 day ago, 1:15 PM",
      },
    ],
    status: "Online • Active",
  },
  t3: {
    conversationId: "t3",
    messages: [
      {
        id: "mt3-1",
        type: "incoming",
        text: "The proposal looks great! When can we move forward?",
        timestamp: "4 hours ago, 8:00 AM",
      },
      {
        id: "mt3-2",
        type: "own",
        text: "Thank you! We can start as early as next week. I'll prepare the contract for your review.",
        timestamp: "4 hours ago, 8:15 AM",
      },
    ],
    status: "Online • Active",
  },
  t4: {
    conversationId: "t4",
    messages: [
      {
        id: "mt4-1",
        type: "incoming",
        text: "I need clarification on the pricing structure.",
        timestamp: "6 hours ago, 6:00 AM",
      },
      {
        id: "mt4-2",
        type: "own",
        text: "I'll send you a detailed breakdown of our pricing tiers. Which plan are you most interested in?",
        timestamp: "6 hours ago, 6:10 AM",
      },
    ],
    status: "Away • Last seen 2 hours ago",
  },
  t5: {
    conversationId: "t5",
    messages: [
      {
        id: "mt5-1",
        type: "incoming",
        text: "The team meeting is scheduled for tomorrow at 2 PM.",
        timestamp: "30 minutes ago, 11:30 AM",
      },
      {
        id: "mt5-2",
        type: "own",
        text: "Got it! I'll make sure to prepare the agenda and share it with everyone.",
        timestamp: "30 minutes ago, 11:35 AM",
      },
    ],
    status: "Online • Active",
  },
  t6: {
    conversationId: "t6",
    messages: [
      {
        id: "mt6-1",
        type: "incoming",
        text: "Can you review the latest design mockups?",
        timestamp: "12 hours ago, 12:00 AM",
      },
      {
        id: "mt6-2",
        type: "own",
        text: "I'll review them this afternoon and provide feedback by end of day.",
        timestamp: "12 hours ago, 12:15 AM",
      },
    ],
    status: "Online • Active",
  },
  tg1: {
    conversationId: "tg1",
    messages: [
      {
        id: "mtg1-1",
        type: "group",
        text: "Can we discuss this in our team meeting tomorrow?",
        timestamp: "2 hours ago, 2:00 PM",
        senderName: "Sarah",
        senderAvatar: "https://i.pravatar.cc/150?img=47",
      },
      {
        id: "mtg1-2",
        type: "own",
        text: "Yes, that works for me! I'll prepare the agenda.",
        timestamp: "2 hours ago, 2:05 PM",
      },
      {
        id: "mtg1-3",
        type: "group",
        text: "Great! I'll send out the calendar invite to everyone.",
        timestamp: "1 hour ago, 3:00 PM",
        senderName: "Mike",
        senderAvatar: "https://i.pravatar.cc/150?img=32",
      },
      {
        id: "mtg1-4",
        type: "group",
        text: "Perfect timing! I have some updates to share.",
        timestamp: "30 minutes ago, 3:30 PM",
        senderName: "Emma",
        senderAvatar: "https://i.pravatar.cc/150?img=20",
      },
    ],
    status: "4 members • Active",
    tag: "Design Team",
  },
  tg2: {
    conversationId: "tg2",
    messages: [
      {
        id: "mtg2-1",
        type: "group",
        text: "The client approved the latest changes! 🎉",
        timestamp: "1 day ago, 10:00 AM",
        senderName: "John",
        senderAvatar: "https://i.pravatar.cc/150?img=12",
      },
      {
        id: "mtg2-2",
        type: "own",
        text: "That's fantastic news! Great work everyone.",
        timestamp: "1 day ago, 10:05 AM",
      },
      {
        id: "mtg2-3",
        type: "group",
        text: "Thanks! Now we can move forward with the next phase.",
        timestamp: "1 day ago, 10:10 AM",
        senderName: "Lisa",
        senderAvatar: "https://i.pravatar.cc/150?img=5",
      },
      {
        id: "mtg2-4",
        type: "group",
        text: "I'll update the project timeline accordingly.",
        timestamp: "1 day ago, 10:15 AM",
        senderName: "David",
        senderAvatar: "https://i.pravatar.cc/150?img=14",
      },
    ],
    status: "5 members • Active",
    tag: "Project Alpha",
  },
  tg3: {
    conversationId: "tg3",
    messages: [
      {
        id: "mtg3-1",
        type: "group",
        text: "Let's finalize the launch date this week. What do you all think?",
        timestamp: "3 hours ago, 9:00 AM",
        senderName: "Emma",
        senderAvatar: "https://i.pravatar.cc/150?img=20",
      },
      {
        id: "mtg3-2",
        type: "own",
        text: "I think Friday would be perfect. Gives us time to prepare.",
        timestamp: "3 hours ago, 9:05 AM",
      },
      {
        id: "mtg3-3",
        type: "group",
        text: "Friday works for me too! I'll coordinate with the marketing team.",
        timestamp: "2 hours ago, 10:00 AM",
        senderName: "Tom",
        senderAvatar: "https://i.pravatar.cc/150?img=16",
      },
    ],
    status: "3 members • Active",
    tag: "Marketing Campaign",
  },
}
