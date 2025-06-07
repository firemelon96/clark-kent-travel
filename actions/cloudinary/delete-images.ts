"use server";

import { v2 as cloudinary } from "cloudinary";

export const deleteImage = async (imgUrls: string[]) => {
  try {
    if (imgUrls.length === 0) return;

    const response = await cloudinary.api.delete_resources(imgUrls);

    const result = await response.json;

    return result;
  } catch (error) {
    console.log(error);
  }
};
