import { Transition } from "framer-motion";

export const contentTransition: Transition = {
  type: "spring",
  damping: 25,
  stiffness: 300,
  duration: 0.3,
};

export const backdropTransition: Transition = {
  duration: 0.2,
};

export const modalEnterTransition: Transition = {
  type: "spring",
  damping: 30,
  stiffness: 400,
};

export const modalExitTransition: Transition = {
  duration: 0.2,
  ease: "easeIn",
};