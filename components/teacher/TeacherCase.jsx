'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
const TeacherCase = ({
 teacher
}) => {

  const {rating, name, surname, subject, imageUrl, url} = teacher;
  const pathname = usePathname()
  const fullUrl = pathname + '/' + url

  const truncate = (text, n) => {
    return text?.length > n ? text.slice(0, n - 1) + '...' : text;
  }
  
  return (
    <div className="card bg-base-100 max-w-96 w-full min-h-28 shadow-md p-4 flex flex-row items-center gap-4 border flex-wrap">
      

      <div className="p-2 w-12 h-12 rounded-full border-2 border-gray-300 overflow-hidden">
        <img className="" src={imageUrl} alt={`${name} ${surname}`} />
      </div>

      <div className="flex flex-col flex-1">
        <h6 className="text-md md:text-lg font-bold text-gray-600">
          {truncate(`${name} ${surname}`, 14)}
        </h6>
        <p className="text-sm text-gray-600">{truncate(subject, 17)}</p>
        <div className='flex gap-1 items-center'>
          <p>{rating?.toFixed(1) || `0.0`}</p>
          <div className='mask mask-star-2 h-5 w-5 bg-orange-400'></div>
        </div>
        
      </div>
      <div className="flex justify-end">
        <Link prefetch href={fullUrl} className="btn btn-primary btn-outline">Peržiūrėti</Link>
      </div>
    </div>
  );
};

export default TeacherCase;