'use client'
import { useEffect, useState } from "react";
import TeacherCase from "@/components/TeacherCase";
import StarRating from "@/components/StarRating";
import FilterTeachers from "@/components/FilterTeachers";
const SchoolPage = ({School}) => {

  const [jsonData, setJsonData] = useState({n: School.n, rating: 1});
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileError, setFileError] = useState(null);
  const [teachers, setTeachers] = useState([]);

  const [schoolRating, setSchoolRating] = useState(0);
  
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
    if(e.target.name === 'file') {
      const picture = e.target.files[0];

      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validImageTypes.includes(picture.type)) {
          setFileError("Netinkamas failo tipas");
          setImagePreview(null);
          return;
      } else {
        setFileError(null)
      }

      // Validate file size (5MB max)
      const maxFileSize = 5 * 1024 * 1024; // 5MB in bytes
      if (picture.size > maxFileSize) {
          setFileError("Failas negali būti didesnis nei 5MB");
          setFile(null);
          setImagePreview(null);
          return;
      } else setFileError(null);

      setJsonData({
        ...jsonData,
        picture
      });
      setImagePreview(URL.createObjectURL(picture));
    } else {
      setJsonData({
        ...jsonData,
        [e.target.name]: e.target.value
      })
    }
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

    const formData = new FormData();
    formData.append('file', jsonData.picture);
    formData.append('mokytojas', jsonData.first)
    if(jsonData.picture) {
      try {
        const res1 = await fetch('/api/s3-file', {
          method: 'POST',
          body: formData
        })
        
        if (!res1.ok) {
          setFileError("Klaida įkeliant failą");
          setLoading(false);
          return;
        }
  
        const data = await res1.json();
        jsonData.imgUrl = data.fileName;
        
      } catch (error) {
        console.log(error, "error")
      }
  
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
                className="h-20 w-20 rounded-lg object-cover hover:ring-2 hover:ring-primary "
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
            
            <div className='collapse bg-primary max-w-xl collapse-arrow'>
              <input type="checkbox" />
              <div className='collapse-title text-lg font-title text-gray-200'>Pridėti mokytoją</div>

              <div className='collapse-content'>
              <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg space-y-4 my-5 font-title">
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
                <div className="space-y-2">
                  
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
                </div>
                  
                  <div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                  </div>
                  {loading ? (<button type="submit" disabled className="btn bg-white text-primary btn-primary hover:text-black hover:bg-primary">
                    Kraunama...
                  </button>
                  ) : (<button type="submit" className="btn bg-white text-primary btn-primary hover:text-black hover:bg-primary">
                    Pridėti
                  </button>)}
                  
                </form>
              </div>
            </div>
          </div>
        </main>
    <div>
      <FilterTeachers />
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
  <div>Mokytojų nerasta.</div>
)}

    </div>
    </section>
  )
}

export default SchoolPage;