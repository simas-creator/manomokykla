import { NextResponse } from "next/server";
import Teacher from "@/lib/modals/teacher";
import connect from "@/lib/mongodb";
export async function GET(request) {

  try {
    await connect();
    // Get the actual page URL from query parameters
    const url = new URL(request.url);
    const n = url.searchParams.get("n");
    const m = url.searchParams.get('m')
    
    const teacher = await Teacher.findOne({ n, m }).lean(); // Convert to plain object
    if (!teacher) {
      return NextResponse.json({ error: "Teacher not found" }, { status: 404 });
    }
    return NextResponse.json(teacher); // Return teacher data as JSON
  } catch (error) {
    console.error("Error fetching teacher:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
