import React from 'react'

const SchoolCase = ({name, apskritis, mu, imgUrl}) => {
  return (
    <div className="card bg-base-100 w-auto max-w-96 h-auto shadow-xl p-4 flex flex-col items-center gap-4 border text-center">
      {/* School Icon */}
      <div className="w-12 h-12 rounded-full border-2 border-accent overflow-hidden">
        <img
          src={imgUrl || "https://www.flaticon.com/free-icons/education"} 
          alt={`${name} logo`}
        />
      </div>
      
      {/* School Info */}
      <div className="flex flex-col items-center">
        <h6 className="text-lg font-bold text-primary">{name}</h6>
        <p className="text-sm text-gray-600">{apskritis}</p>
        <p className="text-sm text-gray-400">{mu}</p>
      </div>
    </div>
  )
}

export default SchoolCase