import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function uploadImage(fileBase64) {
  // fileBase64 = "data:image/jpeg;base64,..."
  const result = await cloudinary.uploader.upload(fileBase64, {
    folder: "hiralalnagar",
  });
  return result.secure_url; // Sanity में यह URL स्टोर होगा
}
