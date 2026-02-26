import mongoose from "mongoose";
const connectDB = async () => {
  mongoose.connection.on("connected", () => console.log("db conencted"));
  await mongoose.connect(`${process.env.MONGODB_URI}/hms`);
};
export default connectDB;
