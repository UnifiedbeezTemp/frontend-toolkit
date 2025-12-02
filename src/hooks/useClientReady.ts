import { useEffect, useState } from "react";
import { isUndefined } from "@app/utils/is";

export function useClientReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isUndefined(window)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setReady(true);
    }
  }, []);

  return ready;
}
