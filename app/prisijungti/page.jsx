'use client'
import Link from "next/link";
import { useState } from "react";
import {useRouter} from "next/navigation";
import { signIn } from "next-auth/react";
const Login = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    
    if (!email || !password) {
      setError("Visi laukai turi būti užpildyti");
      return;
  }

  try {
      const res = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
          // Handle HTTP errors
          if(res.status === 500) {
              setError("Įveskite tinkamą el. pašto adresą")
          } else {
              setError("Įvyko klaida");
          }
          
          return;
      }


      const result = await res.json();

      if (!result.success) {
          // Handle logical errors returned by the API
          setError("Vartotojas jau užregistruotas.");
      } else {
          await signIn("Credentials", {
            redirect: true,
            callbackUrl: "/skydelis", // Adjust the redirect URL as needed
            email,
            password,
        });
      }
  } catch (error) {
      setError("Įvyko serverio klaida");
    }
  }
  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
         <h1 className="font-semibold text-3xl mt-5 font-title">Prisijungti</h1>
         <p className="text-slate-500 mt-2 mb-4">Nurodykite reikiamus duomenis</p>
         <form onSubmit={submit}>
              
              <div className="mt-2 flex-col flex">
                  <label htmlFor="email" className="font-title">El. paštas</label>
                  <input 
                        name="email"
                        type="text" 
                        className="input input-bordered input-primary w-full" />
              </div>
              <div className="mt-2 flex flex-col">
                  <label htmlFor="password" className="font-title">Slaptažodis</label>
                  <input 
                        name="password"
                        type="text" 
                        className="input input-bordered input-primary w-full" />
              </div>
              <p className="text-red-500">{error}</p>
              <button className="btn btn-primary w-full mt-4 mb-2">Prisijungti &rarr;</button>
              <p className="text-sm">Neturite paskyros? <Link className="link link-primary link-hover" href='/registracija'>Registruotis</Link></p>
          </form>
          <div className="divider">arba</div>
            <section>
              <button onClick={() => signIn('google')} className="w-full flex bg-slate-50 py-2 px-4 gap-1 rounded-md items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-google">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M20.945 11a9 9 0 1 1 -3.284 -5.997l-2.655 2.392a5.5 5.5 0 1 0 2.119 6.605h-4.125v-3h7.945z" />
                  </svg>
                  <span className="text-neutral-700 text-sm">Google</span>
              </button>
            </section>
    </div>
  )
}

export default Login