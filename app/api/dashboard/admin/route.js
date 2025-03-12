import Review from '@/lib/modals/review'
import School from '@/lib/modals/school'
import Teacher from '@/lib/modals/teacher'

import { NextResponse } from 'next/server'
export async function GET() {
    try {
        const pSchools = await School.find({status: 'pending'})
        const pTeachers = await Teacher.find({status: 'pending'})
        const pReviews = await Review.find({status: 'pending'})


        const teacherNames ={}
        const reviewsPromises = pReviews.map(async (review) => {
            const {n, m} = review;
            const teacher = await Teacher.findOne({n, m});
            const school = await School.findOne({n});
            
            if (teacher && school) {
                teacherNames[`${n}-${m}`] = `${teacher.name} ${teacher.surname} - ${school.name}`
            } else {
                teacherNames[`${n}-${m}`] = "Unknown teacher or school"
            }
        })
        await Promise.all(reviewsPromises)
        return NextResponse.json({
            pSchools,
            pTeachers,
            pReviews,
            teacherNames,
        }, {status: 200})
    } catch (error) {
        console.log(error, 'error')
        return NextResponse.json({message: 'error getting data'}, {status: 500})
    }
}