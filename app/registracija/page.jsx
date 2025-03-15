'use client'
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

const Register = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // Loading state
    const router = useRouter();
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    const submit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true
        setError(""); // Clear any previous errors

        const formData = new FormData(e.target);
        const username = formData.get("username");
        const email = formData.get("email");
        const password = formData.get("password");

        if (!username || !email || !password) {
            setError("Visi laukai turi būti užpildyti");
            setLoading(false); // Reset loading state
            return;
        }
        if(!validateEmail(email)) {
            setLoading(false);
            setError("Įveskite galiojantį el.paštą");
            return;
        }
        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                setError(errorData.error || "Įvyko klaida registruojantis");
                setLoading(false); // Reset loading state
                return;
            }

            const result = await res.json();

            if (!result.success) {
                setError(result.error);
            } else {
                setError("");
                router.push("/prisijungti");
            }
        } catch (error) {
            setError("Įvyko klaida registruojantis");
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="mx-4 pb-8">
<div className="max-w-md mx-auto bg-white shadow-md ring ring-primary rounded-lg p-6 mt-10">
            <h1 className="font-semibold text-3xl mt-5 font-title">Registracija</h1>
            <p className="text-gray-500 mt-2 mb-4">Nurodykite reikiamus duomenis</p>
            <form onSubmit={(e) => submit(e)}>

                    <div className="">
                        <label htmlFor="username" className="font-title">Vartotojo vardas</label>
                        <input
                            name="username"
                            type="text"
                            className="input input-bordered input-primary w-full"
                        />
                    </div>

                <div className="mt-2 flex-col flex">
                    <label htmlFor="email" className="font-title">El. paštas</label>
                    <input
                        name="email"
                        type="text"
                        className="input input-bordered input-primary w-full"
                    />
                </div>
                <div className="mt-2 flex flex-col">
                    <label htmlFor="password" className="font-title">Slaptažodis</label>
                    <input
                        name="password"
                        type="text"
                        className="input input-bordered input-primary w-full"
                    />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                {loading ? (
                    <button className="btn btn-primary w-full mt-4 mb-2" disabled>
                        Kraunama...
                    </button>
                ) : (
                    <button id="submit" name="submit" className="btn btn-primary w-full mt-4 mb-2">
                        Registruotis &rarr;
                    </button>
                )}
                <p className="text-sm">
                    Jau turite paskyrą?{" "}
                    <Link className="link link-primary link-hover" href="/prisijungti">
                        Prisijungti
                    </Link>
                </p>
            </form>
        </div>
        </div>
        

        
    );
};

export default Register;
