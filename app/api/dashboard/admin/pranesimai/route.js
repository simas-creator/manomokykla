import School from '@/lib/modals/school'
import Teacher from '@/lib/modals/teacher'
import SchoolReport from '@/lib/modals/schoolReport'
import TeacherReport from '@/lib/modals/teacherReport'
import { NextResponse } from 'next/server'
export async function GET() {
    try {
        const schoolReports = await SchoolReport.find({});
        const teacherReports = await TeacherReport.find({});

        const teacherNames = {};
        const teacherPromises = teacherReports.map(async (report) => {
            const teacher = await Teacher.findOne({n: report.school, m: report.teacher})
            const school = await School.findOne({n: report.school});
            
            // Check if teacher and school exist before accessing properties
            if (teacher && school) {
                teacherNames[`${report.school}-${report.teacher}`] = `${teacher.name} ${teacher.surname} - ${school.name}`
            } else {
                // Provide a fallback for missing data
                teacherNames[`${report.school}-${report.teacher}`] = "Unknown teacher or school"
            }
        })
        await Promise.all(teacherPromises)

        const schoolNames={}
        const schoolPromises = schoolReports.map(async (report) => {
            const school = await School.findOne({n: report.school})
            if (school) {
                schoolNames[report.school] = school.name
            } else {
                schoolNames[report.school] = "Unknown school"
            }
        })
        await Promise.all(schoolPromises)
        return NextResponse.json({
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