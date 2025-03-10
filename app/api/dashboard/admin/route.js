import Review from '@/lib/modals/review'
import School from '@/lib/modals/school'
import Teacher from '@/lib/modals/teacher'
import { NextResponse } from 'next/server'
export async function GET() {
    try {
        const allSchools = await School.find();
        const allTeachers = await Teacher.find();
        const allReviews = await Review.find();

        const pSchools = await School.find({status: 'pending'})
        const pTeachers = await Teacher.find({status: 'pending'})
        const pReviews = await Review.find({status: 'pending'})

        return NextResponse.json({allSchools,
            allTeachers,
            allReviews,
            pSchools,
            pTeachers,
            pReviews
        }, {status: 200})
    } catch (error) {
        console.log(error, 'error')
        return NextResponse.json({message: 'error getting data'}, {status: 500})
    }
}