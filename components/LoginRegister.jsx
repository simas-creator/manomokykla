import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const LoginRegister = ({ setLogin, login }) => {
  const [isOpen, setIsOpen] = useState(login);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      const scrollY = Math.abs(parseInt(document.body.style.top || "0"));
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
    }

    return () => {
      const scrollY = Math.abs(parseInt(document.body.style.top || "0"));
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Visi laukai turi būti užpildyti");
      return;
    }
    setLoading(true);
    try {
      const result = await signIn("credentials", { email, password, redirect: false });
      if (result?.error) {
        setError("Neteisingas el. paštas arba slaptažodis");
      } else {
        window.location.reload();
      }
    } catch {
      setError("Įvyko serverio klaida");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    if (!username || !email || !password) {
      setError("Visi laukai turi būti užpildyti");
      setLoading(false);
      return;
    }
    if (!validateEmail(email)) {
      setError("Įveskite galiojantį el.paštą");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        setError("Nepavyko užsiregistruoti");
      } else {
        setRegister(false);
        setEmail(email);
        setPassword("");
      }
    } catch {
      setError("Įvyko klaida registruojantis");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="z-20 fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm px-10">
      <div className="bg-white mt-24 rounded-md p-4 ring-2 ring-primary max-w-md mx-auto relative pb-8">
        <button onClick={() => setLogin(false)} className="absolute top-2 right-3 text-xl font-bold text-gray-500 hover:text-gray-800">
          ✖
        </button>
        <h1 className="font-semibold text-3xl mt-5 font-title">{register ? "Registracija" : "Prisijungti"}</h1>
        <p className="text-gray-500 mt-2 mb-4">Nurodykite reikiamus duomenis</p>
        <form onSubmit={register ? handleRegister : handleLogin}>
          {register && (
            <div>
              <label className="font-title">Vartotojo vardas</label>
              <input name="username" type="text" className="input input-bordered input-primary w-full" />
            </div>
          )}
          <div className="mt-2">
            <label className="font-title">El. paštas</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} name="email" type="text" className="input input-bordered input-primary w-full" />
          </div>
          <div className="mt-2">
            <label className="font-title">Slaptažodis</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} name="password" type="password" className="input input-bordered input-primary w-full" />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button className="btn btn-primary w-full mt-4 mb-2" disabled={loading}>{loading ? "Kraunama..." : register ? "Registruotis →" : "Prisijungti →"}</button>
          <p className="text-sm mt-2">
            {register ? "Jau turite paskyrą? " : "Neturite paskyros? "}
            <span className="hover:underline text-primary cursor-pointer" onClick={() => setRegister(!register)}>{register ? "Prisijungti" : "Registruotis"}</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginRegister;
