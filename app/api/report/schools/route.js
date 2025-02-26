import SchoolReport from "@/lib/modals/schoolReport";
import connect from "@/lib/mongodb";
import { NextResponse } from "next/server";
export const POST = async (req) => {
    try {
    await connect();
    const data = await req.json();
    const { message, school, user} = data;
    const report = SchoolReport({
        user,
        school,
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