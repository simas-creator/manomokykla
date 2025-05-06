import { Schema, model, models } from 'mongoose';

const reportSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    school: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true });

const SchoolReport = models.SchoolReport || model('SchoolReport', reportSchema);
export default SchoolReport;