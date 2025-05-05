"use client";

import { useState } from "react";
import { Star } from "lucide-react";

export default function Rate({
  value,
  max = 5,
  criterion,
  setJsonData,
  jsonData,
}) {
  const [hoverValue, setHoverValue] = useState();

  return (
    <div className="flex">
      {[...Array(max)].map((_, index) => {
        const starValue = index + 1;
        const handleChange = () => {
          setJsonData((prev) => ({ ...prev, [criterion]: starValue }));
        };
        return (
          <button
            key={index}
            type="button"
            className="p-1 focus:outline-none"
            onClick={() => handleChange(starValue)}
            onMouseEnter={() => setHoverValue(starValue)}
            onMouseLeave={() => setHoverValue(0)}
          >
            <Star
              size={24}
              className={`transition-colors ${
                (hoverValue || value) >= starValue
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
