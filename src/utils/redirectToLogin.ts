import { buildUrlWithReturnTo, getCurrentLocationReturnTo } from "./safeRedirect";

export const redirectToLogin = () => {
  window.location.replace(
    buildUrlWithReturnTo(
      process.env.NEXT_PUBLIC_BASE || "",
      "/auth/signin",
      getCurrentLocationReturnTo(),
    ),
  );
};
