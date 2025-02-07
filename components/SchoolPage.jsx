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
                className="w-full absolute left-0 opacity-30 object-cover h-52 bsm:static bsm:h-20 bsm:w-20 bsm:opacity-100 bsm:rounded-lg objects-cover bsm:border-2 border-2"
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
            
            <div className='sm:border mt-6'></div>
            

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
       && 
       <div className="w-full px-2 py-4">
          <p>
          Nematote savo mokytojo? <span onClick={() => handleForm()} className="hover:cursor-pointer hover:underline text-primary">Pridėti</span>
          </p>
        </div>) : (
       
        <div className="p-10 w-full flex justify-center items-center flex-col">
          <div>
          Mokytojų nerasta.
          </div>
          <div className="w-full px-2 py-4">
            <p>
            Nematote savo mokytojo? <span onClick={() => handleForm()} className="hover:cursor-pointer hover:underline text-primary">Pridėti</span>
            </p>
          </div>
         </div>
        
      )}
    </div> 
      
    </div>) : (<div className="px-8 mb-8">
      <TeacherForm School={School}/>
      <div className="max-w-lg m-auto">
        <button className="w-auto px-4 py-2 border-primary border rounded-md text-primary font-medium " onClick={() => setForm(false)}>Grįžti atgal</button>
      </div>
      
      </div>)}
        
    
    

    </section>
  )
}

export default SchoolPage;