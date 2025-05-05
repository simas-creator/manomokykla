import SchoolPage from "@/components/school/SchoolPage";

async function getSchoolData(n) {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/schools/${n}`, {
    next: { tags: [`school-${n}`,
      {revalidate: 60,}
    ]}
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export default async function Page({ params }) {
  const id = (await params).id;

  const match = id.match(/-(\d+)$/);
  
  const n = match[1];
  const school = await getSchoolData(n);

  if (!school) {
    return <div>Mokykla nerasta</div>;
  }
  return <SchoolPage School={school} />;
}
