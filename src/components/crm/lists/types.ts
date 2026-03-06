import { MarketingChannel } from "../shared/types";

export interface CRMList {
  id: string;
  name: string;
  label: string;
  activeContacts: number;
  marketingChannel: MarketingChannel;
  onSubmissionAction: string;
  submissions: number;
  createdAt: string;
  category: string;
}
