"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import TeacherPage from '@/components/TeacherPage';

export default function Page() {
  const pathname = usePathname();
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    if (!pathname) return;

    const fetchTeacher = async () => {
      const pathname = window.location.pathname; // Get the actual page URL
      try {
        const res = await fetch(`/api/url?path=${encodeURIComponent(pathname)}`);
    
        if (!res.ok) {
          throw new Error("Failed to fetch teacher");
        }
    
        const data = await res.json();
        setTeacher(data);
      } catch (error) {
        console.error("Fetch failed:", error);
        return null;
      }
    };    

    fetchTeacher();
  }, [pathname]);

  return <TeacherPage teacher={teacher} />;
}
