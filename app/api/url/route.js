import { NextResponse } from "next/server";
import Teacher from "@/lib/modals/teacher";

export async function GET(request) {
  try {
    // Get the actual page URL from query parameters
    const url = new URL(request.url);
    const pathname = url.searchParams.get("path"); // Extract the passed path

    if (!pathname) {
      return NextResponse.json({ error: "Path not provided" }, { status: 400 });
    }

    console.log("Extracted Path:", pathname);

    // Extract all numbers from the pathname
    const numbers = pathname.match(/\d+/g);
    if (!numbers || numbers.length < 2) {
      return NextResponse.json({ error: "Invalid URL structure" }, { status: 400 });
    }

    const n = parseInt(numbers[0], 10);
    const m = parseInt(numbers[1], 10);
    console.log("Extracted numbers:", n, m);

    // Fetch teacher from the database
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
