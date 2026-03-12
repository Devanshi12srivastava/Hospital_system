import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
{
  name: { type: String, required: true },

  phone: { type: String,default:null },

  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },

  password: { type: String, required: true },

  image: { type: String, default: null },

  dob: { type: Date, default: null },

  address: { type: String, default: null }

},
{ returnDocument: "after" }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
