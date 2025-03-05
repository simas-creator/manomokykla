import { NextResponse } from "next/server";
import Review from "@/lib/modals/review";
import connect from "@/lib/mongodb";
import School from "@/lib/modals/school";
import Teacher from "@/lib/modals/teacher";
import { revalidateTag, revalidatePath } from "next/cache";

export async function DELETE(req) {
    try {
        await connect();
        const { searchParams } = new URL(req.url);
        const n = Number(searchParams.get("n"));
        const m = Number(searchParams.get("m"));
        const r = Number(searchParams.get("r"));

        if (isNaN(n) || isNaN(m) || isNaN(r)) {
            return NextResponse.json({ message: "Invalid parameters" }, { status: 400 });
        }

        // Delete the review
        const deletedReview = await Review.findOneAndDelete({ n, m, r });

        if (!deletedReview) {
            return NextResponse.json({ message: "Review not found" }, { status: 404 });
        }

        // Recalculate teacher's rating
        const reviews = await Review.find({ n, m });
        const teacherRating = reviews.length > 0
            ? reviews.reduce((acc, r) => acc + (r.criterion1 + r.criterion2 + r.criterion3) / 3, 0) / reviews.length
            : 0;

        await Teacher.findOneAndUpdate({ n, m }, { rating: teacherRating }, { new: true });

        // Recalculate school's rating
        const teachers = await Teacher.find({ n });
        const schoolRating = teachers.length > 0
            ? teachers.reduce((acc, t) => acc + t.rating, 0) / teachers.length
            : 0;

        await School.findOneAndUpdate({ n }, { rating: schoolRating }, { new: true });

        // Revalidate cache for UI updates
        revalidateTag(`teachers`);
        revalidateTag(`teacher-${n}-${m}`);
        revalidateTag(`school-${n}`);
        revalidatePath(`/perziureti-mokyklas/-${n}/-${m}`);

        return NextResponse.json({ message: "Review deleted and ratings updated" }, { status: 200 });

    } catch (error) {
        console.error("Error deleting review:", error);
        return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
    }
}
