import { useState } from "react";
import StarRating from "./StarRating"
import Popup from "@/components/Popup"
const ReviewCase = ({review}) => {
    const {criterion1, criterion2, criterion3, user, comment, createdAt, rec} = review
    const rating = (criterion1 + criterion2 + criterion3) / 3;
    const [open, setOpen] = useState()
    const date = new Date(createdAt);
    const formatedDate = date.toISOString().split("T")[0];
  return (



        <div className={`border border-black rounded-xl px-4 ${!comment ? 'h-32 sm:w-64 w-[80%]' : 'h-fit w-[85%] sm:w-72'}`}>
            <div className="flex items-center justify-between pt-3">
                <div>
                    <StarRating r={rating}/>
                </div>
                {rec === true ? (<div className="w-7 h-7">
                    <img src="/images/thumbs-up.svg" alt="" />
                </div>) : (<div className="w-7 h-7 pt-1">
                    <img src="/images/thumbs-down-red.svg" alt="" />
                </div>)}
            </div>
            {comment &&
             <div className="line-clamp-3 mt-3">
                {comment}
            </div>}
            
            <div className="pt-4 pb-4 flex justify-between items-center">
                <p className="text-gray-400">
                    {formatedDate}
                </p>
                <div className="">
                    <button onClick={() => setOpen(true)} className="px-5 py-2 btn btn-primary btn-outline">Išsamiau</button>
                    {open && <Popup isOpen={open} setOpen={setOpen} review={review}/>}
                    
                </div>
            </div>
        </div>
    
  )
}

export default ReviewCase