"use client";

import { Star } from "lucide-react";

export default function Rate({
  value,
  max = 5,
  criterion,
  setJsonData,
  jsonData,
}) {
  return (
    <div className="flex">
      {[...Array(max)].map((_, index) => {
        const starValue = index + 1;
        const handleChange = (val) => {
          setJsonData((jsonData) => ({ ...jsonData, [criterion]: val }));
          
        };
        console.log(jsonData, 'our jsonData')
        return (
          <button
            key={index}
            type="button"
            className="p-1 focus:outline-none"
            onClick={() => handleChange(starValue)}
          >
            <Star
              size={24}
              className={`transition-colors ${
                (value) >= starValue
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
