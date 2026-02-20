import { Contact } from "../../../store/slices/contactSlice";

export const getContactStatusStyles = (status: Contact["status"]) => {
  switch (status) {
    case "Active":
      return "bg-success/10 text-success";
    case "Unconfirmed":
      return "bg-warning/10 text-warning";
    case "Unsubscribed":
      return "bg-destructive/10 text-destructive";
    case "Bounced":
      return "bg-input-filled text-text-primary/50";
    default:
      return "bg-secondary-100 text-text-primary";
  }
};
