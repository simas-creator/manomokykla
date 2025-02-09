import Image from "next/image"
import StarRating from "./StarRating";
const TeacherPage = ({teacher}) => {
  
  return (
    <section>
      
      <main className="w-full px-10 mt-10">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="p-3 rounded-full border-2 overflow-hidden w-20 h-20">
            <img src={teacher?.imageUrl} alt="" />
          </div>
          <div>
          <h1 className="md:text-3xl font-medium font-title text-xl">{teacher?.name} {teacher?.surname}</h1>
          <h3 className="text-gray-500">{teacher?.subject}</h3>
          </div>
          
        </div>
        <div>
          <StarRating size="xl" number={"0"}/>
          <div className="text-[15px] flex gap-2">
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
        <div className="border w-full mt-4">

        </div>
      </main>
      <div>
        <p className="px-10 mt-4">Įvertinimai:</p>
      </div>
    </section>
  )
}

export default TeacherPage