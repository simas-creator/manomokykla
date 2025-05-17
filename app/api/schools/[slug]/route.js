import connect from "@/lib/mongodb";
import { NextResponse } from "next/server";
import School from "@/lib/modals/school";

export const PUT = async (request, { params }) => {
  const slug = (await params).slug;
  try {
    await connect();

    const school = await School.findOne({ url: slug });

    if (!school) {
      return NextResponse.json({ error: "School not found" }, { status: 404 });
    }

    return NextResponse.json(school, { status: 200 });
  } catch (error) {
    console.log("ERROR:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
