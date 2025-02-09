'use client'
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"
import TeacherCase from "@/components/TeacherCase";
import StarRating from "@/components/StarRating";
import SearchBar from "@/components/SearchBar";
import FilterParameter from "./FilterParameter";
import TeacherForm from "@/components/TeacherForm"
import { useRouter } from "next/navigation";
const SchoolPage = ({School}) => {
  const { data: session, status } = useSession()
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState(false);
  const [schoolRating, setSchoolRating] = useState(0);
  const [active, setActive] = useState(false);
  const [filter, setFilter] = useState(null);
  const subjects = [
    "Biologija",
    "Chemija",
    "Dailė",
    "Ekonomika",
    "Fizika",
    "Geografija",
    "Informacinės technologijos",
    "Istorija",
    "Fizinis ugdymas",
    "Lietuvių kalba ir literatūra",
    "Matematika",
    "Muzika",
    "Technologijos",
    "Anglų",
    "Prancūzų",
    "Rusų",
    "Vokiečių"
  ];
  const handleForm = () => {
    if(status !== "authenticated") {
      router.push("/prisijungti")
      return
    }
    setForm(true);
    

  }
  useEffect(() => {
    if (!School?.n) return;
  
    async function getTeachers() {
      setLoading(true); // Start loading
      
      try {
        const response = await fetch(`/api/teachers/${School.n}`);
        if (!response.ok) throw new Error("Failed to fetch teachers");
  
        const obj = await response.json();
        setTeachers(obj.data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    }
  
    getTeachers();
    console.log(teachers)
    setSchoolRating(School.rating);
  }, [School]);
  
  
  return (
    <section>
        <main className='px-10 mt-10 w-auto flex flex-col'>

            <div className="flex gap-5 bsm:items-center flex-wrap flex-col bsm:flex-row">
              <div>
                <img 
                src={School.imgUrl}
                className="h-32 w-32 bsm:h-20 bsm:w-20 bsm:opacity-100 bsm:rounded-lg object-cover bsm:border-2 border-2"
                />
              </div>
              <div className="flex flex-col z-10">
                <h1 className='font-title text-xl font-medium md:text-3xl'>{School.name}</h1>
                <div className="flex gap-2 mt-2">
                  <StarRating r={schoolRating} size="xl" />
                </div>
                
              </div>
              
            </div>
            
            <div className="mt-3 lg:max-w-screen-lg z-10">
              <button onClick={() => handleForm()} className="w-auto px-4 py-2 border rounded-lg border-primary transition-colors text-primary font-medium hover:text-black text-sm hover:bg-primary">Pridėti mokytoją</button>
            </div>
            
            <div className='border mt-6'></div>
            

        </main>
        {form === false ? (<div>
          <div className="px-6">
              <SearchBar parameter={"Ieškokite mokytojo"} />
              <div className="lg:max-w-screen-lg pl-6 pr-4 m-auto">
                <FilterParameter type={"Dalykas"} parameters={subjects} active={active} setActive={setActive} filter={filter} setFilter={setFilter}/>
              </div>
        </div>
        <div>
  {loading ? (
    <div className="p-10 w-full flex justify-center items-center">
      <p>Kraunama...</p> {/* Show loading state */}
    </div>
  ) : teachers.length > 0 ? (
    <>
      <div className="w-full mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 px-10 justify-items-center mb-6">
        {teachers.map((teacher, index) => (
          <TeacherCase key={index} teacher={teacher} />
        ))}
        
      </div>
      <div className="pt-4 pb-8 m-auto px-10">
          <p className="w-full text-wrap">
            Nematote savo mokytojo?{" "}
            <span onClick={() => handleForm()} className="hover:cursor-pointer hover:underline text-primary">
              Pridėti
            </span>
          </p>
        </div>
    </>
  ) : (
    <div className="p-10 w-full flex justify-center items-center flex-col">
      <div>Mokytojų nerasta.</div>
      
      <div className="w-full px-2 py-8">
        <p>
          Nematote savo mokytojo?{" "}
          <span onClick={() => handleForm()} className="hover:cursor-pointer hover:underline text-primary">
            Pridėti
          </span>
        </p>
      </div>
    </div>
  )}
</div>

      
    </div>) : (<div className="px-8 mb-8 py-2">
      <TeacherForm School={School}/>
      <div className="max-w-lg m-auto">
        <button className="w-auto px-4 py-2 mb-2 border-gray-300 border rounded-md text-gray-700" onClick={() => setForm(false)}>Grįžti atgal</button>
      </div>
      
      </div>)}
        
    
    

    </section>
  )
}

export default SchoolPage;