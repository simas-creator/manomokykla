import { useEffect } from "react";

const Popup = ({ isOpen, setOpen, review }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = ""; 
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  if (!isOpen) return null;

  return (
    <div className="z-20 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm px-10">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] h-[300px] relative">
        <button 
          onClick={() => setOpen(false)} 
          className="absolute top-2 right-2 text-xl font-bold text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>
        <h2 className="text-lg font-semibold">Įvertinimas</h2>
        <p className="mt-2 text-gray-600">{review.user}</p>
      </div>
    </div>
  );
};
export default Popup
