import Link from "next/link"
const Register = () => {
    return (
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
          <h1 className="font-semibold text-3xl mt-5 font-title">Registracija</h1>
          <p className="text-gray-500 mt-2 mb-4">Nurodykite reikiamus duomenis</p>
          <form action="">
              <div className="flex gap-4">
                  <div>
                      <label htmlFor="name" className="font-title">Vardas</label>
                      <input 
                        type="text" 
                        className="input input-bordered input-primary w-full max-w-xs" />
                  </div>
                  
                  <div>
                      <label htmlFor="last" className="font-title">Pavardė</label>
                      <input 
                        type="text" 
                        className="input input-bordered input-primary w-full max-w-xs" />
                  </div>
              </div>
              <div className="mt-2 flex-col flex">
                  <label htmlFor="email" className="font-title">El. paštas</label>
                  <input 
                        type="text" 
                        className="input input-bordered input-primary w-full" />
              </div>
              <div className="mt-2 flex flex-col">
                  <label htmlFor="password" className="font-title">Slaptažodis</label>
                  <input 
                        type="text" 
                        className="input input-bordered input-primary w-full" />
              </div>
              <button className="btn btn-primary w-full mt-4 mb-2">Registruotis &rarr;</button>
              <p className="text-sm">Jau turite paskyrą? <Link className="link link-primary link-hover" href='/prisijungti'>Prisijungti</Link></p>
          </form>
      </div>
    )
  }
  
  export default Register