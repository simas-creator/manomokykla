import { NextResponse } from "next/server";
import Review from "@/lib/modals/review";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const user = searchParams.get("user");
    const n = parseInt(searchParams.get("n"));
    const m = parseInt(searchParams.get("m"));

    if (!user || isNaN(n) || isNaN(m)) {
      return NextResponse.json({ exists: false, message: "Invalid request parameters" }, { status: 400 });
    }

    const alreadyExist = await Review.findOne({ user, n, m });

    return NextResponse.json({ exists: !!alreadyExist });
  } catch (error) {
    console.error("Error checking review:", error);
    return NextResponse.json({ exists: false, message: "Server error" }, { status: 500 });
  }
}
