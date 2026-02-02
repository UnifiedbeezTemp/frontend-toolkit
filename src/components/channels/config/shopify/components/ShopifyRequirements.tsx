"use client";

import Button from "../../../../../components/ui/Button";
import Input from "../../../../../components/ui/Input";
import ChannelRequirements from "../../../preview/ChannelRequirements";

interface ShopifyRequirementsProps {
  shopDomain: string;
  onShopDomainChange: (value: string) => void;
  onConnect: () => void;
  isLoading: boolean;
}

export default function ShopifyRequirements({
  shopDomain,
  onShopDomainChange,
  onConnect,
  isLoading,
}: ShopifyRequirementsProps) {
  return (
    <ChannelRequirements
      requirements={[
        "Active Shopify store",
        "Store owner or admin permissions",
        "Shopify plan that supports apps",
      ]}
      footer={
        <div className="space-y-4">
          <div>
            <Input
              placeholder="your-store.myshopify.com"
              value={shopDomain}
              onChange={(e) => onShopDomainChange(e.target.value)}
              className="w-full"
            />
            <p className="text-text-secondary text-xs mt-2">
              Enter your store domain (e.g., your-store or
              your-store.myshopify.com)
            </p>
          </div>
          <Button
            className="w-full"
            onClick={onConnect}
            disabled={isLoading || !shopDomain.trim()}
            loading={isLoading}
          >
            Connect
          </Button>
        </div>
      }
    />
  );
}
