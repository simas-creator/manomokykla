import { NextResponse } from "next/server";
import Review from "@/lib/modals/review";
import { revalidateTag } from "next/cache";
import School from '@/lib/modals/school';
import Teacher from '@/lib/modals/teacher';
import connect from '@/lib/mongodb'
export async function PATCH(req) {
    const {searchParams} = new URL(req.url);
    const n = searchParams.get('n')
    const m = searchParams.get('m')
    const r = searchParams.get('r')

    await connect()
    const review = await Review.findOneAndUpdate({n, m, r}, {
        status: "ok"
    }, {new: true});
    console.log(review, 'our updated review');

        // Update teacher rating
        const teacher = await Teacher.findOne({ n, m });
        if (!teacher) {
          return NextResponse.json({ message: "Mokytojas nerastas." }, { status: 404 });
        }
    
        const approvedReviews = await Review.find({ n, m, status: 'ok' });
        const rCount = approvedReviews.length;

        let newR = 0;
        if (rCount > 0) {
        const totalRating = approvedReviews.reduce((sum, rev) => {
            const reviewAvg = ((rev.criterion1 + rev.criterion2 + rev.criterion3) / 3);
            return sum + reviewAvg;
        }, 0);
        
        newR = (totalRating / rCount).toFixed(1);
        }

        await Teacher.findOneAndUpdate({ n, m }, { rating: newR }, { new: true });
        
        const teachersInSchool = await Teacher.find({ n, status: 'ok' });
        const filtered = teachersInSchool.filter((teacher) => teacher.rating > 0.0)

        if (filtered.length > 0) {
          const schoolR = (filtered.reduce((sum, t) => sum + parseFloat(t.rating), 0) / filtered.length).toFixed(1);
          await School.findOneAndUpdate({ n }, { rating: schoolR });
        }

         const update2 = await Teacher.findOne({ n, m });
        
        
            if (update2 && review?.comment) {
              // Ensure reviews array exists
              update2.reviews = update2.reviews || [];
        
              // Count existing reviews
              const numberOfReviews = update2.reviews.length;
        
              // Push new review only if less than 2 reviews exist
              if (numberOfReviews < 2) {
                update2.reviews.push(review);
                await update2.save();
              }
            }
            revalidateTag(`school-${n}`)
    return NextResponse.json({message: "success"}, {status: 200})
}