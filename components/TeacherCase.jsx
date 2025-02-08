'use client'

const TeacherCase = ({
 teacher
}) => {
  const truncate = (text, n) => {
    return text?.length > n ? text.slice(0, n - 1) + '...' : text;
  }
  const {rating, name, surname, subject, imageUrl} = teacher;
  return (
    <div className="card bg-base-100 w-auto max-w-96 h-auto shadow-xl p-4 flex flex-row items-center gap-4 border">
      
      <div className="avatar">
        <div className="p-2 w-16 h-16 rounded-full border-2 border-gray-300 overflow-hidden">
          <img className="" src={imageUrl} alt={`${name} ${surname}`} />
        </div>
      </div>
      <div className="flex flex-col">
        <h6 className="text-lg font-bold text-gray-600">
          {truncate(name, 10)} {truncate(surname, 10)}
        </h6>
        <p className="text-sm text-gray-600">{subject}</p>
        <div className='flex gap-1 items-center'>
          <p>{rating.toFixed(1)}</p>
          <div className='mask mask-star-2 h-5 w-5 bg-orange-400'></div>
        </div>
        
      </div>
      <div className="">
        <button className="btn btn-primary btn-outline">Peržiūrėti</button>
      </div>
    </div>
  );
};

export default TeacherCase;