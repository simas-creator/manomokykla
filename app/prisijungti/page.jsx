import LoginForm from "@/components/LoginForm"

export const metadata = {
  title: "Prisijungti | Mano Mokykla",
  description:
    "Prisijunkite prie ManoMokykla platformos, kad galėtumėte vertinti mokytojus, pridėti mokyklas ir naudotis visomis funkcijomis. Saugus prisijungimas naudojant Google paskyrą.",
  openGraph: {
    title: "Prisijungti | Mano Mokykla",
    description:
      "Prisijunkite prie ManoMokykla platformos, kad galėtumėte vertinti mokytojus, pridėti mokyklas ir naudotis visomis funkcijomis. Saugus prisijungimas naudojant Google paskyrą.",
    url: "https://manomokykla.lt/prisijungti",
    type: "website",
    images: [
      {
        url: "/images/openGraph.png",
        width: 1200,
        height: 630,
        alt: "Prisijungti – Mano Mokykla",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prisijungti | Mano Mokykla",
    description:
      "Prisijunkite prie ManoMokykla ir pradėkite vertinti mokytojus bei prisidėkite prie geresnio švietimo Lietuvoje.",
    images: ["/images/openGraph.png"],
  },
};

export default function Page() {
  return (
    <LoginForm/>
  )
}
