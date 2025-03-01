import { useEffect, useState } from "react";

const LoginRegister = ({setLogin, login}) => {
    const [isOpen, setIsOpen] = useState(login);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY; // Save current scroll position
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`; // Offset to keep user at the same position
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      const scrollY = Math.abs(parseInt(document.body.style.top || "0"));
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY); // Restore original scroll position
    }
  
    return () => {
      const scrollY = Math.abs(parseInt(document.body.style.top || "0"));
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY); // Ensure reset on cleanup
    };
  }, [isOpen]);
  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    if(!email || !password) {
      setError("Visi laukai turi būti užpildyti");
      return;
    }
    setLoading(true);
    try {
      // Sign in with the Credentials provider
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Neteisingas el. paštas arba slaptažodis");
        setLoading(false);
      } else {
        router.push("/skydelis");
      }
    } catch (err) {
      setLoading(false);
      setError("Įvyko serverio klaida");
      console.log(err)
    }
  };
  
  return (
    <div className="z-20 fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm px-10">
    <div className="bg-white p-4 rounded-xl ring-2 ring-primary max-w-md mx-auto mt-24 relative">
    <button 
          onClick={() => setLogin(false)} 
          className="absolute top-2 right-3 text-xl font-bold text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>
    <h1 className="font-semibold text-3xl mt-5 font-title">Prisijungti</h1>
      <p className="text-slate-500 mt-2 mb-4">Nurodykite reikiamus duomenis</p>
      <form onSubmit={(e) => submit(e)}>
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
            type="password" 
            className="input input-bordered input-primary w-full" 
          />
        </div>
        <p className="text-red-500">{error}</p>
        {loading ? (<button className="btn btn-primary w-full mt-4 mb-2" disabled>
          Kraunama...
        </button>) : (
          <button className="btn btn-primary w-full mt-4 mb-2">Prisijungti &rarr;</button>
          )}
        
        
        <p className="text-sm">
          Neturite paskyros? <span>Registruotis</span> 
        </p>
      </form>
      <div className="divider">arba</div>
      <section>
        <button 
          onClick={() => signIn('google')} 
          className="w-full flex bg-slate-50 py-2 px-4 gap-1 rounded-md items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-google">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M20.945 11a9 9 0 1 1 -3.284 -5.997l-2.655 2.392a5.5 5.5 0 1 0 2.119 6.605h-4.125v-3h7.945z" />
          </svg>
          <span className="text-neutral-700 text-sm">Google</span>
        </button>
      </section>
    </div>
      
    </div>
  );
};
export default LoginRegister
