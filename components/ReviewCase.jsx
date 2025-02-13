import StarRating from "./StarRating"
const ReviewCase = ({review}) => {
    const {criterion1, criterion2, criterion3, user, comment, createdAt} = review
    const rating = (criterion1 + criterion2 + criterion3) / 3
  return (
    review.comment ? (
        <div className="mx-10 max-w-64 min-h-20 border-2 border-black rounded-xl">
            <div>
                <StarRating r={rating}/>
            </div>
            {comment}
        </div>

    ) : (
        <div>

            <div className="mx-10 max-w-64 min-h-20 border-2 border-black rounded-xl">
                <StarRating r={rating}/>
            </div>
        
        </div>)
  )
}

export default ReviewCase