import { NextResponse } from "next/server";
import TeacherReport from "@/lib/modals/teacherReport";

export const GET = async (req) => {
    try {
        const url = await req.url;
        const searchParams = new URL(url).searchParams
        const user = searchParams.get('user')
        const n = parseInt(searchParams.get('school'))
        const m = parseInt(searchParams.get('teacher'))
        const report = await TeacherReport.findOne({user, school: n, teacher: m});
        if(report) {
            return NextResponse.json({exists: true, message: 'You have already reported this school', report}, {status: 200})
        } else {
            return NextResponse.json({exists: false, message: 'You have not reported this school'}, {status: 200})
        }
    } catch (error) {
        console.log('error', error)
        return NextResponse.json({exists: false, message: 'Server error'}, {status: 500})
    }
    
}