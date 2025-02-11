import { NextResponse } from "next/server";
import connect from "@/lib/mongodb";
import School from "@/lib/modals/school";
import { revalidateTag } from "next/cache";



export async function POST(req) {
  try {

    await connect();

    const {name, apskritis, type, imgUrl, user } = await req.json();
    console.log("Received data:", { name, apskritis, type, imgUrl, user });  
    ;
    const n = await School.countDocuments();
    
    const newSchool = new School({
      name,
      apskritis,
      type,
      teachers: [],
      imgUrl: `https://mokyklos.s3.eu-north-1.amazonaws.com/${imgUrl}`,
      n: n + 1,
      rating: 0,
      user,
      status: "pending",
    });

    // Save the document to the database
    const savedSchool = await newSchool.save();
    revalidateTag('schools');
    return NextResponse.json({ success: true, school: savedSchool });
  } catch (error) {
    console.error("error:", error.message);
    return NextResponse.json(
      { error: "An error occurred while saving school data" },
      { status: 500 }
    );
  }
}
