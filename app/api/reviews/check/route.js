import { NextResponse } from "next/server";
import Review from "@/lib/modals/review";
import User from '@/lib/modals/user';
import connect from "@/lib/mongodb";
export async function GET(req) {
  try {
    await connect()
    const { searchParams } = new URL(req.url);
    const user = searchParams.get("user");
    const m = searchParams.get("m")
    const block = await User.findOne({email: user}).lean();
    console.log('our username: ', block)
    if (!user) {
      return NextResponse.json({ exists: false, message: "Invalid request parameters" }, { status: 400 });
    }
    const alreadyExist = await Review.findOne({ user: block.username, teacher_id: m }).lean();
    console.log(alreadyExist, ' exists??')
    return NextResponse.json({ exists: !!alreadyExist, data: alreadyExist});
  } catch (error) {
    console.error("Error checking review:", error);
    return NextResponse.json({ exists: false, message: "Server error" }, { status: 500 });
  }
}
