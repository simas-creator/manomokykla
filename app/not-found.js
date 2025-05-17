import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800 p-6 text-center">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Puslapis nerastas</h2>
      <p className="mb-6 max-w-md">
        Atsiprašome, puslapio, kurio ieškote, nėra. Jis galėjo būti pašalintas arba niekada neegzistavo.
      </p>
      <Link
        href="/"
        className="px-6 py-2 rounded-md bg-primary text-white hover:bg-primary/80 transition"
      >
        Grįžti į pradžią
      </Link>
    </div>
  );
}
