import "./globals.css";
import Nav from "/components/Nav";
import  Footer from "/components/Footer";
import { Montserrat } from 'next/font/google';
import { Roboto } from 'next/font/google';
import SessionWrapper from "@/components/SessionWrapper";
const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: "--font-montserrat",
});
const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  variable: "--font-roboto",
  weight: ['100', '300', '400', '500', '700', '900'],
});

export const metadata = {
  title: "manomokyk.la",
  description: "Mokytojų ir dėstytojų vertinimo platforma.",
  icons: {
    icon: "/images/la.svg",
  },
  openGraph: {
    title: "manomokyk.la",
    description: "Mokytojų ir dėstytojų vertinimo platforma.",
    url: "https://manomokyk.la",
    siteName: "EDUinf",
    images: [
      {
        url: "/images/openGraph.png", 
        width: 1200,
        height: 630,
        alt: "manomokykla",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <SessionWrapper>
      <html lang="lt">
        <head><link rel="icon" href="/images/la.svg"></link></head>
        <body suppressHydrationWarning={true}
          className={`${montserrat.className} ${roboto.className} antialiased flex flex-col min-h-screen`}
        >
          <Nav />
          <main className="flex-grow pt-[65px]">
           {children}
          </main>
          <Footer/>
        </body>
      </html>
    </SessionWrapper>
  );
}
