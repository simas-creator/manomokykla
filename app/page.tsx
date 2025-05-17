import Hero from "@/components/UI/Hero";
export const metadata = {
  title: "Mano Mokykla – Lietuvos mokytojų įvertinimai",
  description:
    "Mano Mokykla – platforma, kurioje mokiniai gali vertinti savo mokytojus, palikti atsiliepimus ir padėti kitiems pasirinkti tinkamiausią mokyklą. Prisidėk prie skaidresnės švietimo sistemos Lietuvoje.",
  openGraph: {
    title: "Mano Mokykla – Lietuvos mokytojų įvertinimai",
    description:
      "Mano Mokykla – platforma, kurioje mokiniai gali vertinti savo mokytojus, palikti atsiliepimus ir padėti kitiems pasirinkti tinkamiausią mokyklą. Prisidėk prie skaidresnės švietimo sistemos Lietuvoje.",
    url: "https://manomokykla.lt",
    type: "website",
    images: [
      {
        url: "/images/openGraph.png",
        width: 1200,
        height: 630,
        alt: "Mano Mokykla – Lietuvos mokytojų įvertinimai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mano Mokykla – Lietuvos mokytojų įvertinimai",
    description:
      "Mano Mokykla – platforma, kurioje mokiniai gali vertinti savo mokytojus, palikti atsiliepimus ir padėti kitiems pasirinkti tinkamiausią mokyklą. Prisidėk prie skaidresnės švietimo sistemos Lietuvoje.",
    images: ["/images/openGraph.png"],
  },
};

export default function Home() {
  return (
    <div className="bg-transparent">
      <Hero />
    </div>
  );
}
