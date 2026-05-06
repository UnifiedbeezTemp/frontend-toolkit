const CDN_BASE_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/assets/assets`;

export const getAssetUrl = (path: string): string => {
  return `${CDN_BASE_URL}/${path}`;
};
