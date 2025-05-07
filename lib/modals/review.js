import { model, models, Schema } from "mongoose";


const reviewSchema = new Schema({
    user: {type: String, required: true},
    teacher_id: {type: String, required: true},
    status: {type: String, default: "pending", required: true},
    rec: {type: Boolean, required: true},
    criterion1: {type: Number, required: true},
    criterion2: {type: Number, required: true},
    criterion3: {type: Number, required: true},
    comment: {type: String, required: false},
    anonymous: {type: Boolean, required: true},
}, { timestamps: true })

const Review = models.Review || model('Review', reviewSchema)
export default Review;