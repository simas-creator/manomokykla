import { NextResponse } from "next/server";
import Review from "@/lib/modals/review";
import Teacher from "@/lib/modals/teacher";
import connect from '@/lib/mongodb'
import { revalidateTag } from "next/cache";
export async function POST(req) {
    try {
        await connect();
        const body = await req.json();
        let { user, n, m, rec, criterion1, criterion2, criterion3, comment } = body;
        console.log("checking", n)
        n = parseInt(n);
        m = parseInt(m);
        criterion1 = parseInt(criterion1);
        criterion2 = parseInt(criterion2);
        criterion3 = parseInt(criterion3);
        rec = Boolean(rec);
        const ovrR = ((criterion1 + criterion2 + criterion3) / 3).toFixed(1);
        const alreadyExist = await Review.findOne({ user, n, m });
        if (alreadyExist) {
            return NextResponse.json({ message: "Jau įvertinote šį mokytoją." }, { status: 400 });
        }

        const rCount = await Review.countDocuments({n, m})
        if(rCount === 0) {
            await Teacher.findOneAndUpdate({n, m}, {
                rating: ovrR
            })
            revalidateTag('teachers')
        } else {
            const teacher = await Teacher.findOne({n, m});
            const newR = ((rCount * teacher.rating + parseFloat(ovrR)) / (rCount + 1)).toFixed(1);
            await Teacher.findOneAndUpdate({n, m}, {
                rating: newR
            })
            console.log(newR)
        }
        console.log('ivertinimu skaicius: ', rCount)

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
