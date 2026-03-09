import { useParams, useRouter } from "next/navigation";
import { Contact } from "../../types";
import { RootState } from "../../../../../store";
import { useAppSelector } from "../../../../../store/hooks/useRedux";

export function useContactDetails() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  // Use static mock for UI development as requested
  const contact: Contact = {
    id: id || "1",
    name: "Olivia Rhye",
    username: "@olivia",
    email: "olivia@example.com",
    phone: "+234 902 922 1234",
    dateCreated: "12:32:56",
    status: "active",
    list: "Product Designers",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia",
  };

  const handleBack = () => {
    router.push("/crm/contacts");
  };

  return {
    contact,
    handleBack,
    id,
  };
}
