import { useState } from "react";

const CustomSelect = ({ name, parameters, action, subj }) => {
  const [active, setActive] = useState(false);
  const [filt, setFilt] = useState("");

  const handleChange = (e) => {
    setFilt(e.target.value);
  };

  const toggleDropdown = () => {
    setActive((prev) => !prev);
  };
  const handleOptionClick = (p) => {
    action(p);
    setActive(false);
  };
  return (
    <div className="w-full relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between w-full h-11 px-6 py-2 rounded-md text-gray-700 bg-white border border-primary hover:bg-gray-100 transition-colors duration-200"
        aria-expanded={active}
        type="button"
        aria-controls="dropdown-list"
      >
        {subj && <span>{subj}</span>}
        {!subj && <span>{name}</span>}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-5 h-5 transform transition-transform duration-200 ${active ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {active && (
        <div
          id="dropdown-list"
          className="absolute top-full mt-2 w-full bg-white rounded-md shadow-lg overflow-hidden z-10"
          role="listbox"
        >
          {/* Search Input */}
          <div className="relative px-4 py-2 border-b border-gray-200">
            <svg
              className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Ieškoti"
              value={filt}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none text-sm"
              aria-label="Search"
            />
          </div>

          {/* Options */}
          <ul className="max-h-44 overflow-y-auto" role="listbox">
            {parameters &&
              parameters
                .filter((p) => p && p.toLowerCase().includes(filt.toLowerCase()))
                .map((p, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors duration-150"
                    onClick={() => handleOptionClick(p)}
                  >
                    {p}
                  </li>
                ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
