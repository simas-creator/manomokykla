"use server";

import Review from "@/lib/modals/review";
import connect from "./mongodb";

export default async function didUserReview(teacherIds, email) {
  await connect();

  try {
    const reviews = await Promise.all(
      teacherIds.map(async (id) => {
        const review = await Review.findOne({ user: email, teacher_id: id });
        return {
          teacherId: id,
          reviewed: !!review
        }; 
      })
    );
    return reviews;
  } catch (error) {
    console.error("Error checking reviews:", error);
    return [];
  }
}