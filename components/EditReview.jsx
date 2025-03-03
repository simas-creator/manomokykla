import { useEffect, useState } from "react";

const EditReview = ({ setOpen, open, review }) => {
    const {criterion1, criterion2, criterion3} = review
    const criteria = 
       [ criterion1,
        criterion2,
        criterion3
    ]
    useEffect(() => {
        if (open) {
            // Save the current scroll position
            const scrollY = window.scrollY;
            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollY}px`;
            document.body.style.left = "0";
            document.body.style.width = "100%";
            document.body.style.overflow = "hidden";
        } else {
            // Restore scroll position after closing
            const scrollY = Math.abs(parseInt(document.body.style.top || "0"));
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.width = "";
            document.body.style.overflow = "";
            window.scrollTo(0, scrollY);
        }

        return () => {
                const scrollY = Math.abs(parseInt(document.body.style.top || "0"));
                document.body.style.position = "";
                document.body.style.top = "";
                document.body.style.width = "";
                document.body.style.overflow = "";
                window.scrollTo(0, scrollY);
        };
    }, [open]);

    return (
        <div className="fixed m-auto backdrop-blur-sm inset-0 z-20 pt-20">
            <div className="max-w-lg h-fit bg-white border shadow-xl relative p-8">
            <button 
          onClick={() => setOpen(false)} 
          className="absolute top-2 right-2 text-xl font-bold text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>
                <h3 className="text-2xl font-title text-center mb-6 font-bold">Redaguoti įvertinimą</h3>
                <form action="" className="flex flex-col">
                    <div>
                    <span className="text-gray-700 font-medium">Įvertinimai</span>
                    <div className="flex flex-col gap-6">
              {criteria.map((criterion, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <p className="font-medium text-gray-700">{criterion}</p>
                  <div className="rating flex gap-1">
                    {[1, 2, 3, 4, 5].map((index) => (
                      <input
                        key={index}
                        type="radio"
                        name={criterion}
                        className="mask mask-star-2 w-8 h-8 bg-orange-400"
                        onChange={() => handleRating(criterion, index)}
                        defaultChecked={index===1}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
                    </div>  
                    
                    <span className="text-gray-700 font-medium">Komentaras</span>
                    <textarea name="" id="" defaultValue={review?.comment} className="text-sm rounded-md resize-none border-primary border pt-2 px-4 outline-none"></textarea>
                </form>
                
            </div>
        </div>
    );
};

export default EditReview;
