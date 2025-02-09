import School from "@/lib/modals/school";
import { NextResponse } from "next/server";
import connect from "@/lib/mongodb";
export async function GET(req) {
    await connect()
    const {searchParams} = new URL(req.url)
    const n = searchParams.get('n');
    const school = await School.findOne({n});
    if(!school) {
        return NextResponse.json({message: error}, {status: 500})
    }
    return NextResponse.json({data: school.name, image: school.imgUrl}, {status: 200})
}