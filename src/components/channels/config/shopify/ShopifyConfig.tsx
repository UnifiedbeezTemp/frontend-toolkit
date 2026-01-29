"use client";

import { BaseChannelConfigProps } from "../BaseChannelConfig";
import { useShopifyHandlers } from "./hooks/useShopifyHandlers";
import ShopifyRequirements from "./components/ShopifyRequirements";
import { useShopifyIntegration } from "./hooks/useShopifyIntegration";
import ShopifyConnectionDetails from "./components/ShopifyConnectionDetails";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";
import { ShopifyConnectResponse } from "../../../../services/shopifyService";
import DeleteChannelModal from "../../management/DeleteChannelModal";

interface ShopifyConfigProps extends BaseChannelConfigProps {
  onRefetchChannels?: () => Promise<void> | void;
}

export default function ShopifyConfig({
  channel,
  connection,
  onSave,
  isLoading = false,
  onRefetchChannels,
}: ShopifyConfigProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const handleShopifyComplete = (response: ShopifyConnectResponse) => {
    if (response.success) {
      onSave({
        connected: true,
      });
    }
  };

  const channelId = parseInt(channel.id) || 0;

  const {
    startIntegration,
    isLoading: isShopifyConnecting,
    isDeleting,
    handleConfirmDelete: initiateDisconnect,
  } = useShopifyIntegration({
    channelId,
    onComplete: handleShopifyComplete,
    onRefetchChannels,
  });

  const {
    showRequirements,
    showDeleteModal,
    shopDomain,
    handleConnect,
    handleShopDomainChange,
    handleDeleteClick,
    handleConfirmDelete,
    handleCloseDeleteModal,
  } = useShopifyHandlers({
    connection,
    onSave,
    startShopifyIntegration: startIntegration,
    onConfirmDelete: initiateDisconnect,
  });

  if (showRequirements && !connection) {
    return (
      <ShopifyRequirements
        shopDomain={shopDomain}
        onShopDomainChange={handleShopDomainChange}
        onConnect={handleConnect}
        isLoading={isShopifyConnecting}
      />
    );
  }

  if (connection) {
    return (
      <>
        <ShopifyConnectionDetails
          connection={connection}
          onDelete={handleDeleteClick}
          isDeleting={isDeleting}
          variant={isDesktop ? "desktop" : "mobile"}
        />
        <DeleteChannelModal
          isOpen={showDeleteModal}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          channelName={channel.channelName ?? "Shopify"}
          isLoading={isDeleting}
        />
      </>
    );
  }

  return null;
}
