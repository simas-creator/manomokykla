
import TeacherPage from "@/components/teacher/TeacherPage";
import connect from "@/lib/mongodb";
import { notFound } from "next/navigation";
import {getTeacherData, getSchoolData} from "@/lib/getDataForPage"
export async function generateMetadata({ params }) {
  await connect()
  const data = await params;
  const id = await data.id;
  const teacher = await data.teacher;
  const t = await getTeacherData(teacher)
  const school = await getSchoolData(n);
  const { name: schoolName, imgUrl, type, url } = school;
  const { name: teacherName } = t
  return {
    title: `${schoolName} - ${teacherName}`,
    description: `Peržiūrėkite ${
      type === "Gimnazija"
        ? "šios mokyklos mokinių"
        : "šio universiteto studentų"
    }  įvertinimus ir komentarus.`,
    openGraph: {
      title: `${schoolName} - ${teacherName}`,
      description: `Peržiūrėkite ${
        type === "Gimnazija"
          ? "šios mokyklos mokinių"
          : "šio universiteto studentų"
      }  įvertinimus ir komentarus.`,
      url: `https://manomokykla.lt/${url}`,
      type: "article",
      images: [
        {
          url: imgUrl,
          width: 1200,
          height: 630,
          alt: `${schoolName} – Mano Mokykla`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${schoolName} - ${teacherName}`,
      description: `Peržiūrėkite ${
        type === "Gimnazija"
          ? "šios mokyklos mokinių"
          : "šio universiteto studentų"
      }  įvertinimus ir komentarus.`,
      images: [imgUrl],
    },
  };
}

export default async function Page({ params }) {
  await connect()
  const data = await params;
  const id = await data.id;
  const teacher = await data.teacher;
    // Fetch school
    const school = await getSchoolData(n);
    if(!school) {
      notFound()
    }
    // Fetch teacher
    const t = await getTeacherData(teacher)
    if(!t) {
      notFound()
    }
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