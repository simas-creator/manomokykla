import { NextResponse } from "next/server";
import connect from "@/lib/mongodb";
import School from "@/lib/modals/school";



export async function POST(req) {
  try {

    const db = await connect();

    const {name, apskritis, mu, imgUrl } = await req.json();
    console.log("Received data:", { name, apskritis, mu, imgUrl });  
    ;
    const counterObj = await db.collection("counters").findOneAndUpdate(
      { name : "schoolCounter"},
      { $inc: { number: 1 } },
      { returnDocument: "after", upsert: true }
    )
    const n = counterObj.number;
    const newSchool = new School({
      name,
      apskritis,
      mu,
      teachers: [],
      imgUrl: `https://mokyklos.s3.eu-north-1.amazonaws.com/${imgUrl}`,
      n,
      rating: 0,
    });

    // Save the document to the database
    const savedSchool = await newSchool.save();

    return NextResponse.json({ success: true, school: savedSchool });
  } catch (error) {
    console.error("error:", error.message);
    return NextResponse.json(
      { error: "An error occurred while saving school data" },
      { status: 500 }
    );
  }
}
