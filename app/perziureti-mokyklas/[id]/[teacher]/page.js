"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import TeacherPage from "@/components/TeacherPage";

export default function Page() {
  const pathname = usePathname();
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    if (!pathname) return;

    // Check sessionStorage first
    const cachedTeacher = sessionStorage.getItem(`teacher-${pathname}`);
    if (cachedTeacher) {
      setTeacher(JSON.parse(cachedTeacher));
      return;
    }

    const fetchTeacherData = async () => {
      try {
        const res = await fetch(`/api/url?path=${encodeURIComponent(pathname)}`);

        if (!res.ok) {
          throw new Error("Failed to fetch teacher");
        }

        const data = await res.json();
        setTeacher(data);
        sessionStorage.setItem(`teacher-${pathname}`, JSON.stringify(data));
      } catch (error) {
        console.error("Fetch failed:", error);
      }
    };

    fetchTeacherData();
  }, [pathname]);

  return <TeacherPage teacher={teacher} />;
}
