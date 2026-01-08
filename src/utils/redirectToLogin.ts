export const redirectToLogin = () => {
  const currentUrl = window.location.href;
  const encoded = encodeURIComponent(currentUrl);
  window.location.replace(
    `${process.env.NEXT_PUBLIC_BASE}/auth/signin?returnTo=${encoded}`
  );
};
