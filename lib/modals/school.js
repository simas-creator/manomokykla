import { Schema, model, models } from 'mongoose';

const schoolSchema = new Schema({
    name: { type: String, required: true },
    apskritis: { type: String, required: true },
    type: { 
        type: String,
        required: true, 
    },
    imgUrl: {
        type: String,
        required: true,
    },
    n: {
        type: Number,
        required: false,
    },
    rating: {
        type: Number,
        required: true,
    },
    user: {type: String, required: true},
    status: {type: String, default: "pending", required: true}
}, { timestamps: true });

const School = models.School || model('School', schoolSchema);

export default School; 