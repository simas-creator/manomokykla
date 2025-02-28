import { Schema, model, models } from 'mongoose';

const reportSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    school: {
        type: Number,
        required: true
    },
    teacher: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true });

const TeacherReport = models.TeacherReport || model('TeacherReport', reportSchema);
export default TeacherReport;