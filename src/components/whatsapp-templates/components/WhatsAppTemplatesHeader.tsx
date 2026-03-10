import React from "react";
import { WhatsAppAccount } from "../types";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import ImageComponent from "../../ui/ImageComponent";
import WhatsAppTemplateIcon from "../../../assets/icons/WhatsAppTemplateIcon";
import ChevronDownIcon from "../../../assets/icons/ChevronDownIcon";
import Text from "../../ui/Text";
import SearchIcon from "../../../assets/icons/SearchIcon";
import Input from "../../forms/Input";
import FunnelIcon from "../../../assets/icons/FunnelIcon";

interface WhatsAppTemplatesHeaderProps {
  accounts: WhatsAppAccount[];
  selectedAccount: WhatsAppAccount;
  onAccountChange: (id: string) => void;
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function WhatsAppTemplatesHeader({
  selectedAccount,
  searchQuery,
  onSearchChange,
}: WhatsAppTemplatesHeaderProps) {
  const icons = useSupabaseIcons();

  return (
    <div className="flex flex-col gap-[2.4rem] mb-[1.6rem] lg:px-[1.6rem]">
      <div className="flex flex-col gap-[1.2rem]">
        <AccountSelectionSection
          selectedAccount={selectedAccount}
          icons={icons}
        />
      </div>

      <div className="w-full h-[1px] bg-border my-[0.8rem] hidden lg:block" />

      <SearchFilterSection
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
      />
    </div>
  );
}

const AccountSelectionSection = ({
  selectedAccount,
  icons,
}: {
  selectedAccount: WhatsAppAccount;
  icons: {plusWhite: string};
}) => (
  <>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-[1.6rem]">
        <Heading className="text-[1.6rem] font-bold">Manage Accounts</Heading>
        <span className="text-[1.3rem] text-(--brand-primary) font-medium cursor-pointer hover:underline">
          Show connected numbers
        </span>
      </div>

      <Button
        variant="primary"
        className="hidden lg:flex font-[400] text-[1.4rem] px-[1.6rem] py-[0.8rem] whitespace-nowrap"
      >
        <ImageComponent
          src={icons.plusWhite}
          alt="plus"
          width={16}
          height={16}
          className="mr-[0.8rem]"
        />
        Create new template
      </Button>
    </div>

    <div className="relative w-full lg:w-[35rem]">
      <button className="w-full flex items-center justify-between px-[1.6rem] py-[1.2rem] bg-(--primary) border border-input-stroke rounded-[0.8rem] text-left">
        <div className="flex items-center gap-[1.2rem]">
          <div className="w-[2.4rem] h-[2.4rem] bg-(--success-500) rounded-full flex items-center justify-center">
            <WhatsAppTemplateIcon size={14} color="white" />
          </div>
          <span className="text-[1.4rem] font-medium text-(--text-secondary)">
            {selectedAccount.name}
          </span>
        </div>
        <ChevronDownIcon size={14} className="text-(--text-primary)" />
      </button>
    </div>

    <Button
      variant="primary"
      className="flex lg:hidden w-full font-[400] text-[1.4rem] px-[1.6rem] py-[1.2rem] justify-center whitespace-nowrap"
    >
      <ImageComponent
        src={icons.plusWhite}
        alt="plus"
        width={16}
        height={16}
        className="mr-[0.8rem]"
      />
      Create new template
    </Button>
  </>
);

const SearchFilterSection = ({
  searchQuery,
  onSearchChange,
}: {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="flex flex-col lg:flex-row lg:justify-between gap-[1.6rem]">
    <div className="flex flex-col">
      <Heading className="text-[1.8rem] lg:text-[1.6rem] font-bold">
        Manage Whatsapp templates
      </Heading>
      <Text className="text-[1.4rem] text-(--text-primary)">
        Connect as many channels as you like
      </Text>
    </div>

    <div className="flex items-center gap-[1.2rem]">
      <div className="relative flex-1 lg:w-[30rem]">
        <Input
          value={searchQuery}
          onChange={onSearchChange}
          leftIcon={<SearchIcon size={16} className="grayscale" />}
          placeholder="Search contacts"
          className="h-[4rem] text-inactive-color placeholder:text-inactive-color"
        />
      </div>

      <Button
        variant="secondary"
        className="p-[1rem] border border-input-stroke rounded-[0.8rem] shrink-0 h-[4rem] w-[4rem] flex items-center justify-center"
      >
        <FunnelIcon size={16} />
      </Button>
    </div>
  </div>
);
