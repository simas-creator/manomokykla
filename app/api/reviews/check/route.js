import { NextResponse } from "next/server";
import Review from "@/lib/modals/review";
import User from '@/lib/modals/user';
import connect from "@/lib/mongodb";
export async function GET(req) {

  try {
    await connect()
    const { searchParams } = new URL(req.url);
    const user = searchParams.get("user");
    const n = parseInt(searchParams.get("n"));
    const m = parseInt(searchParams.get("m"));
    const block = await User.findOne({email: user}).lean();
    console.log('our username: ', block)
    if (!user || isNaN(n) || isNaN(m)) {
      return NextResponse.json({ exists: false, message: "Invalid request parameters" }, { status: 400 });
    }
    const alreadyExist = await Review.findOne({ user: block.username, n, m });
    console.log(alreadyExist, ' exists??')
    return NextResponse.json({ exists: !!alreadyExist});
  } catch (error) {
    console.error("Error checking review:", error);
    return NextResponse.json({ exists: false, message: "Server error" }, { status: 500 });
  }
}
