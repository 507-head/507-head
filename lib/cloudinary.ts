import "server-only";

import { v2 as cloudinary } from "cloudinary";

// The SDK reads CLOUDINARY_URL automatically. Also support separate server-side
// variables, which can be configured individually in Vercel.
cloudinary.config({
  secure: true,
  ...(process.env.CLOUDINARY_CLOUD_NAME && {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  }),
  ...(process.env.CLOUDINARY_API_KEY && {
    api_key: process.env.CLOUDINARY_API_KEY,
  }),
  ...(process.env.CLOUDINARY_API_SECRET && {
    api_secret: process.env.CLOUDINARY_API_SECRET,
  }),
});

export const CLOUDINARY_MEDIA_FOLDER = "507head/media";

export function getCloudinaryConfig() {
  const config = cloudinary.config();

  if (!config.cloud_name || !config.api_key || !config.api_secret) {
    throw new Error(
      "Cloudinary credentials are missing. Set CLOUDINARY_URL or CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in the server environment.",
    );
  }

  return {
    cloudName: config.cloud_name,
    apiKey: config.api_key,
    apiSecret: config.api_secret,
  };
}

export { cloudinary };
