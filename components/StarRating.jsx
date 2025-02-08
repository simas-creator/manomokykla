import React from "react";

const StarRating = ({ r = 0, size = "sm", number = undefined}) => {
  const starCount = 5; // Total number of stars

  // Determine the full, half, and empty stars
  const fullStars = Math.floor(r); // Full stars count
  const halfStar = r % 1 >= 0.5; // Check if there's a half star

  return (
    <div className="rating rating-xl py-1 gap-1 items-center">
      {/* Render full stars */}
      {size === "xl" ? (<div className='px-1 text-lg md:text-2xl text-gray-400 font-title'>
        {r.toFixed(1)}
      </div>) : (<div className='px-1 text-md font-title text-gray-400'>
        {r.toFixed(1)}
      </div>)}
      
      {Array.from({ length: fullStars }).map((_, index) => (
        size === "xl" ? (<input
          key={`full-${index}`}
          type="radio"
          name="rating"
          className="mask mask-star-2 bg-orange-400 h-5 w-5 md:w-7 md:h-7"
          defaultChecked
          disabled
        />) : (<input
          key={`full-${index}`}
          type="radio"
          name="rating"
          className="mask mask-star-2 bg-orange-400"
          defaultChecked
          disabled
        />)
      ))}
      
      {/* Render half star */}
      {halfStar && (
        <input
          type="radio"
          name="rating"
          className="mask h-5 w-5 md:h-7 md:w-7 mask-star-2 bg-orange-400 opacity-50"
          defaultChecked
          disabled
        />
      )}

      {/* Render empty stars */}
      {Array.from({ length: starCount - fullStars - (halfStar ? 1 : 0) }).map((_, index) => (
        <input
          key={`empty-${index}`}
          type="radio"
          name="rating"
          className="mask mask-star-2 bg-gray-300 h-5 w-5 md:h-7 md:w-7"
          disabled
        />
      ))}
      {number !== undefined && <div className="text-gray-400 text-lg md:text-xl">({number})</div>}
      
    </div>
  );
};

export default StarRating;
