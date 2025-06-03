import { NextResponse } from "next/server";
import Review from "@/lib/modals/review";
import connect from "@/lib/mongodb";
import recalculateTeacher from "@/lib/recalculateTeacher";
import { getToken } from "next-auth/jwt";
export async function POST(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if(!token) {
    return NextResponse.json({message: "Unauthorized"}, {status: 401});
  }
  try {
    await connect();
    const body = await req.json();
    let {
      user,
      name,
      teacher_id,
      criterion1,
      criterion2,
      criterion3,
      comment,
      anonymous,
      rec,
    } = body;
    criterion1 = parseInt(criterion1);
    criterion2 = parseInt(criterion2);
    criterion3 = parseInt(criterion3);
    
    const alreadyExist = await Review.findOne({ user, teacher_id });
    if (alreadyExist) {
      return NextResponse.json(
        { message: "Jau įvertinote šį mokytoją." },
        { status: 400 }
      );
    }

    const reviewData = {
      user,
      name,
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

    await recalculateTeacher(newReview.teacher_id)

    return NextResponse.json(
      { message: "Įvertinimas išsaugotas sėkmingai!" },
      { status: 200 }
    );

  } catch (error) {
    console.log("Server Error:", error);
    return NextResponse.json(
      { message: "Server error. Try again later." },
      { status: 500 }
    );
  }
}
