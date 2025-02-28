'use client'
import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react"
import TeacherCase from "@/components/TeacherCase";
import StarRating from "@/components/StarRating";
import SearchBar from "@/components/SearchBar";
import FilterParameter from "./FilterParameter";
import TeacherForm from "@/components/TeacherForm"
import { useRouter, useSearchParams } from "next/navigation";
import Report from '@/components/SchoolReport';
const decodeSub = (str) => {
  const stringMap = {
    "biologija": "Biologija",
    "chemija": "Chemija",
    "daile": "Dailė",
    "ekonomika": "Ekonomika",
    "fizika": "Fizika",
    "geografija": "Geografija",
    "informacinestechnologijos": "Informacinės technologijos",
    "istorija": "Istorija",
    "fizinisugdymas": "Fizinis ugdymas",
    "lietuviukalbairliteratura": "Lietuvių kalba ir literatūra",
    "matematika": "Matematika",
    "muzika": "Muzika",
    "technologijos": "Technologijos",
    "anglu": "Anglų",
    "prancuzu": "Prancūzų",
    "rusu": "Rusų",
    "vokieciu": "Vokiečių"
  };
  return stringMap[str] || str
}
const checkIfReported = async (object, session) => {
  const response = await fetch(`/api/report/schools/check?school=${object.n}&user=${session.user.email}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  if(!response.ok) {
    return false;
  }
  const data = await response.json();

  if(data.exists) {
    return true;
  } else {
    return false;
  }
}
const SchoolPage = ({School}) => {
  const { data: session, status } = useSession()
  const router = useRouter();
  const [showReport, setShowReport] = useState(false);
  const searchParams = useSearchParams();
  const reportShow = useRef(false)
  const queries = Object.fromEntries(searchParams.entries());
  const [loading, setLoading] = useState(true);
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState(false);
  const [report, setReport] = useState(false);
  const [schoolRating, setSchoolRating] = useState(0);
  const [active, setActive] = useState(false);
  const [filter, setFilter] = useState(decodeSub(queries['dalykas']));
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState();
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
  const handleBack = () => {
    router.push('/perziureti-mokyklas'); 
  };
  useEffect(() => {
    if (!School?.n) return;
  
    async function getTeachers() {
      setLoading(true);
      
      try {
        const response = await fetch(`/api/teachers/number?school=${School.n}&dalykas=${queries['dalykas']}`);
        if (!response.ok) throw new Error("Failed to fetch teachers");
  
        const obj = await response.json();
        setTeachers(obj.data);
      } catch (error) {
        console.log("Error fetching teachers:", error);
      } finally {
        setLoading(false); 
      }
    }
    
    getTeachers();
    console.log(teachers)
    setSchoolRating(School.rating);
  }, [School]);
  useEffect(() => {
    if(!search) { 
      setFilteredData(teachers) 
    } else {
      setFilteredData(teachers.filter((teacher) => (`${teacher.name.toLowerCase()} ${teacher.surname.toLowerCase()}`).includes(search.toLowerCase())))
    }
    
  }, [search, teachers])
  useEffect(() => {
    if(status === 'loading') {
      return;
    }
    if(!session) {
      setShowReport(true);
      return;
    }
    const fetchIfReported = async () => {
      const res = await checkIfReported(School, session);
      if(res === true) {
        setShowReport(false);
      } else {
        setShowReport(true);
      }
    }
    fetchIfReported();
  }, [session, School])
  const handleReport = () => {
    if(status === 'loading') {
      return;
    }
    if(!session) {
      router.push('/prisijungti')
      return
    }
    setReport(true);
  }
  if(report) {
    return (
      <>
    <button
      onClick={handleBack}
      className="flex sm:hidden mt-2 items-center gap-2 text-gray-700 hover:text-black transition-all duration-300 p-2 rounded-lg group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300"
        >
          <path
            fillRule="evenodd"
            d="M15.707 4.293a1 1 0 010 1.414L10.414 11H20a1 1 0 110 2h-9.586l5.293 5.293a1 1 0 11-1.414 1.414l-7-7a1 1 0 010-1.414l7-7a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
        <span className="font-medium">Atgal</span>
      </button>
      <main className='mt-4 sm:mt-10 w-auto flex flex-col'>

      <div className="flex gap-5 bsm:items-center flex-wrap flex-col bsm:flex-row bsm:px-6 sm:px-10">
      <div className="h-54  w-full bsm:w-auto overflow-hidden relative bsm:border-b-0 bsm:h-20">
              <img 
                src={School.imgUrl}
                className="h-64 w-full bsm:h-20 bsm:w-20 bsm:opacity-100 object-cover bsm:rounded-lg bsm:border-2 border-2"
              />
              
              <div className="bsm:hidden absolute bottom-0 left-0 w-full h-[70%] bg-gradient-to-t from-white/100 to-transparent"></div>
            </div>
            
        <div className="flex flex-col z-10 px-6 bsm:px-0">
          <h1 className='font-title text-xl font-medium md:text-3xl'>{School.name}</h1>
          <div className="flex gap-2 mt-2">
            <StarRating r={schoolRating} size="xl" />
          </div>
        </div>
      </div>

          
          <div className="mt-3 w-full z-10 flex justify-between relative px-6 sm:px-10">
            <button
            onClick={() => setReport(false)} 
            className="flex items-center gap-2 border px-4 py-2 text-sm rounded-md  transition-colors" >
              Grįžti atgal
            </button>
          </div>
          
          <div className='border mt-6'></div>
          <div className="px-6 sm:px-10 mb-8">
            <Report object={School} setReport={setReport} />
          </div>

      </main>
      </>)
  }
  return (
    <section>
        <button
        onClick={handleBack}
        className="flex sm:hidden mt-2 items-center gap-2 text-gray-700 hover:text-black transition-all duration-300 p-2 rounded-lg group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300"
          >
            <path
              fillRule="evenodd"
              d="M15.707 4.293a1 1 0 010 1.414L10.414 11H20a1 1 0 110 2h-9.586l5.293 5.293a1 1 0 11-1.414 1.414l-7-7a1 1 0 010-1.414l7-7a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="font-medium">Atgal</span>
        </button>
        <main className='mt-4 sm:mt-10 w-auto flex flex-col'>

            <div className="flex gap-5 bsm:items-center flex-wrap flex-col bsm:flex-row bsm:px-6 sm:px-10">
            <div className="h-54  w-full bsm:w-auto overflow-hidden relative bsm:border-b-0 bsm:h-20">
              <img 
                src={School.imgUrl}
                className="h-64 w-full bsm:h-20 bsm:w-20 bsm:opacity-100 object-cover bsm:rounded-lg bsm:border-2 border-2"
              />
              
              <div className="bsm:hidden absolute bottom-0 left-0 w-full h-[70%] bg-gradient-to-t from-white/100 to-transparent"></div>
            </div>
            <div className="flex flex-col z-10 px-6 bsm:px-0">
              <h1 className='font-title text-xl font-medium md:text-3xl'>{School.name}</h1>
              <div className="flex gap-2 mt-2">
                <StarRating r={schoolRating} size="xl" />
              </div>
            </div>
          </div>
            <div className="mt-3 w-full z-10 flex justify-between relative px-6 sm:px-10">
              <button onClick={() => handleForm()} className="w-auto px-4 py-2 border rounded-lg border-primary transition-colors text-primary font-medium hover:text-black text-sm hover:bg-primary">Pridėti {School.type === 'Gimnazija' ? ('mokytoją'): ('dėstytoją')}</button>
              {showReport === true && 
              <button
              onClick={() => handleReport()} 
              className="flex text-sm items-center gap-2 border px-2 py-1 border-red-400 text-red-400 rounded-md hover:bg-red-400 hover:text-white transition-colors" >
                Pranešti
                <img src="/images/flag-country-svgrepo-com.svg" className="w-6 h-6" alt="" />
              </button>}
              
            </div>
            
            <div className='border mt-6'></div>
            

        </main>

        {form === false ? (<div>
          <div className="px-6">
              <SearchBar setSearch={setSearch} parameter={`${School.type === 'Gimnazija' ? ('Ieškokite mokytojo') : ('Ieškokite dėstytojo')}`} />
              {School.type === 'Gimnazija' && <div className="lg:max-w-screen-lg pl-6 pr-4 m-auto">
                <FilterParameter type={"Dalykas"} parameters={subjects} active={active} setActive={setActive} filter={filter || decodeSub(queries['dalykas'])} setFilter={setFilter}/>
              </div>}
              
        </div>
        <div>
  {loading ? (
    <div className="p-10 w-full flex justify-center items-center">
      <p>Kraunama...</p> {/* Show loading state */}
    </div>
  ) : teachers.length > 0 ? (
    <>
      <div className="w-full mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 px-10 justify-items-center mb-6">
        {filteredData.map((teacher, index) => (
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
      <div>{School.type === 'Gimnazija' ? ('Mokytojų'): ('Dėstytojų')} nerasta.</div>
      
      <div className="w-full px-2 py-8">
        <p>
          Nematote savo {School.type === 'Gimnazija' ? ('mokytojo'): ('dėstytojo')} ?{" "}
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