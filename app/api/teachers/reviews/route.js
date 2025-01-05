import connect from "@/lib/mongodb"; // Adjust the path as needed
import { NextResponse } from "next/server";
import Teacher from "@/lib/modals/teacher";
export const GET = async () => {
  try {
    await connect();
    const teachers = await Teacher.find();
    return new NextResponse(JSON.stringify(teachers), {status: 200}); 
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    return NextResponse.json({ error: 'Error connecting to MongoDB' }, { status: 500 });
  }
};