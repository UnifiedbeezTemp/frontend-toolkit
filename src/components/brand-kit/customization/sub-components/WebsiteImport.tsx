"use client"

import React from "react"
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase"
import Button from "../../../ui/Button"
import ImageComponent from "../../../ui/ImageComponent"
import Heading from "../../../ui/Heading"
import Text from "../../../ui/Text"
import Input from "../../../forms/Input"
import Card from "../../../ui/Card"
import { useBrandKit } from "../../context/BrandKitContext"

export default function WebsiteImport() {
  const icons = useSupabaseIcons()
  const { websiteUrl, detectBrand, setWebsiteUrl, isDetecting } = useBrandKit()

  const handleImport = async () => {
    if (!websiteUrl) return
    await detectBrand(websiteUrl)
  }

  return (
    <div className="px-[1rem] sm:px-[0]">
      <div className="flex items-center gap-[1.5rem]">
        <Button
          variant="secondary"
          className="p-[.9rem] rounded-[1rem] border-brand-primary bg-soft-green"
        >
          <ImageComponent
            alt="website icon"
            src={icons.websiteGreen}
            width={20}
            height={20}
          />
        </Button>
        <div className="max-w-[100rem]">
          <Heading size="sm">Company Website</Heading>
          <Text size="sm">
            Enter your website URL to instantly import your brand details and
            set up your account
          </Text>
        </div>
      </div>

      <Card className="mt-[15px] px-[10px] py-[20px] bg-muted/20 shadow-none hover:shadow-none">
        <Heading size="xs">Website URL</Heading>
        <Input
          value={websiteUrl}
          placeholder="Enter your website URL"
          className="mt-[1rem]"
          disabled={isDetecting}
          onChange={(e) => setWebsiteUrl(e.target.value)}
        />

        <div className="flex gap-3 mt-[20px]">
          <Button
            className="px-[1.5rem] py-[0.5rem]"
            onClick={handleImport}
            loading={isDetecting}
            disabled={isDetecting || !websiteUrl}
          >
            {isDetecting ? "Importing..." : "Import Brand Kit"}
          </Button>
        </div>
      </Card>
    </div>
  )
}
