
import Review from "@/lib/modals/review";
export default async function didUserReview(userEmail, teacherId) {
  try {
    const review = await Review.findOne({ user: userEmail, teacher_id: teacherId });
    return !!review;  // true or false
  } catch (error) {
    console.error("Error checking review:", error);
    return false;  // fallback on error
  }
}
