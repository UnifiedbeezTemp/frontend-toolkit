"use client";

import { useRouter } from "next/navigation";
import { useSupabaseImages } from "../../../lib/supabase/useSupabase";
import Button from "../../ui/Button";

export default function FooterCard() {
  const images = useSupabaseImages();
  const router = useRouter();
  return (
    <footer className="bg-[linear-gradient(143deg,var(--brand-primary)_21.47%,var(--brand-secondary)_289.64%)] rounded-[1.6rem] mb-[5rem] mt-[2rem] lg:mt-[5rem]  ">
      <div
        className="flex flex-col items-center gap-[1rem] py-[5.3rem] px-[3rem]  text-center text-primary"
        style={{
          backgroundImage: `url(${images.footerBg})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <p className="text-[2rem] lg:text-[2.4rem] font-[700]">
          Ready to streamline your business communication?
        </p>

        <p className="text-[1.6rem] font-[400] text-primary/70">
          Join thousands of busineses that have already unified their <br />{" "}
          customer conversations with unifiedbeez
        </p>

        <div className="flex items-center gap-[1rem] mt-[2rem]">
          <Button
            className="text-brand-primary p-[1rem] rounded-[.8rem] text-[1.5rem]"
            variant="secondary"
            onClick={() => {
              const beehiveUrl = process.env.NEXT_PUBLIC_BEEHIVE_URL;
              if (beehiveUrl) {
                window.location.href = `${beehiveUrl}/get-started`;
              }
            }}
          >
            Get Started
          </Button>
          <Button className="text-brand-primary bg-brand-secondary p-[1rem] rounded-[.8rem] text-[1.5rem]">
            Contact sales team
          </Button>
        </div>
      </div>
    </footer>
  );
}
