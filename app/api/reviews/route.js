import { NextResponse } from "next/server";
import Review from "@/lib/modals/review";

export async function POST(req) {
    try {
        const body = await req.json();
        let { user, n, m, rec, criterion1, criterion2, criterion3, comment } = body;
        console.log("checking", n)
        n = parseInt(n);
        m = parseInt(m);
        criterion1 = parseInt(criterion1);
        criterion2 = parseInt(criterion2);
        criterion3 = parseInt(criterion3);
        rec = Boolean(rec);

        // Check if the user has already reviewed this teacher
        const alreadyExist = await Review.findOne({ user, n, m });
        if (alreadyExist) {
            return NextResponse.json({ message: "Jau įvertinote šį mokytoją." }, { status: 400 });
        }

        // Construct review object without comment if not provided
        const reviewData = {
            user,
            n,
            m,
            rec,
            criterion1,
            criterion2,
            criterion3,
        };
        if (comment?.trim()) {
            reviewData.comment = comment; // Only add comment if it's not empty
        }
        const review = new Review(reviewData);
        await review.save();

        return NextResponse.json({ message: "Įvertinimas išsaugotas sėkmingai!" }, { status: 200 });
    } catch (error) {
        console.error("Server Error:", error);
        return NextResponse.json({ message: "Server error. Try again later." }, { status: 500 });
    }
}
