import Link from "next/link"
const ViewMessage = ({type, object, message, name, setOpen}) => {
  return (
    <div className="w-full h-[350px] bg-white relative p-8 flex flex-col justify-between">
        <button onClick={() => setOpen(false)} 
          className="absolute top-2 right-2 text-xl font-bold text-gray-500 hover:text-gray-800"
        >
          ✖</button>

          <div>
            <div className="flex flex-col border-2 p-2">
            <div  className="text-left flex gap-x-2">
                <p>Mokinys:</p>
                <h4 className="font-medium mb-1">{object.user}</h4>
            </div>
            <div className="text-left flex gap-x-2">
                <p>Tema:</p>
                <p className="font-medium mb-1">{type ==='school' ? 'Mokykla' : "Mokytojas"}</p>
                
            </div>
            <div className="flex gap-x-2">
                <p>Objektas:</p>
                {type === 'school' ? (
                    <Link href={`/perziureti-mokyklas/-${object.school}`} className="mb-1 truncate text-primary hover:underline">{name[object.school]}</Link>
                ) : (
                    <Link href={`/perziureti-mokyklas/-${object.school}/-${object.teacher}`} className="mb-1 truncate text-primary hover:underline">{name[`${object.school}-${object.teacher}`]}</Link>
                )}
            </div>
            </div>
            
            <p className="px-4 mt-4 text-2xl font-medium">Žinutė:</p>
            <p className="mt-2">{object.message}</p>

          </div>

    </div>
  )
}

export default ViewMessage