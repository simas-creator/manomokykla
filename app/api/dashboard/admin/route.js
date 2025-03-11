import Review from '@/lib/modals/review'
import School from '@/lib/modals/school'
import Teacher from '@/lib/modals/teacher'
import SchoolReport from '@/lib/modals/schoolReport'
import TeacherReport from '@/lib/modals/teacherReport'
import { NextResponse } from 'next/server'
export async function GET() {
    try {
        const pSchools = await School.find({status: 'pending'})
        const pTeachers = await Teacher.find({status: 'pending'})
        const pReviews = await Review.find({status: 'pending'})

        const schoolReports = await SchoolReport.find({});
        const teacherReports = await TeacherReport.find({});
        return NextResponse.json({
            pSchools,
            pTeachers,
            pReviews,
            teacherReports,
            schoolReports
        }, {status: 200})
    } catch (error) {
        console.log(error, 'error')
        return NextResponse.json({message: 'error getting data'}, {status: 500})
    }
}