import React from "react";

const SchoolCase = ({
  name = "Kauno Technologijos Universiteto Gimnazija",
  rating = 4.0,
  teacher1 = {
    name: "Jonas Jonaitis",
    review:
      "Mokytojas labai atsakingas ir moko labai gerai. Labai patenkintas. Mokytojas labai atsakingas ir moko labai gerai. Labai patenkintas.",
  },
  teacher2 = {
    name: "Petras Petraitis",
    review:
      "Mokytojas labai atsakingas ir moko labai gerai. Labai patenkintas. Mokytojas labai atsakingas ir moko labai gerai. Labai patenkintas.",
  },
  imgUrl = "https://via.placeholder.com/320x180",
}) => {
  return (
    <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg h-auto bg-white rounded-lg shadow-md border border-gray-200 flex flex-col">
      {/* Image Section */}
      <div className="w-full h-40">
        <img
          src={imgUrl}
          alt={name}
          className="w-full h-full object-cover rounded-t-lg opacity-30"
        />
        <div className="border-2"></div>
      </div>
      
      {/* Content Section */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        {/* School Name */}
        <div className="text-lg font-semibold text-gray-800 mb-2 truncate">
          {name}
        </div>

        {/* Rating Section */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-lg font-medium text-gray-700 flex items-center gap-2">
            {rating.toFixed(1)}{" "}
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
                    ? "text-yellow-400"
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
          {[teacher1, teacher2].map((teacher, index) => (
            <div key={index} className="flex flex-col items-start gap-2">
              <div className="flex items-center">
                {/* Profile Picture */}
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <p className="ml-2 text-sm text-gray-500">Mokytojas(-a)</p>
                  <p className="ml-2 text-gray-800 font-medium">{teacher.name}</p>
                </div>
              </div>

              {/* Review Text */}
              <div className="text-sm text-gray-600 line-clamp-2">
                {teacher.review}
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <button className="w-[30%] py-2 mt-4 text-white bg-primary rounded-lg hover:opacity-80 transition">
          Plačiau
        </button>
      </div>
    </div>
  );
};

export default SchoolCase;
