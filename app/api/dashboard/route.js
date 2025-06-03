import School from "@/lib/modals/school";
import Teacher from "@/lib/modals/teacher";
import Review from "@/lib/modals/review";
import { NextResponse } from "next/server";
import connect from "@/lib/mongodb";
export async function GET(req) {
  const {searchParams} = new URL(req.url);
  const id = searchParams.get('id');
  console.log(id, 'id')
  try {
    await connect();
    const reviews = await Review.find({ user: parseInt(id) });
    console.log(reviews, 'reviews')
    let reviewsNames = {};
    await Promise.all(
      reviews.map(async (r) => {
        const teacher = await Teacher.findOne({ m: r.m, n: r.n });
        if (teacher) {
          reviewsNames[`${r.n}-${r.m}`] = `${teacher.name} ${teacher.surname}`;
        }
      })
    );
    ///fetch schools
    const schools = await School.find({ user: id });

    ///fetch teachers
    const teachers = await Teacher.find({ user: id });

    const confSchools = schools.filter((t) => t.status === "ok");

    const pendSchools = schools.filter((t) => t.status === "pending");

    return NextResponse.json(
      { data: { confSchools, reviews, teachers, pendSchools, reviewsNames } },
      { status: 200 }
    );
  } catch (error) {
    console.log(error, "error");
    return NextResponse.json({ message: "failed to fetch" }, { status: 500 });
  }
}
