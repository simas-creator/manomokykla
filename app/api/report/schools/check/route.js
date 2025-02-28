import { NextResponse } from "next/server";
import SchoolReport from "@/lib/modals/schoolReport";

export const GET = async (req) => {
    try {
        const url = await req.url;
        const searchParams = new URL(url).searchParams
        const user = searchParams.get('user')
        const n = parseInt(searchParams.get('school'))
        const report = await SchoolReport.findOne({user, school: n});
        if(report) {
            return NextResponse.json({exists: true, message: 'You have already reported this school'}, {status: 200})
        } else {
            return NextResponse.json({exists: false, message: 'You have not reported this school'}, {status: 200})
        }
    } catch (error) {
        console.log('error', error)
        return NextResponse.json({exists: false, message: 'Server error'}, {status: 500})
    }
    
}