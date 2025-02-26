import TeacherReport from "@/lib/modals/teacherReport";
import connect from "@/lib/mongodb";
import { NextResponse } from "next/server";
export const POST = async (req) => {
    try {
    await connect();
    const data = await req.json();
    const { message, school, teacher, user} = data;
    console.log(message,school,teacher,user)
    const report = TeacherReport({
        user,
        school,
        teacher,
        message,
    });
    console.log(report)
    await report.save();
    return NextResponse.json({message: 'report submitted', report}, {status: 200})
    } catch (error) {
        console.log('error', error)
        return NextResponse.json({message: 'error', error}, {status: 500})
        
    }
}