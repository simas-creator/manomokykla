
import TeacherPage from "@/components/teacher/TeacherPage";
import School from "@/lib/modals/school";
import Teacher from "@/lib/modals/teacher";

export default async function Page({ params }) {
  const data = await params;
  const id = await data.id;
  const teacher = await data.teacher;
    // Fetch school
    const school = await School.findOne({ url: id }).lean();  
    // Fetch teacher
    const t = await Teacher.findOne({ school_id: school._id, url: teacher }).lean();
  
    const plainSchool = {
      ...school,
      _id: school._id.toString(),
    };
    delete plainSchool.__v;
    delete plainSchool.createdAt;
    delete plainSchool.updatedAt;
    
    const plainTeacher = {
      ...t,
      _id: t._id.toString(),
      school_id: t.school_id.toString(),
      school: plainSchool,
    };
    delete plainTeacher.__v;
    delete plainTeacher.createdAt;
    delete plainTeacher.updatedAt;
    
  
    plainTeacher.school = plainSchool;
  return <TeacherPage teacher={plainTeacher} />;
}