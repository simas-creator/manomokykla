import TeacherPage from '@/components/TeacherPage'
import Teacher from '@/lib/modals/teacher';
import { headers } from "next/headers";
const getTeacher = async (n, m) => {
  const teacher = await Teacher.findOne({n, m});
  return teacher;
}
export default async function Page() {
  const headerList = await headers();
  const pathname = headerList.get("x-current-path");
  const parts = pathname.split('/');
  const n = parseInt(parts[2].match(/[0-9]+/g).join(""));
  const m = parseInt(parts[3].match(/[0-9]+/g).join(""));
  console.log(n, m)
  const teacher = await getTeacher(n, m);
    return (<TeacherPage teacher={teacher}/>)
}