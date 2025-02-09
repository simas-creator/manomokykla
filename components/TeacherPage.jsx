import Image from "next/image"
import StarRating from "./StarRating";
import { usePathname,} from "next/navigation";
import { useEffect, useState } from "react";
const TeacherPage = ({teacher}) => {
  const path = usePathname();
  const [school, setSchool] = useState(null);
  const [schoolImage, setSchoolImage] = useState(null);
  useEffect(() => {
    if (!teacher || !teacher.n) return;
    const fetchSchool = async () => {
      console.log(teacher.n)
      const res = await fetch(`/api/schools/byn?n=${teacher?.n}`)  
      const {data, image} = await res.json();
      console.log(image)
      console.log(data)
      setSchool(data);
      setSchoolImage(image);
      return
    }
    fetchSchool();
  }, [teacher])
  
  return (
    <section className="">
      
      <main className="w-full px-10 mt-10 flex flex-1">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
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
            <div className="mt-2">
              <button className="px-4 py-2 border rounded-md border-primary text-primary">Įvertinti</button>
            </div>
          </div>
          
        </div>
        
        <div className="absolute right-2 md:right-10 top-[80px] text-sm hidden md:block">
          {school}
         
        </div>
        <div className="absolute end-0 top-[63px]">
          <div className="border-2 w-20 h-20 md:hidden">
            <img className="w-full h-full object-cover" src={schoolImage} alt="" />
          </div>
        </div>
        
        
      </main>
      <div className="border px-10 w-auto mx-10 mt-4">

      </div>
      <div>
        <p className="px-10 mt-4">Įvertinimai:</p>
      </div>
    </section>
  )
}

export default TeacherPage