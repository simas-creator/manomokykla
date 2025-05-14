import { useEffect, useState, useCallback } from "react";
import { Star, Verified } from "lucide-react";
import Link from "next/link";
import replaceLithuanianChars from "@/lib/transfomUrl";
import Image from "next/image";
const SchoolCase = ({
  school = {
    name: "",
    rating: 0.0,
    imgUrl: "",
    status: "",
  },
  ref,
}) => {
  const rating = school.rating;
  const [teachers, setTeachers] = useState([1, 2]);
  async function getTeachers() {
    try {
      const res = await fetch(
        `/api/teachers/view?school=${school._id}&limit=2`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          next: { revalidate: 3600 },
        }
      );

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
  }

  const id = replaceLithuanianChars(school.name);
  useEffect(() => {
    if(school.status === 'pending') {
      return
    }
    getTeachers(setTeachers, school);
  }, []);
  const truncate = useCallback((str, n) => {
    if (!str) return "";
    if (str === `${undefined} ${undefined}` && n === 12) {
      return "Vardas Pavardė";
    }
    return str.length > n ? str.slice(0, n) + "..." : str;
  }, []);
  return (
    <div
      ref={ref}
      className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg h-auto bg-white rounded-lg shadow-md border border-gray-200 flex flex-col"
    >
      {/* Image Section */}
      <div className="w-full h-36 relative">
        {school.status === "verified" &&
        <Image
        fill
        src={school.imgUrl}
        alt={school.name}
        className="h-full w-full m-auto object-cover rounded-t-lg"
      />
        }

        {school.status === "pending" &&
          <p className="w-full h-full flex items-center bg-gray-50 justify-center text-gray-600 font-thin text-2xl">Laukia patvirtinimo...</p>
        }
        <div className="absolute top-2 right-2 group cursor-pointer">
          <Verified
            size={36}
            fill="white"
            stroke={school.status === "ok" ? "#009dff" : "#6b7280"}
          />
          <div
            className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 whitespace-nowrap 
                  bg-black text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 
                  transition-opacity duration-200 pointer-events-none z-10"
          >
            {school.status === "ok" ? "Patvirtinta" : "Nepatvirtinta"}
          </div>
        </div>
      </div>
      <div className=" h-0.5 w-full" style={{
        backgroundImage: "linear-gradient(to right, #009DFF, white )"
      }}></div>
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
              <Star key={index} size={16} fill={index < Math.floor(rating) ? "black": "white"}/>
            ))}
          </div>
        </div>

        {/* Teachers and Reviews */}
        <div className="grid grid-cols-2 gap-2 overflow-hidden">
          {teachers.map((teacher, index) => (
            <div key={index} className="flex flex-col items-start gap-2">
              <div className="flex items-center">
                {/* Profile Picture */}
                <div className="w-10 h-10 border-2 rounded-full flex items-center justify-center overflow-hidden">
                  {teacher?.imageUrl ? (
                    <Image
                      alt="teacher"
                      width={20}
                      height={20}
                      src={teacher.imageUrl}
                      className="w-7 h-7 object-cover"
                    />
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
                  <p className=" ml-2 text-gray-800 font-medium">
                    {truncate(
                      `${teachers[index]?.name} ${teachers[index]?.surname}`,
                      12
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <Link
          prefetch
          href={`/perziureti-mokyklas/${id}`}
          className="mt-4 bg-primary self-start rounded-md px-5 py-2 text-white font-medium hover:opacity-80"
        >
          Plačiau
        </Link>
      </div>
    </div>
  );
};

export default SchoolCase;
