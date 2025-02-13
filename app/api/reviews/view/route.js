import connect from '@/lib/mongodb'
import Review from '@/lib/modals/review'
import { NextResponse } from 'next/server';
export async function GET (req) {
    try {
        await connect();
        const { searchParams } = new URL(req.url);
        const n = parseInt(searchParams.get("n"));
        const m = parseInt(searchParams.get("m"));
        const reviews = await Review.find({n, m});
        console.log(reviews)
        return NextResponse.json(reviews, {status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: error}, {status: 500})
    }
}