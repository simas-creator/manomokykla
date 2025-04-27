import React from 'react'

const Confirm = ({object, open, setOpen, names}) => {
  let name;
  let school = object;
  if(object?.m) {
    name = names[`${object.n}-${object.m}`]?.split(' - ')[0];
    school = names[`${object.n}-${object.m}`]?.split(' - ')[1] || object.name
  }
  const vanishSchool = async (o) => {
    const res = await fetch(`/api/schools/delete?n=${o.n}`, {
      method: 'DELETE'
    })
    setOpen(false)

  }
  const vanishTeacher = async (o) => {
    const res = await fetch(`/api/teachers/delete?n=${o.n}&m=${o.m}`, {
      method: 'DELETE'
    })
    setOpen(false)    
  }
  const publishSchool = async (o) => {
    const res = await fetch(`/api/schools/publish?n=${o.n}`, {
      method: 'PATCH'
    })
    setOpen(false)
  }
  const publishTeacher = async (o) => {
    const res = await fetch(`/api/teachers/publish?n=${o.n}&m=${o.m}`, {
      method: 'PATCH'
    })
    setOpen(false)
  }
  return (
    <div className='h-full rounded-xl p-6 pt-10 relative flex flex-col items-center justify-center'>
    <button 
          onClick={() => setOpen(false)} 
          className="absolute top-2 right-2 text-xl font-bold text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>
    {object?.m ? (
        <>  
            <h3 className='text-xl font-bold mb-2 text-center'>{school}</h3>
            <h4 className='text-lg text-center'>
            {name}
            
            </h4>
            <p className='text-gray-400 mb-4 text-center'>{object.subject}</p>
            <div className='flex gap-x-2'>
                <button onClick={() => vanishTeacher(object)} className='px-4 py-2 rounded-md text-red-400 border border-red-400 hover:bg-red-100'>Naikinti</button>
                <button onClick={() => publishTeacher(object)} className='px-4 py-2 rounded-md text-primary border border-primary hover:bg-primary hover:bg-opacity-20'>Patvirtinti</button>
            </div>
        </>) : (
            <>
                <h4 className='font-bold text-xl mb-2 text-center'>
                    {school.name}
                </h4>
                <p className='text-gray-700 mb-4'>{object.type}</p>
                <div className='flex gap-x-2'>
                    <button onClick={() => vanishSchool(object)} className='px-4 py-2 rounded-md text-red-400 border border-red-400 hover:bg-red-100'>Naikinti</button>
                    <button onClick={() => publishSchool(object)} className='px-4 py-2 rounded-md text-primary border border-primary hover:bg-primary hover:bg-opacity-20'>Patvirtinti</button>
                </div>
            </>)}
    
    </div>
  )
}

export default Confirm