import Teacher from "@/lib/modals/teacher";
import connect from "@/lib/mongodb";
import { NextResponse } from "next/server";
export const GET = async (req, {params}) => {
    await connect();
    try {
        const number = (await params).number;
        const data = await Teacher.find({n: number});
        if(!data) {
            return NextResponse.json({ message: 'No teacher found' }, { status: 404 });
        }
        return NextResponse.json({data}, { status: 200 });
    } catch (error) {
        console.log("error:", error.message);
        return NextResponse.json(
            { message: "An error occurred while saving teacher data" },
            { status: 500 }
        );
    }
}