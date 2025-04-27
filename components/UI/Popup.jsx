import { useEffect } from "react";
import StarRating from "./StarRating";
const Popup = ({ isOpen, setOpen, review }) => {
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY; // Save current scroll position
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`; // Offset to keep user at the same position
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      const scrollY = Math.abs(parseInt(document.body.style.top || "0"));
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY); // Restore original scroll position
    }
  
    return () => {
      const scrollY = Math.abs(parseInt(document.body.style.top || "0"));
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY); // Ensure reset on cleanup
    };
  }, [isOpen]);
  
  
  return (
    <div className="z-20 fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm px-10">
      <div className="bg-white p-6 rounded-lg shadow-2xl w-[400px] h-fit relative">
        <button 
          onClick={() => setOpen(false)} 
          className="absolute top-2 right-2 text-xl font-bold text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>
        <h4 className="text-lg font-semibold">Įvertinimas</h4>
        <p className="mt-2 text-gray-600">Gebėjimas perteikti žinias </p>
        <StarRating r={review.criterion1}/> 
        <p className="mt-2 text-gray-600">Gebėjimas bendrauti su mokiniais</p>
        <StarRating r={review.criterion2}/> 
        <p className="mt-2 text-gray-600">Dalyko išmanymas</p>
        <StarRating r={review.criterion3}/> 
        {review?.comment ? (
          <>
          <h4 className="text-lg font-semibold mt-3">Komentaras</h4>      
        <p className="mt-2 text-gray-600">{review.comment}</p>
        </>
        ): ('')
        }
        
      </div>
    </div>
  );
};
export default Popup
