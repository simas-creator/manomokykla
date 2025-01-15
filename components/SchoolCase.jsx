import React from 'react'

const SchoolCase = ({name = "Kauno Technologijos Universiteto gimnazija", imgUrl}) => {
  return (
    <div className="card bg-base-100 shadow-xl p-4 flex flex-col items-center gap-4 border text-center">
      <div className="flex flex-col items-center">
        <h6 className="text-lg font-bold">{name}</h6>
      </div>
    </div>
  )
}

export default SchoolCase