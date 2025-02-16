
const StarRating = ({ r = 0, size = "sm", number = undefined }) => {
  const fullStars = Math.floor(r);
  const halfStars = Math.round(r) - fullStars;
  const emptyStars = 5 - fullStars - halfStars;

  const responsiveSize = size === "xl" ? "md:w-7 md:h-7 w-5 h-5" : "w-5 h-5";

  return (
    <div className="flex gap-1 items-center">
      <div className={`pr-1 text-gray-400 font-title ${size === "xl" ? "md:text-2xl text-lg" : "text-lg"}`}>
        {r.toFixed(1)}
      </div>
      <div className="flex">
        {[...Array(fullStars)].map((_, index) => (
          <div key={`full-${index}`} className={`mask mask-star-2 bg-orange-400 ${responsiveSize}`}></div>
        ))}
        {halfStars === 1 && (
          <div key="half" className={`mask mask-star-2 bg-orange-400 opacity-45 ${responsiveSize}`}></div>
        )}
        {[...Array(emptyStars)].map((_, index) => (
          <div key={`empty-${index}`} className={`mask mask-star-2 bg-gray-300 ${responsiveSize}`}></div>
        ))}
      </div>
    </div>
  );
};

export default StarRating;
