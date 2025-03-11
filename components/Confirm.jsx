import React from 'react'

const Confirm = ({object, open, setOpen, names}) => {
  let name;
  let school = object;
  if(object?.m) {
    name = names[`${object.n}-${object.m}`]?.split(' - ')[0];
    school = names[`${object.n}-${object.m}`]?.split(' - ')[1] || object.name
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
            <h3 className='text-xl font-bold mb-2'>{school}</h3>
            <h4 className='text-lg'>
            {name}
            
            </h4>
            <p className='text-gray-400 mb-4'>{object.subject}</p>
        </>) : (
            <>
                <h4 className='font-bold text-xl mb-2'>
                    {school.name}
                </h4>
                <p className='text-gray-700 mb-4'>{object.type}</p>
            </>)}
    <div className='flex gap-x-2'>
        <button className='px-4 py-2 rounded-md text-red-400 border border-red-400 hover:bg-red-100'>Naikinti</button>
        <button className='px-4 py-2 rounded-md text-primary border border-primary hover:bg-primary hover:bg-opacity-20'>Patvirtinti</button>
    </div>
    </div>
  )
}

export default Confirm