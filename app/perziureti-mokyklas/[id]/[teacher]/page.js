
import TeacherPage from "@/components/teacher/TeacherPage";
import School from "@/lib/modals/school";
import Teacher from "@/lib/modals/teacher";

export default async function Page({ params }) {
  const data = await params;
  const id = await data.id;
  const teacher = await data.teacher;
    // Fetch school
    const school = await School.findOne({ url: id }).lean();
  
    const { __v, createdAt, updatedAt, ...plainSchool } = {
      ...school,
      _id: school._id.toString()
    };
  
    // Fetch teacher
    const t = await Teacher.findOne({ school_id: school._id, url: teacher }).lean();
  
    const { __v: v2, createdAt: c2, updatedAt: u2, ...plainTeacher } = {
      ...t,
      _id: t._id.toString(),
      school_id: t.school_id.toString()
    };
  
    plainTeacher.school = plainSchool;
  return <TeacherPage teacher={plainTeacher} />;
}