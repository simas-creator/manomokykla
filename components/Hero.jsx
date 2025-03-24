import Link from "next/link"
import Stats from '@/components/Stats'
const Card = ({ type }) => {
  return (
    <Link href={type === "view" ? "/perziureti-mokyklas" : "/prideti-mokykla"}>
      <div className={`relative group  w-full sm:w-[350px] h-full z-[10]  ${type === 'view' ? 'grad-view': 'grad-rate'}`}>
        <div
          className={`relative cursor-pointer rounded-xl ${type === "view" ? "bg-gradient-to-br from-gray-50 to-blue-50" : "bg-gradient-to-br from-blue-50 to-indigo-50"} p-6 shadow-lg `}
        >
          {/* Icon container with background */}
          <div
            className={`mb-5 flex h-16 w-16 items-center group-hover:scale-110 group group-hover:translate-x-2 duration-300 justify-center rounded-full ${type === "view" ? "bg-black" : "bg-primary"} shadow-md`}
          >
            {type === "view" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                stroke="none"
                className="h-8 w-8 text-white"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-8 w-8 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                />
              </svg>
            )}
          </div>

          {/* Title and description */}
          <div className="mb-4">
            <h3 className={`mb-2 text-xl font-bold ${type === "view" ? "text-black" : "text-primary"}`}>
              {type === "view" ? "Peržiūrėti įvertinimus" : "Pridėti mokyklą"}
            </h3>
            <p className="text-sm text-gray-600">
              {type === "view"
                ? "Atraskite mokytojų įvertinimus ir atsiliepimus apie mokyklas."
                : "Prisidėkite prie bendruomenės pridėdami naują mokyklą."}
            </p>
          </div>

          {/* Button with arrow */}
          <div className="flex items-center">
            <span
              className={`flex items-center text-sm font-medium ${type === "view" ? "text-black" : "text-primary"}`}
            >
              {type === "view" ? "Peržiūrėti" : "Pridėti"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </div>

          {/* Background decoration */}
          <div className="absolute bottom-0 right-0 z-0 opacity-10">
            {type === "view" ? (
              <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor" className="text-blue-900">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ) : (
              <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
                <path d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
              </svg>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

function Hero() {
  return (
    <section className="relative py-16 md:py-24">
     

      <div className="container mx-auto px-4">
        {/* Hero header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4  md:h-14 text-3xl typed font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
            Atraskite ir įvertinkite <span className="text-primary">mokyklas</span>
          </h1>
          <p className="mx-auto max-w-2xl text-gray-600 md:text-lg">
            Padėkite kitiems mokiniams rasti geriausius mokytojus ir mokyklas Lietuvoje.
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
          <Card type="view" />
          <Card type="rate" />
        </div>

        <Stats/>
      </div>
    </section>
  )
}

export default Hero

