import { StripeAccount } from "../../../types/channelAccountDetailTypes";
import { ChannelConnection } from "../../../types/channelConnectionTypes";

export const mapStripeAccountToFormData = (
  account: StripeAccount,
): ChannelConnection => {
  return {
    id: String(account.id),
    channelId: String(account.connectedChannelId),
    name: account.stripeAccountId || "Stripe Account",
    configuration: {
      stripeUserId: account.stripeUserId,
      stripeAccountId: account.stripeAccountId,
      isActive: account.isActive,
    },
    isActive: account.isActive,
    createdAt: account.createdAt,
    updatedAt: account.updatedAt,
  };
};
