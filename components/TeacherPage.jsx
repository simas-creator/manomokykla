import Image from "next/image"
import StarRating from "./StarRating";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const TeacherPage = ({teacher}) => {
  const {data:session, status} = useSession();
  const router = useRouter()
  const [school, setSchool] = useState(null);
  const [schoolImage, setSchoolImage] = useState(null);
  const [form, setForm] = useState(false);
  const [rec, setRec] = useState(true);
  const toggleForm = () => {
    if(!session) {
      router.push('/prisijungti')
      return;
    }
    setForm(!form);
  }
  const criteria = [
    "Gebėjimas perteikti žinias",
    "Gebėjimas bendrauti su mokiniais",
    "Dalyko išmanymas",
  ];

  const [ratings, setRatings] = useState({});

  const handleRating = (criterion, value) => {
    setRatings({ ...ratings, [criterion]: value });
    console.log(ratings)
  };
  const handleSubmit = () => {
    console.log(ratings)
  }
  useEffect(() => {
    if (!teacher || !teacher.n) return;
    const fetchSchool = async () => {
      const res = await fetch(`/api/schools/byn?n=${teacher?.n}`);

      if (!res.ok) {
        console.log("Fetch failed with status:", res.status);
        return; // Prevent parsing empty response
      }

      const object = await res.json(); // Read raw response

      try {
        const { data, image } = object;
        setSchool(data);
        setSchoolImage(image);
      } catch (error) {
        console.log("Failed to parse JSON:", error);
      }

    }
    fetchSchool();
  }, [teacher])
  
  return (
    <section className="">
      
      <main className="w-full px-10 mt-10 flex flex-1">
        <div>
          <div className="flex gap-3 flex-col md:flex-row md:items-center flex-wrap">
            <div className="p-3 rounded-full border-2 overflow-hidden w-20 h-20">
              <img src={teacher?.imageUrl} alt="" />
            </div>
            <div>
            <h1 className="md:text-3xl font-medium font-title text-xl">{teacher?.name} {teacher?.surname}</h1>
            <h3 className="text-gray-500 font-title">{teacher?.subject}</h3>
            </div>
            
          </div>
          <div>
            <StarRating size="xl" number={"0"}/>
            <div className="text-[15px] flex gap-2 font-title">
              Rekomenduoja ... žmonių
              <div>
                <Image 
                width={24}
                height={24}
                alt={``}
                src={`/images/thumbs-up.svg`}/>
              </div>
            </div>
            {status !== 'loading' && 
            <div className="mt-2">
              {form ? (<button onClick={() => toggleForm()} className="px-4 py-2 border border-gray-300 rounded-md text-gray-500">
        Grįžti atgal
      </button>) : (<button className="px-4 py-2 border rounded-md border-primary text-primary" onClick={() => toggleForm()}>Įvertinti</button>)}
              
            </div>}
            
          </div>
          
        </div>
        
        <div className="absolute right-20 md:right-24 top-[95px] text-sm hidden md:block">
          {school}
         
        </div>
        {schoolImage && 
        <div className="absolute end-0 top-[63px]">
          <div className="border-2 w-20 h-20">
            <img className="w-full h-full object-cover" src={schoolImage} alt="" />
          </div>
        </div>}
        
        
        
      </main>
      <div className="border px-10 w-auto mx-10 mt-4"></div>
      
      {form && 
      <div className="w-full px-10 mb-8 items-center mx-auto">
      <div className="mx-auto max-w-screen-md mt-4 p-6 bg-white shadow-lg rounded-xl border border-gray-200">
      <h3 className="text-2xl font-semibold mb-8 mt-2 text-center font-title">Įvertinkite mokytoją</h3>
      
      {/* Rating Criteria */}
      <div className="flex flex-col gap-6">
        {criteria.map((criterion) => (
          <div key={criterion} className="flex flex-col gap-2">
            <p className="font-medium text-gray-700">{criterion}</p>
            <div className="rating flex gap-1">
              {[1, 2, 3, 4, 5].map((index) => ( 
                <input
                  key={index}
                  type="radio"
                  name={criterion}
                  className="mask mask-star-2 w-8 h-8 bg-orange-400"
                  onChange={() => handleRating(criterion, index)}
                  defaultChecked={index === 1}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    
      {/* Recommendation Section */}
      <div className="mt-6">
        <p className="mb-2 font-medium text-gray-700">Ar rekomenduotum šį mokytoją?</p>
        <div className="flex gap-3">
          <div 
            onClick={() => setRec(true)}
            className={`text-gray-700 text-sm px-5 py-2 border-2 border-gray-300 hover:bg-primary hover:text-white transition-colors duration-200 w-16 text-center rounded-md cursor-pointer ${
              rec ? "bg-primary text-white border-primary" : ""
            }`}
          >
            Taip
          </div>
          <div 
            onClick={() => setRec(false)}
            className={`text-gray-700 text-sm px-5 py-2 border-2 border-gray-300 hover:bg-red-500 hover:text-white transition-colors duration-200 w-16 text-center rounded-md cursor-pointer ${
              rec === false ? "bg-red-500 text-white border-red-500" : ""
            }`}
          >
            Ne
          </div>
        </div>
      </div>
    
      {/* Comment Section */}
      <div className="mt-6">
        <p className="mb-2 font-medium text-gray-700">Komentaras (neprivaloma)</p>
        <textarea
          className="focus:border-primary focus:outline-none w-full min-h-24 border border-gray-300 rounded-md p-3 text-sm transition-shadow resize-none"
          placeholder="Parašykite savo atsiliepimą..."
        ></textarea>
      </div>
    
      {/* Submit Button */}
      <button 
        onClick={() => handleSubmit()} 
        className="mt-6 w-full border border-primary font-medium text-primary font-title py-3 rounded-md hover:bg-primary hover:text-black transition-colors duration-200"
      >
        Pateikti įvertinimą
      </button>
    </div>
    
    </div>
    }
    </section>
  )
}

export default TeacherPage