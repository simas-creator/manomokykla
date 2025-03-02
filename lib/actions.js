"use server";

import Teacher from "@/lib/modals/teacher";
import User from "@/lib/modals/user";
import  connect  from "@/lib/mongodb";

export async function getTeacher(n, m) {
  await connect(); // Ensure MongoDB is connected

  if (!n || !m) {
    console.error("Invalid parameters:", { n, m });
    return { error: "Invalid parameters provided" };
  }

  try {
    let teacher = await Teacher.findOne({ n, m }).lean(); // Convert Mongoose doc to plain object

    if (!teacher) {
      console.error("Teacher not found:", { n, m });
      return { error: "Teacher not found" };
    }

    // Convert to a plain JSON object
    teacher = JSON.parse(JSON.stringify(teacher));
    return teacher;
  } catch (error) {
    console.error("Error fetching teacher:", error);
    return { error: "Failed to fetch teacher" };
  }
}