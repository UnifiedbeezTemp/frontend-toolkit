import { motion } from "framer-motion";
import Card from "@/shared/src/components/ui/Card";
import ImageComponent from "@/shared/src/components/ui/ImageComponent";
import { Check } from "lucide-react";
import ColorPickerCard from "./color-picker/ColorPickerCard";
import {
  itemVariants,
  imageVariants,
  borderVariants,
  springHover,
} from "./animations";

interface SupabaseImages {
  investorXWebsiteImage: string;
}

interface HeroImageSectionProps {
  variants?: typeof itemVariants;
  supabaseImages: SupabaseImages;
}

export default function HeroImageSection({
  variants = itemVariants,
  supabaseImages,
}: HeroImageSectionProps) {
  return (
    <motion.div
      className="mt-[-10rem] md:mt-[1rem] md:mr-[4rem] relative pt-[2.1rem] pl-[2rem] md:pl-0 pr- [2.1rem] md:pr-0 scale-80 md:scale-100"
      variants={variants}
    >
      <motion.span
        className="bg-brand-primary text-white grad-btn py-[5px] text-[1.4rem] px-[0.7rem] rounded-ss-[0.3rem] font-[700] rounded-se-[0.3rem] ml-[0.5rem] mt-[-1rem]"
        {...springHover}
      >
        Email Campaign 1
      </motion.span>

      <motion.div>
        <Card className="absolute ms top-[6.6rem] translate-x-[-60%] flex flex-col items-center gap-[1px] z-[10] px-[3rem] py-[0.5rem] rounded-[15px] shadow-xl">
          <ImageComponent
            src={"/images/logo.svg"}
            alt={"investor's website image"}
            width={50}
            height={50}
            className="rounded-full border-border border p-[0.8rem] w-[4rem] xl:w-[5rem]"
          />
          <p className="text-text-secondary text-[.8rem] sm:text-[1.3rem] md:text-[.94rem] xl:text-[1.5rem] font-[700]">
            Upload logo
          </p>
        </Card>
      </motion.div>

      <motion.div>
        <Card className="absolute top-[23rem] md:top-[19rem] xl:top-[30rem] translate-x-[-67%] flex flex-row items-center gap-[4rem] md:gap-[8rem] z-[10] px-[10px] py-[5px] rounded-[10px] shadow-xl ">
          <div className="flex gap-[5px] items-center gap-[10px] text-[1.2rem] xl:text-[2rem]">
            <p className="text-text-primary">TT</p>
            <p className="text-text-secondary font-[500]">Inter</p>
          </div>
          <Check className="text-brand-primary" />
        </Card>
      </motion.div>

      <ColorPickerCard />

      <AnimatedImage supabaseImages={supabaseImages} />
    </motion.div>
  );
}

function AnimatedImage({ supabaseImages }: { supabaseImages: SupabaseImages }) {
  return (
    <motion.div className="relative mt-[2px] scale-" variants={imageVariants}>
      <AnimatedBorders />

      <motion.div>
        <ImageComponent
          src={supabaseImages.investorXWebsiteImage}
          alt={"investor's website image"}
          width={600}
          height={600}
          className="rounded-[20px]"
        />
      </motion.div>
    </motion.div>
  );
}

function AnimatedBorders() {
  return (
    <>
      <motion.div
        className="absolute top-[-5px] left-[-5px] bg-primary w-[11px] h-[11px] border-[2px] border-brand-primary border z-[10]"
        variants={borderVariants}
      />
      <motion.div
        className="absolute top-[-5px] right-[-5px] bg-primary w-[11px] h-[11px] border-[2px] border-brand-primary border z-[10]"
        variants={borderVariants}
      />

      <motion.div
        className="absolute h-[2px] w-[100%] top-[-2px] left-[-2px] bg-gradient-to-r from-brand-primary to-brand-secondary"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      />
      <motion.div
        className="absolute h-[100%] w-[2px] left-[-2px] bg-gradient-to-r from-brand-primary to-brand-secondary"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      />
      <motion.div
        className="absolute h-[100%] w-[2px] right-[-2px] bg-brand-secondary"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      />
    </>
  );
}
