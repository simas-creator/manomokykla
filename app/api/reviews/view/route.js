import connect from '@/lib/mongodb'
import Review from '@/lib/modals/review'
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        await connect();
        const { searchParams } = new URL(req.url);
        const n = searchParams.get("n");
        const filter1 = searchParams.get('ivertinimai');
        const id = n.trim()
        let reviews = await Review.find({ teacher_id: id});

        reviews.sort((a, b) => {
            const ratingA = (a.criterion1 + a.criterion2 + a.criterion3) / 3;
            const ratingB = (b.criterion1 + b.criterion2 + b.criterion3) / 3;
            const dateA = new Date(a.updatedAt);
            const dateB = new Date(b.updatedAt);

            // Sort by rating (Primary if filter1 is set)
            if (filter1 === 'nuoauksciausioivertinimo') {
                if (ratingB !== ratingA) return ratingB - ratingA; 
            } 
            if (filter1 === 'nuozemiausioivertinimo') {
                if (ratingA !== ratingB) return ratingA - ratingB; 
            }

            // Sort by date (Secondary if filter2 is set)
            if (filter1 === 'nuonaujausio') {
                return dateB - dateA;
            } 
            if (filter1 === 'nuoseniausio') {
                return dateA - dateB;
            }

            return 0; // No sorting applied
        });
        return NextResponse.json(reviews, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
