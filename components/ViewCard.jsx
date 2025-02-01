
import Link from 'next/link'
import React from 'react'

const ViewCard = () => {
  return (
    
    <Link href="/perziureti-mokytojus" prefetch>
      <div className="w-[300px] h-full">
        <div className="group lg:h-80 relative cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:rounded-lg">
          <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-primary transition-all duration-300 group-hover:scale-[10]"></span>
          <div className="relative z-10 mx-auto w-full">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-primary transition-all duration-300 group-hover:bg-sky-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                stroke="none"
                className="h-10 w-10 text-white transition-all"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </span>
            <div className="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
              <p>
                Pasirinkite norimą mokyklą ar universitetą ir peržiūrėkite visus dėstytojų bei mokytojų įvertinimus.
              </p>
            </div>
            <div className="pt-5 lg:pt-10 text-base font-semibold leading-7">
              <p className="text-primary transition-all duration-300 group-hover:text-white lg:text-lg">
                Peržiūrėti įvertinimus &rarr;
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ViewCard