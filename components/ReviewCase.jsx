import StarRating from "./StarRating"
const ReviewCase = ({review}) => {
    const {criterion1, criterion2, criterion3, user, comment, createdAt, rec} = review
    const rating = (criterion1 + criterion2 + criterion3) / 3;
    const date = new Date(createdAt);
    const formatedDate = date.toISOString().split("T")[0];
  return (
    review.comment ? (
        <div className="mx-10 max-w-72 max-h-48 border border-black rounded-xl px-4 flex flex-col pb-3">
            <div className="flex items-center justify-between pt-3">
                <div>
                    <StarRating r={rating}/>
                </div>
                <div className="text-gray-400">
                    {formatedDate}
                </div>
            </div>
            <div className="pt-2 pb-4">
                <p className="line-clamp-3">{comment}</p>
            </div>
            <div className="w-full flex justify-end">
                <button className="px-5 py-2 btn btn-primary btn-outline">Išsamiau</button>
            </div>
            
        </div>

    ) : (
        <div className="mx-10 max-w-64 min-h-20 border border-black rounded-xl px-4">
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
            <div className="pt-6 pb-4 flex justify-between items-center">
                <p className="text-gray-400">
                    {formatedDate}
                </p>
                <div className="">
                    <button className="px-5 py-2 btn btn-primary btn-outline">Išsamiau</button>
                </div>
            </div>
        </div>
    )
  )
}

export default ReviewCase