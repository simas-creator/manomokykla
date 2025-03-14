import { NextResponse } from "next/server";
import Review from "@/lib/modals/review";
import connect from "@/lib/mongodb";
import { revalidateTag } from "next/cache";
export async function POST(req) {
  try {
    await connect();
    const body = await req.json();
    let { user, n, m, criterion1, criterion2, criterion3, comment, anonymous, rec} = body;

    // Parse values correctly
    n = parseInt(n);
    m = parseInt(m);
    criterion1 = parseInt(criterion1);
    criterion2 = parseInt(criterion2);
    criterion3 = parseInt(criterion3);

    // Check if the user already submitted a review
    const alreadyExist = await Review.findOne({ user, n, m });
    if (alreadyExist) {
      return NextResponse.json({ message: "Jau įvertinote šį mokytoją." }, { status: 400 });
    }

    // Count existing reviews
    const rCount = await Review.countDocuments({ n, m, status: 'ok' });

    // Save the new review
    const reviewData = {
      user,
      n,
      m,
      r: rCount + 1,
      rec,
      criterion1,
      criterion2,
      criterion3,
      ...(comment?.trim() && { comment }),
      anonymous
    };
    const newReview = new Review(reviewData);
    revalidateTag(`school-${n}`);
    await newReview.save();
      
    return NextResponse.json({ message: "Įvertinimas išsaugotas sėkmingai!"}, { status: 200 });

  } catch (error) {
    console.log("Server Error:", error);
    return NextResponse.json({ message: "Server error. Try again later." }, { status: 500 });
  }
}
