
const SearchBar = ({parameter, setSearch}) => {
  return (
    <div className="p-6 lg:max-w-screen-lg m-auto">
        <div className="relative flex items-center">
            <svg
            className="absolute left-3 top-3 text-gray-400"
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
            name="search"
            className="h-12 w-full pl-10 pr-6 rounded-full border border-gray-200 bg-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
            placeholder={parameter}
            onChange={(e) => setSearch(e.target.value)}
            />
        </div>
      </div>
  )
}

export default SearchBar