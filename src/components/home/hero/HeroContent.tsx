import { motion } from "framer-motion";
import Link from "next/link";
import { itemVariants } from "./animations";
import { useRouter } from "next/navigation";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";

export default function HeroContent() {
  const router = useRouter();
  return (
    <motion.div
      className="flex flex-col items-start justify-between py-[2.2rem] px-[2.1rem] pr-[4rem] md:pr-[2.1rem] xl:pb-[5.6rem] xl:pt-[5.6rem] xl:max-w-[43rem] xl:w-[50%] lg:mt-[6rem]"
      variants={itemVariants}
    >
      <div className="">
        <Heading
          className="text-[2rem] xl:text-[2.4rem]" 
        >
          Set Up Your Brand Kit <br className="hidden md:block" /> with UnifiedBeez builder.
        </Heading>

        <motion.p
          className="text-text-primary mt-[0.8rem] text-[1.4rem] leading-[2.3rem]"
          variants={itemVariants}
        >
          Upload your logo, colors, and fonts so every email, campaigns and
          automation reflects your brand's unique identity.
        </motion.p>

        <motion.div variants={itemVariants}>
          <Button
            className="mt-[2.4rem] px-[1.6rem] xl:py-[.6rem] rounded-[0.8rem] text-[1.5rem]"
            onClick={() => router.push("/brand-kit")}
          >
            Create your brand kit
          </Button>
        </motion.div>
      </div>

      {/* <motion.p
        className="text-[1.2rem] text-text-primary mt-[3.2rem] md:mt-0"
        variants={itemVariants}
      >
        Need help? Check out our{" "}
        <Link
          href={"#"}
          className="text-brand-primary underline hover:text-brand-secondary"
        >
          brand kit guidelines
        </Link>{" "}
        for best practices and recommended file formats.
      </motion.p> */}
    </motion.div>
  );
}
