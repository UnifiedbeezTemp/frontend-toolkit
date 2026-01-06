"use client"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "../../lib/utils"
import { ExpandableCardProps } from "./types"

export default function ExpandableCard({
  title,
  children,
  isExpanded,
  toggleExpanded,
  summary,
  summaryClassName,
  detailsClassName,
  useDefaultDetailsStyling = true,
  containerClassName,
}: ExpandableCardProps) {
  return (
    <div className={cn("flex flex-col gap-5.5 pb-5.5", containerClassName)}>
      <div
        onClick={toggleExpanded}
        className={cn(
          "w-full flex items-center justify-between px-3 hover:bg-soft-green/30 transition-colors",
          summaryClassName
        )}
        aria-expanded={isExpanded}
        aria-label={`${isExpanded ? "Collapse" : "Expand"} ${title}`}
      >
        {summary}
      </div>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div
              className={cn(
                useDefaultDetailsStyling &&
                  "overflow-hidden bg-gray-25 border-input-stroke border rounded-md pt-2.5 pb-4.5 px-2.75 md:p-4",
                detailsClassName
              )}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
