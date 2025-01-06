import  mongoose, { Schema, model } from  "mongoose";


const UserSchema = new Schema({
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    last: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);
const User  =  mongoose.models?.User  ||  model('User', UserSchema);
export default User;