"use client";

import { motion } from "framer-motion";
import { containerVariants } from "../hero/animations";
import ChannelTabs from "./ChannelTabs";
import ChannelCard from "./Channels/ChannelCard";
import AutomationsCard from "./automations/AutomationsCard";
import CampaignsCard from "./campaigns/CampaignsCard";
import Heading from "../../ui/Heading";
import Text from "../../ui/Text";

export default function MoreInfo() {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="py-[3rem] text-center"
    >
      <div className="space-y-[.3rem] flex flex-col items-center justify-center">
        <Heading align="center" className="text-[1.8rem] lg:text-[3.2rem]">
          All-in-One Messaging & <br className="sm:hidden" /> Automation
          Platform
        </Heading>
        <Text
          className="text-center text-[1.4rem] lg:text-[2rem]"
          align="center"
        >
          {" "}
          From email to SMS, UnifiedBeez brings your channels, automations, CRM,
          and AI tools <br className="hidden sm:block" /> together in one hub so
          you can engage, support, and grow all in one place.
        </Text>
      </div>
      <ChannelTabs />
      <ChannelCard />
      <AutomationsCard />
      <CampaignsCard />
    </motion.section>
  );
}
