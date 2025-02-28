import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
const SchoolCase = ({
  school = {
    name: "",
    rating: 0.0,
    imgUrl: "",
  }, ref
}) => {
  const rating = school.rating;
  const [teachers, setTeachers] = useState([]);
  const getTeachers = useCallback(async () => {

    try {
      const res = await fetch(`/api/teachers/number?school=${school.n}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        console.log(res.message, "error");
        return;
      }

      const result = await res.json();
      setTeachers(result.data);
      console.log(result);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }, [school?.n]);
  const replaceLithuanianChars = useCallback((str) => {
    const charMap = {
      'ą': 'a', 'č': 'c', 'ę': 'e', 'ė': 'e', 'į': 'i', 'š': 's', 'ų': 'u', 'ū': 'u', 'ž': 'z',
      'Ą': 'A', 'Č': 'C', 'Ę': 'E', 'Ė': 'E', 'Į': 'I', 'Š': 'S', 'Ų': 'U', 'Ū': 'U', 'Ž': 'Z',
      '„': '', '“': '',
    };
    
    return str
    .normalize("NFKD") 
    .replace(/[„“‘’"']/g, '') 
    .replace(/[ąčęėįšųūžĄČĘĖĮŠŲŪŽ]/g, (char) => charMap[char] || char)
    .replace(/[^a-zA-Z0-9-]/g, '') 
    .replace(/-{2,}/g, '-') 
    .toLowerCase();
    
  }, []);
  const id = replaceLithuanianChars(school.name.toLowerCase().replace(/\s/g, "-"));
  useEffect(() => {
    getTeachers(setTeachers, school);
  }, [school.n]);
  const truncate = useCallback((str, n) => {
    if (!str) return "";
    if(str === `${undefined} ${undefined}` && n === 12) {
      return "Vardas Pavardė"
    } else if (str === `undefined` && n === 22) {
      return "Atsiliepimas..."
    }
    return str.length > n ? str.slice(0, n) + "..." : str;
  }, [])
  return (
    <div ref={ref} className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg h-auto bg-white rounded-lg shadow-md border border-gray-200 flex flex-col">
      {/* Image Section */}
      <div className="w-full h-36 overflow-hidden">
        <img
          src={school.imgUrl}
          alt={school.name}
          className="h-full w-full m-auto object-cover rounded-t-lg opacity-30"
        />
        
      </div>
      <div className="border"></div>
      {/* Content Section */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        {/* School Name */}
        <div className="text-lg font-semibold text-gray-800 mb-2 truncate">
          {school.name}
        </div>

        {/* Rating Section */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-lg font-medium text-gray-700 flex items-center gap-2">
            {rating.toFixed(1)}
            <span className="text-sm text-gray-500">
              (pagal mokytojų įvertinimus)
            </span>
          </div>
          <div className="flex gap-1">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 ${
                  index < Math.round(rating)
                    ? "text-orange-400"
                    : "text-gray-300"
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927C9.469 1.784 10.53 1.784 10.95 2.927l1.357 3.936a1 1 0 00.95.674h4.243c1.054 0 1.487 1.36.637 1.993l-3.293 2.418a1 1 0 00-.364 1.118l1.357 3.936c.42 1.143-.374 2.093-1.514 1.574l-3.293-2.418a1 1 0 00-1.175 0l-3.293 2.418c-1.14.519-1.934-.431-1.514-1.574l1.357-3.936a1 1 0 00-.364-1.118L2.637 9.53c-.85-.633-.417-1.993.637-1.993h4.243a1 1 0 00.95-.674L9.049 2.927z" />
              </svg>
            ))}
          </div>
        </div>

        {/* Teachers and Reviews */}
        <div className="grid grid-cols-2 gap-2 overflow-hidden">
          {[teachers[0], teachers[1]].map((teacher, index) => (
            <div key={index} className="flex flex-col items-start gap-2">
              <div className="flex items-center">
                {/* Profile Picture */}
                <div className="w-10 h-10 border-2 rounded-full flex items-center justify-center overflow-hidden">
                  {teacher?.imageUrl ? (
                    <img src={teacher.imageUrl} className="w-7 h-7 object-cover" />
                  ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                  )}
                  
                </div>
                <div className="flex flex-col">
                  <p className="ml-2 text-sm text-gray-500">Mokytojas(-a)</p>
                  <p className=" ml-2 text-gray-800 font-medium">{truncate(`${teachers[index]?.name} ${teachers[index]?.surname}`, 12)}</p>
                </div>
              </div>

              {/* Review Text */}
              <div className="text-sm text-gray-600 line-clamp-2">
                {truncate(`${teacher?.reviews[0]?.comment}`, 22)}
              </div>
            </div> 
          ))}
        </div>

        {/* Button */}
        <Link prefetch href={`/perziureti-mokyklas/${id}-${school.n}`} className="mt-4 bg-primary self-start rounded-md px-5 py-2 text-white font-medium hover:opacity-80">Plačiau</Link>
      </div>
    </div>
  );
};

export default SchoolCase;
