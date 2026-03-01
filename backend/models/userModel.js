import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: Number},
  email: { type: String,default:"user", unique: true },
  password: { type: String, required: true },
  image: { type: String,default: null
},
  dob: { type: Date,default: null
},
  address: { type: String,default: null
 },
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
