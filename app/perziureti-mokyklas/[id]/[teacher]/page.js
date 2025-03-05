"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import TeacherPage from "@/components/TeacherPage";

export default function Page() {
  const pathname = usePathname();
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {

    const fetchTeacherData = async () => {
      try {
        const res = await fetch(`/api/url?path=${encodeURIComponent(pathname)}`);
        
        if (!res.ok) {
          console.log('ivyko klaida')
        }

        const data = await res.json();
        setTeacher(data);
      } catch (error) {
        console.log("Fetch failed:", error);
      }
    };

    fetchTeacherData();
  }, [pathname]);

  return <TeacherPage teacher={teacher} />;
}
