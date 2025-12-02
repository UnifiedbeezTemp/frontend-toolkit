export const bottomSheetVariants = {
  hidden: { 
    opacity: 0, 
    y: "100%",
  },
  visible: { 
    opacity: 1, 
    y: 0,
  },
  exit: { 
    opacity: 0, 
    y: "100%",
  }
};

export const regularModalVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.9, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0 
  },
  exit: { 
    opacity: 0, 
    scale: 0.9, 
    y: 20 
  }
};