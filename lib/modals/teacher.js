import { Schema, model, models } from 'mongoose';

const TeacherSchema = new Schema({
  name: { type: String, required: true },
  school_id: {type: Schema.Types.ObjectId, ref: 'School'},
  surname: { type: String, required: true },
  subject: { type: String, required: true },
  imageUrl: { type: String, required: false},
  reviews: { type: Array, required: false},
  rating: { type: Number, required: false },
  user: {type: String, required: true},
  status: {type: String, default: "pending", required: true},
}, { timestamps: true});
const Teacher = models.Teacher || model('Teacher', TeacherSchema);

export default Teacher;
