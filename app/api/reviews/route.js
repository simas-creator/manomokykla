import { NextResponse } from "next/server";
import Review from "@/lib/modals/review";
import Teacher from "@/lib/modals/teacher";
import connect from "@/lib/mongodb";

export async function POST(req) {
  try {
    await connect();
    const body = await req.json();
    let { user, teacher_id, criterion1, criterion2, criterion3, comment, anonymous, rec } = body;
    criterion1 = parseInt(criterion1);
    criterion2 = parseInt(criterion2);
    criterion3 = parseInt(criterion3);

    const alreadyExist = await Review.findOne({ user, teacher_id });
    if (alreadyExist) {
      return NextResponse.json({ message: "Jau įvertinote šį mokytoją." }, { status: 400 });
    }

    const reviewData = {
      user,
      teacher_id,
      rec,
      criterion1,
      criterion2,
      criterion3,
      ...(comment?.trim() && { comment }),
      anonymous,
    };
    const newReview = new Review(reviewData);
    await newReview.save();

    const allReviews = await Review.find({ teacher_id });
    const total = allReviews.reduce((acc, review) => {
      const { criterion1: c1, criterion2: c2, criterion3: c3 } = review;
      return acc + (c1 + c2 + c3) / 3;
    }, 0);
    const rating = (total / allReviews.length).toFixed(2);

    const teacher = await Teacher.findOne({ _id: teacher_id });
    teacher.rating = rating;
    await teacher.save();

    return NextResponse.json({ message: "Įvertinimas išsaugotas sėkmingai!" }, { status: 200 });

  } catch (error) {
    console.log("Server Error:", error);
    return NextResponse.json({ message: "Server error. Try again later." }, { status: 500 });
  }
}
