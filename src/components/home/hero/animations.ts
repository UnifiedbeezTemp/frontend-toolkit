import { Variants } from "framer-motion";

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export const borderVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.3,
    },
  },
};

export const springHover = {
  whileHover: { scale: 1.05 },
  transition: { type: "spring" as const, stiffness: 300 },
};

export const springHoverLift = {
  whileHover: { scale: 1.05, y: -5 },
  transition: { type: "spring" as const, stiffness: 300 },
};

export const springHoverSlide = {
  whileHover: { scale: 1.05, x: -5 },
  transition: { type: "spring" as const, stiffness: 300 },
};
