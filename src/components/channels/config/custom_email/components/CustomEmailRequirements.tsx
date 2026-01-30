"use client";

import { useState } from "react";
import { CustomEmailRequirementsProps } from "./shared/types";
import ImageComponent from "next/image";
import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import Input from "../../../../forms/Input";
import Button from "../../../../ui/Button";
import Text from "../../../../ui/Text";
import Heading from "../../../../ui/Heading";

export default function CustomEmailRequirements({
  onConnect,
  isLoading = false,
}: CustomEmailRequirementsProps) {
  const icons = useSupabaseIcons();
  const [domain, setDomain] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!domain.trim()) {
      setError("Please enter a domain");
      return;
    }

    const domainPattern =
      /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
    if (!domainPattern.test(domain.trim())) {
      setError("Please enter a valid domain (e.g., example.com)");
      return;
    }

    onConnect(domain.trim());
  };

  return (
    <div className="px-[1.6rem] pt-[1.6rem] pb-[4rem] lg:px-[2.8rem] lg:py-[3.1rem] lg:pr-[1.7rem]">
      <form onSubmit={handleSubmit} className="space-y-[2.4rem]">
        <div className="space-y-4 rounded-[.8rem] py-[1.6rem] lg:py-[0]">
          <Heading className="mb-[1.5rem] lg:text-[2rem]" size="sm">
            Requirements
          </Heading>

          <div className="bg-input-filled px-[1.6rem] py-[2.4rem] rounded-[.8rem] border border-input-stroke">
            <label className="block mb-[0.6rem] space-y-[0.6rem]">
              <Heading size="sm">Email address</Heading>
              <Text>Enter the email address you want to add.</Text>
            </label>
            <Input
              type="text"
              placeholder="example.com"
              value={domain}
              onChange={(e) => {
                setDomain(e.target.value);
                setError("");
              }}
              disabled={isLoading}
              className="w-full bg-primary"
            />
            {error && (
              <Text size="sm" className="text-destructive mt-[0.4rem]">
                {error}
              </Text>
            )}
            <Text size="sm" as="div" className="text-text-primary mt-[0.8rem] flex items-center gap-[.4rem]">
              <span className="text-[1rem]">
                Email supports basic functions only (no CC, BCC, forwards, or
                contact forms).{" "}
                <span className="underline text-brand-primary">Learn more</span>
              </span>{" "}
              <ImageComponent
                src={icons.infoCircle2}
                alt="Info"
                width={15}
                height={15}
                className="inline"
              />
            </Text>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full mt-[4rem]"
          disabled={isLoading}
          loading={isLoading}
        >
          Connect email
        </Button>
      </form>
    </div>
  );
}
