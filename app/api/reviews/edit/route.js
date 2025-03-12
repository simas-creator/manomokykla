import { NextResponse } from "next/server";
import Review from '@/lib/modals/review';
import connect from "@/lib/mongodb";
import School from '@/lib/modals/school';
import Teacher from '@/lib/modals/teacher';
import { revalidateTag, revalidatePath} from "next/cache";
export async function PATCH(req) {
    try {
        await connect();
        
        const body = await req.json();
        const { searchParams } = new URL(req.url);
        const n = searchParams.get('n');
        const m = searchParams.get('m');
        const r = searchParams.get('r');

        const { criteria, comment, rec } = body;

        if (!n || !m || !r || !criteria || criteria.length !== 3) {
            return NextResponse.json({ message: "Invalid request parameters" }, { status: 400 });
        }

        // Convert to numbers if needed
        const numN = Number(n);
        const numM = Number(m);
        const numR = Number(r);
        const [criterion1, criterion2, criterion3] = criteria;

        // Update the review
        await Review.findOneAndUpdate(
            { n: numN, m: numM, r: numR },
            { comment, criterion1, criterion2, criterion3, rec, status: 'pending'},
            { new: true }
        );
        return NextResponse.json({message: "success"}, {status: 200})
    } catch (error) {
        console.log("Error processing PATCH request:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
