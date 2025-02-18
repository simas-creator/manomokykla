'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const FilterParameter = ({ parameters, type, active, setActive, filter, setFilter }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Create a new URLSearchParams object from current params
  const params = new URLSearchParams(searchParams.toString());

  const isOpen = active === type;

  const handleChange = (p) => {
    setFilter(p);
    params.set(replaceLithuanianChars(type), replaceLithuanianChars(p));
    router.push(`?${params.toString()}`, { scroll: false }); // Update URL without refreshing
  };

  const handleRemove = () => {
    setFilter(null);
    params.delete(replaceLithuanianChars(type));
    router.push(`?${params.toString()}`, { scroll: false });
    toggleDropdown();
  };

  const toggleDropdown = () => {
    setActive(isOpen ? null : type);
  };
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

    
  return (
    <div className="min-w-min">
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center justify-between min-w-min px-6 py-2 border-2 border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-100 focus:outline-none transition duration-200"
        >
          <span>{filter || type}</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden max-h-48 overflow-y-auto">
            <div
              className="text-sm text-red-400 hover:cursor-pointer pl-4 w-full py-2 hover:bg-gray-100"
              onClick={handleRemove}
            >
              Naikinti filtrą
            </div>
            <ul className="text-gray-700">
              {parameters.map((p, index) => (
                <li
                  key={index}
                  onClick={() => {
                    handleChange(p);
                    toggleDropdown();
                  }}
                  className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer transition-colors duration-150"
                >
                  {p}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterParameter;
