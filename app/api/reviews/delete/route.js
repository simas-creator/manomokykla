import { NextResponse } from "next/server";
import Review from "@/lib/modals/review";
import connect from "@/lib/mongodb";
import recalculateTeacher from "@/lib/recalculateTeacher";

export async function DELETE(req) {
    try {
        await connect();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id")

        const deletedReview = await Review.findOneAndDelete({_id: id});

        if (!deletedReview) {
            return NextResponse.json({ message: "Review not found" }, { status: 404 });
        }
        if(deletedReview) {
            await recalculateTeacher(deletedReview.teacher_id)
        }

        return NextResponse.json({ message: "Review deleted and ratings updated" }, { status: 200 });

    } catch (error) {
        console.error("Error deleting review:", error);
        return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
    }
}
