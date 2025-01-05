import React from "react";

const StarRating = ({ r = 1 }) => {
  const starCount = 5; // Total number of stars

  // Determine the full, half, and empty stars
  const fullStars = Math.floor(r); // Full stars count
  const halfStar = r % 1 >= 0.5; // Check if there's a half star

  return (
    <div className="rating rating-sm items-center py-1">
      {/* Render full stars */}
      <div className='px-1 text-sm opacity-60'>
        {r.toFixed(1)}
      </div>
      {Array.from({ length: fullStars }).map((_, index) => (
        <input
          key={`full-${index}`}
          type="radio"
          name="rating"
          className="mask mask-star-2 bg-orange-400"
          defaultChecked
          disabled
        />
      ))}
      
      {/* Render half star */}
      {halfStar && (
        <input
          type="radio"
          name="rating"
          className="mask mask-star-2 bg-orange-400 opacity-50"
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
          className="mask mask-star-2 bg-gray-300"
          disabled
        />
      ))}
      
    </div>
  );
};

export default StarRating;
