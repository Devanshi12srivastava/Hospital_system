import doctorModel from "../models/doctorModel.js";

// 🧠 normalize text
const clean = (msg) => msg.toLowerCase();

// 👨‍⚕️ extract doctor name
const extractName = (msg) => {
  const match = msg.match(/dr\.?\s?[a-zA-Z]+/i);
return match
  ? match[0]
      .replace("dr", "")
      .replace(".", "")
      .trim()
  : null;
};

// 🏥 speciality list
const getSpecialities = async () => {
  const doctors = await doctorModel.find({}, "speciality");

  return [
    ...new Set(
      doctors.map((d) =>
        d.speciality.toLowerCase()
      )
    ),
  ];
};

// // 🔍 extract speciality
// const extractSpeciality = (msg) => {
//   return SPECIALITIES.find((s) => msg.includes(s)) || null;
// };
const extractSpeciality = async (msg) => {
  const SPECIALITIES = await getSpecialities();

  return (
    SPECIALITIES.find((s) =>
      msg.includes(s)
    ) || null
  );
};

// 💰 fee range detection
const extractFeeFilter = (msg) => {
  if (msg.includes("cheap") || msg.includes("low fee")) return "low";
  if (msg.includes("expensive") || msg.includes("high fee")) return "high";
  return null;
};

// 🧠 experience filter
const extractExpFilter = (msg) => {
  if (msg.includes("experienced") || msg.includes("senior")) return "high";
  if (msg.includes("fresher") || msg.includes("junior")) return "low";
  return null;
};

// 📍 city / address keyword
const extractLocation = (msg) => {
  const cities = ["lucknow", "delhi", "mumbai", "noida"];
  return cities.find((c) => msg.includes(c)) || null;
};

// 🚀 MAIN FUNCTION
export const searchDoctors = async (msg) => {
  msg = clean(msg);

  const name = extractName(msg);
  const speciality = await extractSpeciality(msg);
  const feeType = extractFeeFilter(msg);
  const expType = extractExpFilter(msg);
  const location = extractLocation(msg);

  let filter = {};

  // 👨‍⚕️ NAME filter
  if (name) {
    filter.name = { $regex: name, $options: "i" };
  }

  // 🏥 SPECIALITY filter
  if (speciality) {
    filter.speciality = { $regex: speciality, $options: "i" };
  }

  // 📍 LOCATION filter (address match)
  if (location) {
    filter.address = { $regex: location, $options: "i" };
  }

  // 💰 FEES filter (range logic)
  if (feeType === "low") {
    filter.fees = { $lte: 500 };
  }
  if (feeType === "high") {
    filter.fees = { $gte: 800 };
  }

  // 🧠 EXPERIENCE filter
  if (expType === "high") {
    filter.experience = { $gte: 8 };
  }
  if (expType === "low") {
    filter.experience = { $lte: 5 };
  }

  return await doctorModel.find(filter);
};