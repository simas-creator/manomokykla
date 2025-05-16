export const metadata = {
  title: "Privatumo politika | Mano Mokykla",
  description:
    "Kaip ManoMokykla renka, naudoja ir saugo jūsų asmeninius duomenis. Skaitykite mūsų privatumo politiką, kad sužinotumėte apie slapukus, duomenų saugumą ir savo teises kaip vartotojo.",
  openGraph: {
    title: "Privatumo politika | Mano Mokykla",
    description:
      "Kaip ManoMokykla renka, naudoja ir saugo jūsų asmeninius duomenis. Skaitykite mūsų privatumo politiką, kad sužinotumėte apie slapukus, duomenų saugumą ir savo teises kaip vartotojo.",
    url: "https://manomokykla.lt/privatumo-politika",
    type: "article",
    images: [
      {
        url: "/images/openGraph.png", 
        width: 1200,
        height: 630,
        alt: "Privatumo politika – Mano Mokykla",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privatumo politika | Mano Mokykla",
    description:
      "Perskaitykite ManoMokykla privatumo politiką ir sužinokite, kaip mes tvarkome jūsų duomenis, naudojame slapukus ir užtikriname informacijos saugumą.",
    images: ["/images/openGraph.png"],
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container max-w-4xl py-10 px-4 md:py-16 m-auto">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold font-title md:text-4xl">
            Privatumo politika
          </h1>
        </div>

        <div className="rounded-lg border border-primary/20 overflow-hidden">
          <div className="bg-primary/5 p-6 pb-4">
            <div className="flex items-center gap-2 font-semibold text-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
              Apie šią politiką
            </div>
            <p className="text-gray-500 text-sm mt-1">
              manomokyk.la gerbia Jūsų privatumą. Šioje privatumo politikoje
              paaiškinama, kokią informaciją renkame, kaip ją naudojame ir kaip
              ją saugome.
            </p>
          </div>
        </div>

        <div className="h-px w-full bg-gray-200 my-8" />

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold font-title tracking-tight">
            1. Kokius duomenis renkame
          </h2>

          <div className="rounded-lg border p-6">
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Mes galime rinkti šią informaciją:
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary shrink-0 mt-0.5"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <div>
                    <span className="font-medium">Paskyros duomenis:</span>{" "}
                    vardą, profilio nuotrauką ir el. paštą, kuriuos suteikia
                    Google prisijungimo metu.
                  </div>
                </li>
                <li className="flex gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary shrink-0 mt-0.5"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <div>
                    <span className="font-medium">
                      Atsiliepimus ir įvertinimus:
                    </span>{" "}
                    informaciją, kurią pateikiate vertindami mokytojus.
                  </div>
                </li>

                <li className="flex gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary shrink-0 mt-0.5"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <div>
                    <span className="font-medium">Slapukus:</span> mažus duomenų
                    failus, padedančius pagerinti naudotojo patirtį.
                  </div>
                </li>
              </ul>
              <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mt-4">
                <p className="text-sm text-amber-800">
                  <span className="font-medium">Pastaba:</span> Mes nesaugome
                  slaptažodžių, nes autentifikaciją vykdo Google
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6 pt-4">
          <h2 className="text-2xl font-semibold font-title tracking-tight">
            2. Kaip naudojame Jūsų informaciją
          </h2>

          <div className="w-full border rounded-lg">
            <div className="p-6">
              <p className="text-sm text-gray-500 mb-4">
                Jūsų informaciją naudojame siekdami:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Teikti ir tobulinti savo paslaugas.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span>
                  <span>
                    Rodyti naudotojų pateiktus vertinimus ir atsiliepimus.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Užtikrinti svetainės veikimą ir patikimumą.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span>
                  <span>
                    Siųsti svarbią informaciją ar pranešimus (jeigu taikoma).
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-6 pt-4">
          <h2 className="text-2xl font-semibold font-title tracking-tight">
            3. Duomenų saugojimas
          </h2>

          <div className="rounded-lg border p-6">
            <p className="text-sm text-gray-500">
              Jūsų duomenis saugome tiek, kiek būtina paslaugų teikimui arba kol
              pateikiate prašymą juos ištrinti. Norėdami pašalinti savo paskyrą
              ar susijusią informaciją, kreipkitės el. paštu.
            </p>
          </div>
        </section>

        <section className="space-y-6 pt-4">
          <h2 className="text-2xl font-semibold font-title tracking-tight">
            4. Jūsų teisės
          </h2>

          <div className="w-full border rounded-lg divide-y">
            <div>
              <button className="flex justify-between w-full p-4 text-left font-medium">
                Peržiūrėti ir ištaisyti savo duomenis
              </button>
              <div className="p-4 pt-0">
                <p className="text-sm text-gray-500">
                  Jūs turite teisę peržiūrėti ir ištaisyti savo asmeninius
                  duomenis. Tai galite padaryti savo paskyros nustatymuose arba
                  susisiekę su mumis el. paštu.
                </p>
              </div>
            </div>

            <div>
              <button className="flex justify-between w-full p-4 text-left font-medium">
                Pašalinti savo paskyrą ir visus susijusius duomenis
              </button>
              <div className="p-4 pt-0">
                <p className="text-sm text-gray-500">
                  Jūs galite bet kada pateikti prašymą ištrinti savo paskyrą ir
                  visus su ja susijusius duomenis. Susisiekite su mumis el.
                  paštu: [Įrašyk el. pašto adresą]
                </p>
              </div>
            </div>

            <div>
              <button className="flex justify-between w-full p-4 text-left font-medium">
                Atsisakyti informacinių pranešimų
              </button>

              <div className="p-4 pt-0">
                <p className="text-sm text-gray-500">
                  Jei nenorite gauti mūsų pranešimų, galite bet kada atsisakyti
                  prenumeratos spustelėdami atsisakymo nuorodą el. laiške arba
                  pakeisdami pranešimų nustatymus savo paskyroje.
                </p>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            Norėdami pasinaudoti šiomis teisėmis, parašykite mums el. paštu:
            [Įrašyk el. pašto adresą]
          </p>
        </section>

        <section className="space-y-6 pt-4">
          <h2 className="text-2xl font-semibold font-title tracking-tight">
            5. Politikos pakeitimai
          </h2>

          <div className="rounded-lg border p-6">
            <p className="text-sm text-gray-500">
              Mes galime atnaujinti šią privatumo politiką. Atnaujinimai bus
              skelbiami šiame puslapyje su nauja įsigaliojimo data.
            </p>
          </div>
        </section>

        <section className="space-y-6 pt-4">
          <h2 className="text-2xl font-semibold font-title tracking-tight">
            6. Kontaktai
          </h2>

          <div className="rounded-lg border p-6">
            <p className="text-sm text-gray-500">
              Jei turite klausimų ar prašymų dėl savo duomenų, susisiekite:
            </p>
            <div className="mt-3">
              <p className="font-medium">manomokyk.la</p>
              <p className="text-sm text-gray-500">
                El. paštas: info@manomokyk.la
              </p>
            </div>
          </div>
        </section>

        <p className="text-center text-sm text-gray-500 pt-4">
          Paskutinį kartą atnaujinta: 2025m. gegužės 9d.
        </p>
      </div>
    </div>
  );
}
