import SchoolPage from "@/components/school/SchoolPage";
import { notFound } from "next/navigation";
async function getSchoolData(n) {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/schools/${n}`, {
    next: { tags: [`school-${n}`, { revalidate: 3600 }] },
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}
export async function generateMetadata({ params }) {
  const n = (await params).id;

  const school = await getSchoolData(n);
  const { name, imgUrl, type, url } = school;
  return {
    title: `${name} | Mano Mokykla`,
    description: `Peržiūrėkite ${
      type === "Gimnazija"
        ? "šios mokyklos mokinių"
        : "šio universiteto studentų"
    }  įvertinimus ir komentarus.`,
    openGraph: {
      title: `${name} | Mano Mokykla`,
      description: `Peržiūrėkite ${
        type === "Gimnazija"
          ? "šios mokyklos mokinių"
          : "šio universiteto studentų"
      }  įvertinimus ir komentarus.`,
      url: `https://manomokykla.lt/${url}`,
      type: "article",
      images: [
        {
          url: imgUrl,
          width: 1200,
          height: 630,
          alt: `${name} – Mano Mokykla`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} | Mano Mokykla`,
      description: `Peržiūrėkite ${
        type === "Gimnazija"
          ? "šios mokyklos mokinių"
          : "šio universiteto studentų"
      }  įvertinimus ir komentarus.`,
      images: [imgUrl],
    },
  };
}
export default async function Page({ params }) {
  const n = (await params).id;

  const school = await getSchoolData(n);

  if (!school) {
    notFound();
  }
  return <SchoolPage School={school} />;
}
