import { NextResponse } from "next/server";
import connect from "@/lib/mongodb";
import School from "@/lib/modals/school";



export async function POST(req) {
  try {
    await connect();

    const {name, apskritis, mu, image } = await req.json();
    console.log("Received data:", { name, apskritis, mu, image });  
    
    const newSchool = new School({
      name,
      apskritis,
      mu,
      teachers: [],
      imgUrl: image,
    });

    // Save the document to the database
    const savedSchool = await newSchool.save();

    return NextResponse.json({ success: true, school: savedSchool });
  } catch (error) {
    console.error("Error adding a school", error.message);
    return NextResponse.json(
      { error: "An error occurred while saving school data" },
      { status: 500 }
    );
  }
}
