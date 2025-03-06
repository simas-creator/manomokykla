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
        const review = await Review.findOneAndUpdate(
            { n: numN, m: numM, r: numR },
            { comment, criterion1, criterion2, criterion3, rec },
            { new: true }
        );

        const school = await School.findOne({ n: numN });
        
        const teacher = await Teacher.findOne({n: numN, m: numM})
        const reviews = await Review.find({n: numN, m: numM})
        
        const teacherRating = reviews.reduce((acc, r) => {
            const one = r.criterion1
            const two = r.criterion2
            const three = r.criterion3
            const avg = (one + two + three) / 3;
            return acc + avg
        }, 0) / reviews.length;
        teacher.rating = teacherRating;
        console.log('our teacher rating', teacherRating)
        await teacher.save();
        const teachers = await Teacher.find({ n: numN });
        const avgR = teachers.reduce((acc, t) => {
            return acc + t.rating;
        }, 0) / teachers.length;
        console.log(avgR, 'our avg school reting')
        school.rating = avgR;
        await school.save();
        

        if (!review) {
            return NextResponse.json({ message: "Review not found" }, { status: 404 });
        }

        revalidateTag(`teachers`)
        revalidateTag(`teacher-${n}-${m}`)
        revalidateTag(`school-${n}`);
        revalidatePath(`/perziureti-mokyklas/-${n}/-${m}`)
        return NextResponse.json(
            { message: "Success", updatedReview: review },
            { status: 200 }
        );

    } catch (error) {
        console.log("Error processing PATCH request:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
