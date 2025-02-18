"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import TeacherPage from "@/components/TeacherPage";

export default function Page() {
  const pathname = usePathname();
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    console.log('url', pathname)

    const cachedTeacher = sessionStorage.getItem(`teacher-${pathname}`);
    if (cachedTeacher) {
      setTeacher(JSON.parse(cachedTeacher));
      return;
    }

    const fetchTeacherData = async () => {
      try {
        const res = await fetch(`/api/url?path=${encodeURIComponent(pathname)}`);
        
        if (!res.ok) {
          console.log('ivyko klaida')
        }

        const data = await res.json();
        setTeacher(data);
        console.log('teacher',teacher)
        sessionStorage.setItem(`teacher-${pathname}`, JSON.stringify(data));
      } catch (error) {
        console.error("Fetch failed:", error);
      }
    };

    fetchTeacherData();
  }, [pathname]);

  return <TeacherPage teacher={teacher} />;
}
