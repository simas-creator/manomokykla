import TinderCard from "@/components/teacher/TinderCard";
import School from "@/lib/modals/school";
import Teacher from "@/lib/modals/teacher";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const parameters = await params;
  const url = await parameters.id;
  const school = await School.findOne({ url }).lean();
  if (!school) {
    notFound();
  }
  const teachers = await Teacher.find({ school_id: school._id }).lean();
  const cleanT = teachers.map((t) => {
    const { _id, createdAt, updatedAt, __v, school_id, ...clean } = t;
    return clean;
  });
  return (
    <main className="absolute z-[200] h-screen inset-0 bg-black">
      <TinderCard teachers={cleanT} />
    </main>
  );
}
