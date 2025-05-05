
import TeacherPage from "@/components/teacher/TeacherPage";

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
  const n = id.match(/(\d+)$/)[0];
  const m = teacher.match(/(\d+)$/)[0];
  console.log('our n: ', n, 'our m: ', m)
  if (!n || !m) {
    return <div className="w-full text-center mt-20">Tokio mokytojo nėra</div>;
  }

  const t = await getTeacherData(n, m);
  return <TeacherPage teacher={t} />;
}