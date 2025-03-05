import { useState } from "react";
import StarRating from "./StarRating"
import Popup from "@/components/Popup"
const ReviewCase = ({review}) => {
    const {criterion1, criterion2, criterion3, user, comment, updatedAt, rec} = review
    const rating = (criterion1 + criterion2 + criterion3) / 3;
    const [open, setOpen] = useState()
    const date = new Date(updatedAt);
    const formatedDate = date.toISOString().split("T")[0];
  return (
        <div className={`border border-black rounded-xl px-4 ${!comment ? 'h-fit sm:w-78  w-fit max-w-md' : 'max-w-md h-fit w-fit sm:w-90'}`}>
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
             <div className="line-clamp-3 mt-3 text-lg">
                {comment}
            </div>}
            
            <div className="pt-4 pb-4 flex justify-between items-center flex-wrap gap-6">
                <div>
                {review?.anonymous === false && <p className="text-sm text-gray-600">{review?.user}</p>}
                <p className="text-gray-400">
                    {formatedDate}
                </p>
                
                </div>
                
                <div className="">
                    <button onClick={() => setOpen(true)} className="px-5 py-2 btn btn-primary btn-outline">Išsamiau</button>
                    {open && <Popup isOpen={open} setOpen={setOpen} review={review}/>}
                    
                </div>
            </div>
        </div>
    
  )
}

export default ReviewCase