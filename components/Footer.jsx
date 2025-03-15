import Link from "next/link"

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-6 font-title">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pages Column */}
          <div>
            <h6 className="text-lg font-medium mb-4">Puslapiai</h6>
            <ul className="space-y-2 font-thin">
              <li>
                <Link href="/perziureti-mokyklas" className="hover:underline hover:text-gray-300 transition-colors">
                  Įvertinimai
                </Link>
              </li>
              <li>
                <Link href="/prideti-mokykla" className="hover:underline hover:text-gray-300 transition-colors">
                  Pridėti mokyklą
                </Link>
              </li>
              <li>
                <Link href="/taisykles" className="hover:underline hover:text-gray-300 transition-colors">
                  Taisyklės
                </Link>
              </li>
              <li>
                <Link href="/skydelis" className="hover:underline hover:text-gray-300 transition-colors">
                  Paskyra
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h6 className="text-lg font-medium mb-4">Susisiekti</h6>
            <div className="flex items-center space-x-2 mb-2">
              {/* Email icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-mail"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <a href="mailto:info@manomokyk.la" className="hover:underline hover:text-gray-300 transition-colors">
                info@manomokyk.la
              </a>
            </div>
            <div className="mt-4">
              <h6 className="text-sm font-medium mb-2">Soc. tinklai</h6>
              <div className="flex space-x-4">
                {/* Facebook icon */}
                <a href="#" className="hover:text-gray-300 transition-colors" aria-label="Facebook">
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
                    className="feather feather-facebook"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                {/* Instagram icon */}
                <a href="#" className="hover:text-gray-300 transition-colors" aria-label="Instagram">
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
                    className="feather feather-instagram"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                {/* Twitter icon */}
                <a href="#" className="hover:text-gray-300 transition-colors" aria-label="Twitter">
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
                    className="feather feather-twitter"
                  >
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* About Column */}
          <div>
            <h6 className="text-lg font-medium mb-4">Apie mus</h6>
            <p className="text-sm text-gray-300 mb-4">
              Ši platforma skirta mokiniams dalintis savo patirtimi ir padėti kitiems rasti tinkamą
              mokyklą bei universitetą.
            </p>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">manomokykla © {new Date().getFullYear()} Visos teisės saugomos.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

