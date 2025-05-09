"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
function LoginForm() {
  return (
    <div className="w-full flex justify-center py-10 px-8 h-screen">
      <div className="bg-white rounded-lg shadow-lg h-fit mt-24 overflow-hidden max-w-[500px] border">
        <div className="px-6 py-8">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Prisijungimas
          </h2>
          <p className="mt-2 text-center text-gray-600">
            Prisijunkite, kad galėtumėte vertinti mokytojus bei pridėti mokyklas
          </p>

          <div className="mt-8 space-y-4">
            {/* Google Sign In Button */}
            <button onClick={() => signIn('google')} className="w-full flex items-center justify-center gap-2 h-12 px-4 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors">
              {/* Google icon */}
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="h-5 w-5"
              >
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
                <path fill="none" d="M1 1h22v22H1z" />
              </svg>
              <span className="text-gray-700">Prisijungti su Google</span>
            </button>

          </div>
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <p className="text-xs text-center text-gray-500">
          Prieš tęsdami patvirtinate, jog susipažinote su mūsų <Link className="hover:underline underline-offset-1 text-primary cursor-pointer" href="/privatumo-politika">privatumo politika</Link>
        </p>
      </div>
      </div>
    </div>
  );
}

const Page = () => {
  return (
    <Suspense fallback="">
      <Login />
    </Suspense>
  );
};
export default LoginForm;
