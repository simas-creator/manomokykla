export async function getSchoolData(n) {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/schools/${n}`, {
    next: { tags: [`school-${n}`, { revalidate: 3600 }] },
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}
export async function getTeacherData(teacher) {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/teachers/${teacher}`, {
    next: { tags: [`teacher-${teacher}`, { revalidate: 3600 }] },
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}