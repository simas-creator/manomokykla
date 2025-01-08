'use client'
import Link from "next/link"
import { useState } from "react"
import {useRouter} from "next/navigation"

const Register = () => {
    
    let [error, setError] = useState("");
    const router = useRouter();
    const submit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get("firstName");
        const last = formData.get("lastName");
        const email = formData.get("email");
        const password = formData.get("password");
    
        if (!name || !last || !email || !password) {
            setError("Visi laukai turi būti užpildyti");
            return;
        }
    
        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, last, email, password }),
            });
    
            if (!res.ok) {
                // Handle HTTP errors
                if(res.status === 500) {
                    setError("Įveskite tinkamą el. pašto adresą")
                } else {
                    setError("Vartotojas jau užregistruotas");
                }
                
                return;
            }
    
            const result = await res.json();
    
            if (!result.success) {
                // Handle logical errors returned by the API
                setError("Vartotojas jau užregistruotas.");
            } else {
                // Success case
                setError("");
                // Perform further actions, e.g., redirecting
                router.push("/prisijungti")
            }
        } catch (error) {
            // Handle fetch errors

            console.error("Error during submission:", error);
            setError("Įvyko serverio klaida");
        
        }
    };
    
    return (
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
          <h1 className="font-semibold text-3xl mt-5 font-title">Registracija</h1>
          <p className="text-gray-500 mt-2 mb-4">Nurodykite reikiamus duomenis</p>
          <form onSubmit={(e) => submit(e)}>
              <div className="flex gap-4">
                  <div>
                      <label htmlFor="name" className="font-title">Vardas</label>
                      <input
                        name="firstName"
                        type="text" 
                        className="input input-bordered input-primary w-full max-w-xs" />
                  </div>
                  
                  <div>
                      <label htmlFor="last" className="font-title">Pavardė</label>
                      <input 
                        name="lastName"
                        type="text" 
                        className="input input-bordered input-primary w-full max-w-xs" />
                  </div>
              </div>
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
              {error && <p className="text-red-500">{error}</p>}
              <button id="submit" name="submit" className="btn btn-primary w-full mt-4 mb-2">Registruotis &rarr;</button>
              <p className="text-sm">Jau turite paskyrą? <Link className="link link-primary link-hover" href='/prisijungti'>Prisijungti</Link></p>
          </form>
      </div>
    )
  }
  
  export default Register