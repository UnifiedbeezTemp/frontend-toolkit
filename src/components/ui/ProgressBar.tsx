import { motion } from "framer-motion";
import { useSupabaseIcons } from "../../lib/supabase/useSupabase";
import ImageComponent from "./ImageComponent";
import { cn } from "../../lib/utils";

interface ChildProps {
  progressPercentage: number;
  className?: string;
}

export default function ProgressBar({ progressPercentage, className }: ChildProps) {
  const supabaseIcons = useSupabaseIcons()
  return (
    <div className={cn("h-[1rem] bg-input-filled border border-border rounded-full shadow", className)}>
      <motion.div
        className={cn("h-full bg-gradient-to-r from-brand-secondary rounded-full relative", progressPercentage === 100 ? "to-brand-secondary" : "to-brand-primary")}
        initial={{ width: 0 }}
        animate={{ width: `${progressPercentage}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.div
          className="absolute right-[-0.4rem] top-1/2 transform -translate-y-1/2"
          animate={{ x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <ImageComponent alt="bee icon" src={progressPercentage === 100 ? supabaseIcons.beeYellowRight : supabaseIcons.beeGreenRight} width={25} height={25} className=""/>
        </motion.div>
      </motion.div>
    </div>
  );
}
