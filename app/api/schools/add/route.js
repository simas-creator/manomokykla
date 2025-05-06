import { NextResponse } from "next/server";
import connect from "@/lib/mongodb";
import School from "@/lib/modals/school";
import { revalidateTag } from "next/cache";
import { getToken } from "next-auth/jwt";
import replaceLithuanianChars from "@/lib/transfomUrl";
export async function POST(req) {
  try {

    await connect();
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return NextResponse.json({message: "Unauthorized"}, {status: 401});
    }
    const {name, apskritis, type, imgUrl, user } = await req.json();
    console.log("Received data:", { name, apskritis, type, imgUrl, user });  
    ;
    const url = replaceLithuanianChars(name);
    console.log(url, 'our url')
    const newSchool = new School({
      name,
      url,
      apskritis,
      type,
      imgUrl: `https://mokyklos.s3.eu-north-1.amazonaws.com/${imgUrl}`,
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
