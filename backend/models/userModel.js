import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: Number, required: true },
  email: { type: String,default:"user", unique: true },
  password: { type: String, required: true },
  image: { type: String, default: "Not Selected" },
  dob: { type: Number, default: "Not Selected" },
  address: { type: String,default:"PUNE" },
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
