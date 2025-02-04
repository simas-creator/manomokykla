import connect from "@/lib/mongodb";
import { NextResponse } from "next/server";
import School from "@/lib/modals/school";

export const GET = async () => {
  try {
    await connect();
    const schools = await School.find();

    return new NextResponse(JSON.stringify(schools), {
      status: 200,
      headers: {
        "Cache-Control": "s-maxage=3600, stale-while-revalidate", 
      },
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    return NextResponse.json({ error: "Error connecting to MongoDB" }, { status: 500 });
  }
};
