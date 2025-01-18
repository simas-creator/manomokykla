import { Schema, model, models } from 'mongoose';


const schoolSchema = new Schema({
    name: { type: String, required: true },
    apskritis: { type: String, required: true },
    mu: { 
        type: String,
        required: true, 
    },
    imgUrl: {
        type: String,
        required: true,
    }
});

const School = models.School || model('School', schoolSchema);

export default School; 