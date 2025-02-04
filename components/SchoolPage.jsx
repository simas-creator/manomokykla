'use client'
import { useEffect, useState } from "react";
import TeacherCase from "@/components/TeacherCase";
import StarRating from "@/components/StarRating";
import CustomSelect from "@/components/CustomSelect";
import SearchBar from "@/components/SearchBar";
import FilterParameter from "./FilterParameter";
const SchoolPage = ({School}) => {

  const [jsonData, setJsonData] = useState({n: School.n, rating: 1});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [subj, setSubj] = useState(null);
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
  
  console.log(subjects);
  
  useEffect(() => {
    async function getTeachers() {
      const response = await fetch(`/api/teachers/${School.n}`);
      const obj = await response.json();
      console.log(obj)
      const tchrs = obj.data;
      setTeachers(tchrs);
    }
    getTeachers();
    setSchoolRating(School.rating);
  }, [School?.n])
  
  const truncate = (text, n) => {
    return text?.length > n ? text.slice(0, n - 1) + '...' : text;
  }

  const handleData = (e) => {
      setJsonData({
        ...jsonData,
        [e.target.name]: e.target.value
      })
    console.log(jsonData.first, jsonData.surname, jsonData.rating, jsonData.review, jsonData.subject, 'data')
  }
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    setLoading(true);
    const { first, surname, subject} = jsonData;
    if(!first || !surname || !subject) {
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
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
      })

      if(!response.ok) {
        console.log("Įvyko klaida", response.statusText);
        return
      }

    } catch (error) {
      console.log(error, 'error');
    } finally {
      setLoading(false);
    }
    window.location.reload()
  }
  return (
    <section>
        <main>
          
          <div className='p-10 w-auto'>
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
            
            
            <div className='divider'></div>
            <div>
              <SearchBar parameter={"Ieškokite mokytojo"} />
              <div className="lg:max-w-screen-lg pl-6 pr-4 m-auto">
                <FilterParameter type={"Dalykas"} parameters={subjects} active={active} setActive={setActive} filter={filter} setFilter={setFilter}/>
              </div>
            </div>
          </div>
        </main>
    
    <div>
      {teachers && teachers.length > 0 ? (
  teachers.map((teacher, index) => (
    
    <TeacherCase
      key={index}
      teacher={teacher}
    />

  ))
) : (
  <div>Mokytojų nerasta.</div>
)}

    </div>
    <div className='collapse bg-primary max-w-xl collapse-arrow m-auto'>
              <input type="checkbox" />
              <div className='collapse-title text-lg font-title text-gray-200'>Pridėti mokytoją</div>

              <div className='collapse-content'>
              <form className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg space-y-4 my-5 font-title">
                <div className="flex gap-10">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Vardas*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="first"
                      onChange={handleData}
                      className="input input-bordered input-primary w-full max-w-xs"
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
                      className="input input-bordered input-primary w-full max-w-xs"                        
                    />
                  </div>
                </div>
                {School.type === 'Gimnazija' ? 
                (<div className="space-y-2">
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
                    onChange={handleData}
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
              </div>
            </div>
    </section>
  )
}

export default SchoolPage;