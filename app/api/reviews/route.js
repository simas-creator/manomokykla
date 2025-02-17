import { NextResponse } from "next/server";
import Review from "@/lib/modals/review";
import Teacher from "@/lib/modals/teacher";
import School from "@/lib/modals/school";
import connect from "@/lib/mongodb";
import { revalidateTag } from "next/cache";
export async function POST(req) {
  try {
    await connect();
    const body = await req.json();
    let { user, n, m, rec, criterion1, criterion2, criterion3, comment } = body;

    console.log("Checking teacher:", n);

    // Parse values correctly
    n = parseInt(n);
    m = parseInt(m);
    criterion1 = parseInt(criterion1);
    criterion2 = parseInt(criterion2);
    criterion3 = parseInt(criterion3);
    rec = Boolean(rec);
    
    const ovrR = ((criterion1 + criterion2 + criterion3) / 3).toFixed(1);

    // Check if the user already submitted a review
    const alreadyExist = await Review.findOne({ user, n, m });
    if (alreadyExist) {
      return NextResponse.json({ message: "Jau įvertinote šį mokytoją." }, { status: 400 });
    }

    // Count existing reviews
    const rCount = await Review.countDocuments({ n, m });

    // Update teacher rating
    const teacher = await Teacher.findOne({ n, m });
    if (!teacher) {
      return NextResponse.json({ message: "Mokytojas nerastas." }, { status: 404 });
    }

    const newR = rCount === 0 
      ? parseFloat(ovrR) 
      : ((rCount * teacher.rating + parseFloat(ovrR)) / (rCount + 1)).toFixed(1);

    const updatedTeacher = await Teacher.findOneAndUpdate({ n, m }, { rating: newR }, { new: true });

    // Update school rating
    const teachersInSchool = await Teacher.find({ n });
    if (teachersInSchool.length > 0) {
      const schoolR = (teachersInSchool.reduce((sum, t) => sum + parseFloat(t.rating), 0) / teachersInSchool.length).toFixed(1);
      await School.findOneAndUpdate({ n }, { rating: schoolR });
    }

    // Save the new review
    const reviewData = {
      user,
      n,
      m,
      rec,
      criterion1,
      criterion2,
      criterion3,
      ...(comment?.trim() && { comment })
    };

    const review = new Review(reviewData);
    revalidateTag(`school-${n}`)
    await review.save();

    return NextResponse.json({ message: "Įvertinimas išsaugotas sėkmingai!", updatedTeacher }, { status: 200 });

  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ message: "Server error. Try again later." }, { status: 500 });
  }
}
