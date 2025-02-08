import TeacherPage from '@/components/TeacherPage'
import Teacher from '@/lib/modals/teacher';
import { headers } from "next/headers";
const getTeacher = async (n, m) => {
  const teacher = await Teacher.findOne({n, m});
  return teacher;
}
export default async function Page({params}) {
  const headerList = await headers();
  const pathname = headerList.get("x-current-path");
  const parts = pathname.split('/');
  const n = parts[2].match(/[0-9]+/g).join("");
  const m = parts[3].match(/[0-9]+/g).join("");
  const teacher = await getTeacher(n, m);
  console.log(teacher)
    return (<TeacherPage teacher={teacher}/>)
}