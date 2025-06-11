"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { tours } from "@/db/schema";
import { v2 as cloudinary } from "cloudinary";
import { and, eq } from "drizzle-orm";

export const deleteImage = async (imgUrls: string[], tourId: string) => {
  const session = await auth();

  if (!session?.user.id) throw new Error("Unauthorized");

  try {
    if (imgUrls.length === 0) return;

    const response = await cloudinary.api.delete_resources(imgUrls);

    // const [updateTour] = await db
    //   .update(tours)
    //   .set({
    //     images: [],
    //     publicIds: [],
    //   })
    //   .where(and(eq(tours.id, tourId), eq(tours.userId, session?.user.id)))
    //   .returning();

    const result = await response.json;

    return result;
  } catch (error) {
    console.log(error);
  }
};
