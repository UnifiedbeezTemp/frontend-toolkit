import { ConnectionDisplayData } from "../connections/types";
import { mapWebchatConnectionToDisplay } from "./webchatConnectionMapper";

export const connectionMapperMap: Record<
  string,
  (connection: unknown) => ConnectionDisplayData | null
> = {
  webchat: mapWebchatConnectionToDisplay,
};
