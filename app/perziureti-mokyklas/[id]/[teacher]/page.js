
import TeacherPage from "@/components/teacher/TeacherPage";
import School from "@/lib/modals/school";
import Teacher from "@/lib/modals/teacher";

async function getTeacherData(n, m) {
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/url?n=${n}&m=${m}`,
      { next : {revalidate: 60}}
    );
    
    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch failed:", error);
    return null;
  }
}
export default async function Page({ params }) {
  const data = await params;
  const id = await data.id;
  const teacher = await data.teacher;
  const school = await School.findOne({url: id})
  const t = await Teacher.findOne({school_id: school._id, url: teacher}).lean()
  const {_id, _v, createdAt, updatedAt, ...plainObject} = t;
  return <TeacherPage teacher={plainObject} />;
}