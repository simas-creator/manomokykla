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

        
        

        const teacherNames = {};
        const teacherPromises = teacherReports.map(async (report) => {
            const teacher = await Teacher.findOne({n: report.school, m: report.teacher})
            const school = await School.findOne({n: report.school});
            teacherNames[`${report.school}-${report.teacher}`] = `${teacher.name} ${teacher.surname} - ${school.name}`
        })
        await Promise.all(teacherPromises)
        
        const reviewsPromises = pReviews.map(async (review) => {
            const {n, m} = review;
            const teacher = await Teacher.findOne({n, m});
            const school = await School.findOne({n});
            teacherNames[`${n}-${m}`] = `${teacher.name} ${teacher.surname} - ${school.name}`
        })
        await Promise.all(reviewsPromises)

        const schoolNames = {};
        const schoolPromises = schoolReports.map(async (report) => {
            const school = await School.findOne({n: report.school})
            schoolNames[report.school] = school.name
        })
        await Promise.all(schoolPromises)
        return NextResponse.json({
            pSchools,
            pTeachers,
            pReviews,
            teacherReports,
            schoolReports,
            teacherNames,
            schoolNames,
        }, {status: 200})
    } catch (error) {
        console.log(error, 'error')
        return NextResponse.json({message: 'error getting data'}, {status: 500})
    }
}