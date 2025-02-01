'use client';

const FilterParameter = ({ parameters, type, active, setActive }) => {  // Accept 'parameters' as a prop
  const isOpen = active === type;

  const toggleDropdown = () => {
    setActive(isOpen ? null : type)
  };

  return (
    <div className="min-w-min">
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center justify-between min-w-min px-6 py-2 border-2 border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-100 focus:outline-none transition duration-200"
        >
          <span>{type}</span>
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
          <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden max-h-48 overflow-y-auto opacity-95">
            <ul className="text-gray-700">
              {parameters && parameters.map((p, index) => (
                <li key={index} className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer transition-colors duration-150">
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
