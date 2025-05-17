"use client";

import Link from "next/link";

export default function Error() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800 p-6 text-center">
      <h1 className="text-5xl font-bold text-primary mb-4">Įvyko klaida</h1>
      <p className="text-lg mb-6">
        Atsiprašome, įvyko serverio klaida. Bandykite dar kartą arba
        grįžkite į pagrindinį puslapį.
      </p>

      <Link
        href="/"
        className="px-5 py-2 border border-primary text-primary rounded-md hover:bg-primary/10 transition"
      >
        Grįžti į pradžią
      </Link>
    </div>
  );
}
