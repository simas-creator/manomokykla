import { Schema, model, models } from 'mongoose';

const TeacherSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  subject: { type: String, required: true },
  school: { type: String, required: true},
  comment: { type: String, required: false},
  imageUrl: { type: String, required: false},
  rating: { type: Number, required: true },
});
const Teacher = models.Teacher || model('Teacher', TeacherSchema);

export default Teacher;
