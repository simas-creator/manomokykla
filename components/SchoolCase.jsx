import React from 'react'

const SchoolCase = ({name = "Kauno Technologijos Universiteto gimnazija", imgUrl}) => {
  return (
  <div className="lg:h-[470px] card bg-blue-50 bg-opacity-50 shadow-xl p-4 flex flex-col items-center gap-4 border text-center">
    <div className="flex flex-col items-center w-full gap-2">

    <div className='w-[75%]'>
      <h6 className="md:text-xl text-lg font-medium">{name}</h6>
    </div>

    <div className="flex items-center gap-2">
      <p className='text-3xl font-title'>4.8</p>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 0l2.5 6.5H20l-5 3.5 2 6.5-5-4.5-5 4.5 2-6.5-5-3.5h7.5L10 0z" clipRule="evenodd" />
      </svg>
    </div>

    {/* Container with background image and overlay */}
    <div className="relative w-[85%] sm:h-[150px] md:h-[200px] lg:h-[250px] xl:h-[300px] h-[200px] rounded-xl overflow-hidden border-2 border-gray-400">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: `url(${imgUrl})` }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-blue-50 opacity-80"></div>
    </div>

  </div>
  <div>
    <button className='btn btn-primary text-white'>Plačiau</button>
  </div>
</div>

  )
}

export default SchoolCase