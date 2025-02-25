import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
const Report = ({object}) => {
    const {data: session, status} = useSession()
    const router = useRouter();
    const [form, setForm] = useState(false)
    const toggleReport = () => {
        if(status === 'loading') {
            return;
        }
        if(!session) {
            router.push('/prisijungti')
            return
        }
        setForm(true)
    }
  return (
    <div>
    {form && <div className="z-20 bg-white absolute h-full p-6 w-full rounded-md">
        <h2 className="text-xl font-semibold font-title text-center mt-2">Pranešti apie netinkamą turinį</h2>
        <p className="mt-4 text-gray-500 font-body">Nurodykite mokyklą, mokytoją ar įvertinimą.</p>
        <textarea className="w-full h-32 p-3 mt-4 resize-none border border-gray-200 rounded-md focus:outline-none focus:border-2 focus:border-gray-400 font-body" placeholder="..." maxLength={250}></textarea>
        <div className="flex justify-end mt-4">
            <button onClick={() => setForm(false)} className="px-6 py-2 border-2 text-gray-500 rounded-md hover:bg-gray-100">Grįžti atgal</button>
            <button className="px-6 py-2 ml-4 text-white bg-red-500 rounded-md hover:opacity-80">Siųsti</button>
        </div>
    </div>}
    {!form && <div 
        title="Pranešti"
        onClick={() => toggleReport()}
        className="transition-all hover:scale-110 hover:border-none hover:bg-primary hover:cursor-pointer shadow-xl flex items-center justify-center z-10 absolute end-3 top-3 h-12 w-12 bg-white border rounded-full"
    >
        <img src="/images/flag-country-svgrepo-com.svg" className="w-8 h-8" alt="" />
    </div>
    }
    </div>
    
   
  )
}

export default Report