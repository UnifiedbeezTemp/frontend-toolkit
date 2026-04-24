import { PlaceholderFormData } from "../hooks/usePlaceholderConfig";
import { UseFormWatch } from "react-hook-form";

export function prepareFormSubmitData(
  watch: UseFormWatch<PlaceholderFormData>
): PlaceholderFormData {
  const name = watch("name");
  const apiKey = watch("apiKey");
  const apiSecret = watch("apiSecret");

  return {
    name: typeof name === "string" ? name : "",
    apiKey: typeof apiKey === "string" ? apiKey : "",
    apiSecret: typeof apiSecret === "string" ? apiSecret : "",
  };
}

