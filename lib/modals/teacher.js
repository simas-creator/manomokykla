import { Schema, model, models } from 'mongoose';

const TeacherSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  subject: { type: String, required: true },
  imageUrl: { type: String, required: false},
  rating: { type: Number, required: true },
  n: {type: Number, required: true},
  m: {type: Number, required: true},
  }, { timestamps: true});
const Teacher = models.Teacher || model('Teacher', TeacherSchema);

export default Teacher;
