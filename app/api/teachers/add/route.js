import { NextResponse } from "next/server";
import connect from "@/lib/mongodb";
import Teacher from "@/lib/modals/teacher";



export async function POST(req) {
  try {
    // Ensure a connection to the database
    await connect();


    const { name, surname, subject, school, review, image, rating} = await req.json();
    console.log("Received data:", { name, surname, subject, school, review, image, rating });
    // Validate required fields
    if (!name || !surname || !subject || !school) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const newTeacher = new Teacher({
      name,
      surname,
      subject,
      school,
      comment: review,
      imageUrl: image,
      rating
    });

    // Save the document to the database
    const savedTeacher = await newTeacher.save();

    // Return the saved document as a response
    return NextResponse.json({ success: true, teacher: savedTeacher });
  } catch (error) {
    console.error("Error adding teacher:", error.message);
    return NextResponse.json(
      { error: "An error occurred while saving teacher data" },
      { status: 500 }
    );
  }
}
