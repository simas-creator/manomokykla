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
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState(false);
  const [schoolRating, setSchoolRating] = useState(0);
  const [active, setActive] = useState(false);
  const [filter, setFilter] = useState(null);
  const subjects = [
    "Biologija",
    "Chemija",
    "Dailė",
    "Fizika",
    "Geografija",
    "Informacinės technologijos",
    "Istorija",
    "Fizinis ugdymas",
    "Lietuvių kalba ir literatūra",
    "Matematika",
    "Muzika",
    "Technologijos",
    "Užsienio kalba (anglų)",
    "Užsienio kalba (prancūzų)",
    "Užsienio kalba (rusų)",
    "Užsienio kalba (vokiečių)"
  ];
  const handleForm = () => {
    if(status !== "authenticated") {
      router.push("/prisijungti")
      return
    }
    setForm(true);
    

  }
  useEffect(() => {
    async function getTeachers() {
      const response = await fetch(`/api/teachers/${School.n}`);
      const obj = await response.json();
      const tchrs = obj.data;
      setTeachers(tchrs);
    }
    getTeachers();
    setSchoolRating(School.rating);
  }, [School?.n])  
  
  return (
    <section>
        <main className='px-10 mt-10 w-auto flex flex-col'>

            <div className="flex gap-5 items-center flex-wrap">
              <div>
                <img 
                src={School.imgUrl}
                className="h-20 w-20 rounded-lg object-cover border-2 "
                />
              </div>
              <div className="flex flex-col">
                <h1 className='font-title text-xl md:text-3xl'>{School.name}</h1>
                <div className="flex gap-2 mt-2">
                  <StarRating r={schoolRating} size="xl" />
                </div>
                
              </div>
              
            </div>
            
            <div className="mt-3 lg:max-w-screen-lg">
              <button onClick={() => handleForm()} className="w-auto px-4 py-2 border-2 rounded-lg border-gray-300 transition-colors hover:bg-gray-100">Pridėti mokytoją</button>
            </div>
            <div className='divider'></div>
            

        </main>
        {form === false ? (<div>
          <div className="px-6">
              <SearchBar parameter={"Ieškokite mokytojo"} />
              <div className="lg:max-w-screen-lg pl-6 pr-4 m-auto">
                <FilterParameter type={"Dalykas"} parameters={subjects} active={active} setActive={setActive} filter={filter} setFilter={setFilter}/>
              </div>
        </div>
    <div>
      {teachers && teachers.length > 0 ? (
        teachers.map((teacher, index) => (
          
          <TeacherCase
            key={index}
            teacher={teacher}
          />

        ))
      ) : (
        <div className="p-10 w-full flex justify-center">Mokytojų nerasta.</div>
      )}
    </div> 
      
    </div>) : (<div>
      <TeacherForm School={School}/>
      <div className="max-w-lg m-auto">
        <button className="w-auto px-4 py-2 border-gray-300 border-2 rounded-md" onClick={() => setForm(false)}>Grįžti atgal</button>
      </div>
      
      </div>)}
        
    
    

    </section>
  )
}

export default SchoolPage;