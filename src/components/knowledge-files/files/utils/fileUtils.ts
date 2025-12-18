export const getFileTypeColor = (type: string): string => {
  switch (type.toLowerCase()) {
    case "pdf":
      return "bg-destructive";
    case "png":
    case "jpg":
    case "jpeg":
      return "bg-[#1671D9]";
    default:
      return "bg-muted";
  }
};

