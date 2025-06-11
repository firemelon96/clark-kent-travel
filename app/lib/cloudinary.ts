import { v2 as cloudinary } from "cloudinary";

export const deleteCloudinaryImages = async (publicIds: string[]) => {
  if (!publicIds || publicIds.length === 0) return;

  try {
    const result = await cloudinary.api.delete_resources(publicIds);
    console.log("Deleted from Cloudinary:", result);
  } catch (error) {
    console.error("Cloudinary deletion error:", error);
  }
};
