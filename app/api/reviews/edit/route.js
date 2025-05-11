import { NextResponse } from "next/server";
import Review from "@/lib/modals/review";
import connect from "@/lib/mongodb";
import recalculateTeacher from "@/lib/recalculateTeacher";
import { getToken } from "next-auth/jwt";
export async function PATCH(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_URL });

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    await connect();

    const body = await req.json();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const { criteria, comment, rec, anonymous } = body;

    if (!criteria || criteria.length !== 3) {
      return NextResponse.json(
        { message: "Invalid request parameters" },
        { status: 400 }
      );
    }

    const [criterion1, criterion2, criterion3] = criteria;
    const review = await Review.findOneAndUpdate(
      { _id: id },
      {
        comment,
        criterion1,
        criterion2,
        criterion3,
        rec,
        anonymous,
        status: "pending",
      },
      { new: true }
    );
    await recalculateTeacher(review.teacher_id);
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    console.log("Error processing PATCH request:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
