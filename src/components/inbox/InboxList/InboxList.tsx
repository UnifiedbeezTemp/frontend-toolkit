import { InboxSearchAndFilters } from "./FilterComponents"
import { InboxListTopToolBar } from "./InboxListTopToolBar"
import { GeneralInboxConversationItem } from "../GeneralInboxConversationItem"
import { TeamInboxConversationItem } from "../TeamInboxConversationItem"
import InboxListContainer from "./InboxListContainer"
import { useToggle } from "../../../hooks/useToggle"
import { ReactNode } from "react"
import PanelShell from "../ChannelsPanel/PanelShell"
import PanelCollapseIcon from "../../../assets/icons/PanelCollapseIcon"
import IconButton from "../../ui/IconButton"
import Heading from "../../ui/Heading"
import ChannelsList from "../ChannelsPanel/ChannelsList"

export default function InboxList({
  sideDrawerContent = <ChannelsList />,
  sideDrawerTitle = "Connect Channels",
}: {
  sideDrawerContent: ReactNode
  sideDrawerTitle?: string
}) {
  const {
    setTrue: openSideDrawer,

    value: isSideDrawerOpen,
    setFalse: closeSideDrawer,
  } = useToggle()
  return (
    <div className="absolute flex w-full">
      <PanelShell
        isOpen={isSideDrawerOpen}
        className="h-[calc(100dvh-16.5rem)] sm:h-[calc(100dvh-5.7rem)] overflow-auto "
      >
        <div className="flex items-center justify-between">
          <Heading className="text-dark-base-40 text-md">
            {sideDrawerTitle}
          </Heading>
          <IconButton
            onClick={closeSideDrawer}
            variant="secondary"
            icon={<PanelCollapseIcon />}
            ariaLabel="Open Drawer"
          />
        </div>
        {sideDrawerContent}
      </PanelShell>
      <InboxListContainer
        className="grow"
        header={
          <div className="flex flex-col">
            <InboxListTopToolBar
              onLeftClick={isSideDrawerOpen ? closeSideDrawer : openSideDrawer}
              title={"General Inbox"}
              leftIcon={undefined}
            />
            <InboxSearchAndFilters />
          </div>
        }
        body={
          <div>
            <GeneralInboxConversationItem
              leading={<div className="h-12 w-12 rounded-full bg-green-500" />}
              name="Alice Miles"
              tag="Wishlist-users"
              timestamp="2 days ago"
              preview="I want to know if the price is negotiable, i need..."
            />
            <TeamInboxConversationItem
              leading={<div className="h-12 w-12 rounded-full bg-green-500" />}
              name="Alice Miles"
              timestamp="2 days ago"
              unreadCount={30}
              preview="I want to know if the price is negotiable, i need..."
            />
          </div>
        }
      />
    </div>
  )
}
