import { useState } from "react";
import CustomSelect from "@/components/UI/CustomSelect";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const TeacherForm = ({School}) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [subj, setSubj] = useState(null);
    const router = useRouter()
    const [jsonData, setJsonData] = useState({n: School.n});
    const subjects = [
      "Biologija",
      "Chemija",
      "Dailė",
      "Ekonomika",
      "Fizika",
      "Geografija",
      "Informacinės technologijos",
      "Istorija",
      "Fizinis ugdymas (kūno kultūra)",
      "Lietuvių kalba ir literatūra",
      "Matematika",
      "Muzika",
      "Technologijos",
      "Anglų",
      "Prancūzų",
      "Rusų",
      "Vokiečių"
    ];
      const {data: session, status} = useSession();

      const handleData = (e) => {
        setJsonData({
          ...jsonData,
          [e.target.name]: e.target.value
        })
        console.log(jsonData)
    }
      const handleSubmit = async (e) => {
        
        e.preventDefault();
        setLoading(true);
        const { first, surname } = jsonData;
        const requestBody = {
          ...jsonData,
          subj: subj,
          user: session?.user?.email,
          school_id: School._id
      };
        if(!first || !surname || !subj) {
          setError('Užpildykite privalomus laukelius');
          setLoading(false);
          return;
        } else {
          setError(null)
        }
    
        try {
          const response = await fetch('/api/teachers', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "Authorization": "Bearer " + session.user.accessToken
            },
            body: JSON.stringify(requestBody)
          })
    
          if(!response.ok) {
            console.log("Įvyko klaida", response.statusText);
            return
          }
    
        } catch (error) {
          console.log(error, 'error');
        } finally {
          setLoading(false);
          router.refresh();
          window.location.reload()
        }
      }
  return (
    <form className="max-w-lg mx-auto p-4 border-2 rounded-lg space-y-4 my-5 font-title">
        <div className="flex gap-4 sm:gap-10 flex-col sm:flex-row">
            <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Vardas*
            </label>
            <input
                type="text"
                id="name"
                name="first"
                onChange={handleData}
                className="input input-bordered input-primary w-full"
            />
            </div>
            <div className="space-y-2">
            <label htmlFor="surname" className="block text-sm font-medium text-gray-700">
                Pavardė*
            </label>
            <input
                type="text"
                id="surname"
                name="surname"
                onChange={handleData}
                className="input input-bordered input-primary w-full"                        
            />
            </div>
        </div>
        {School.type === 'Gimnazija' ? 
        (<div className="space-y-2 pt-4">
            <CustomSelect action={setSubj}  name={"Dalykas"} parameters={subjects} subj={subj}/>
        </div>) : 
        (<div className="space-y-2">
            
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
            Dalykas*
            </label>
            <input
            type="text"
            id="subject"
            name="subject"
            onChange={(e) => setSubj(e.target.value)}
            className="input input-bordered input-primary w-full"                
            />
        </div>)}
        
            
        <div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        {loading ? (<button type="submit" disabled className="btn bg-white text-primary btn-primary hover:text-black hover:bg-primary">
        Kraunama...
        </button>
        ) : (<button onClick={handleSubmit} className="btn bg-white text-primary btn-primary hover:text-black hover:bg-primary">
        Pridėti
        </button>)}
        
    </form>
  )
}

export default TeacherForm