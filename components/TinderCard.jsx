const Case = (teacher) => {
    return (
        <div className="w-80 h-[170px] bg-white m-auto rounded-md" >
            {teacher.name}
        </div>
    )
}
const TinderCard = ({teachers, setOpen}) => {
  return (
    <div className="h-[100vh] bg-black border-b border-white relative pt-24">
        <button onClick={() => setOpen(false)} className="absolute top-2 left-4 text-white border border-primary px-4 py-2 rounded-md font-thin m-4">Grįžti atgal</button>
        {teachers.map((t, i) => (
            <Case teacher={t} key={i}></Case>
        ))}
    </div>
  )
}

export default TinderCard