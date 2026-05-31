import { useState } from "react";
import { assets } from "../../assets/assets_admin/assets";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import { addDoctor } from "../../api/addDoctorapi";
import { AppContext } from "../../context/AppContext";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [names, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("");
  const [fees, setFees] = useState("");
  const [About, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [degree, setdegree] = useState("");
  const [address, setAddress] = useState("");
  const [available, setAvailable] = useState(true);

  const { backendUrl, adminToken } = useContext(AdminContext);
  const {error,loading,setError,setLoading } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("Admin Token:", adminToken);
    console.log("Form submitted");
    try {
      setLoading(true)
      setError(false)
      if (!docImg) {
        return toast.error("Image not selected");
      }

      const formData = new FormData();
      formData.append("single", docImg);
      formData.append("name", names);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", About);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append("address", address);
      formData.append("available", available);

      //console formData
      formData.forEach((value, key) => {
        console.log(` formdata is ${key}:${value}`);
      });

      const response = await addDoctor(backendUrl, formData, adminToken);
      const data = response.data;
      console.log("Full Backend Response:", data);
      if (data.success) {
        toast.success(data.message || "sucess");
        console.log("data", data);

        setName("");
        setEmail("");
        setPassword("");
        setExperience("");
        setFees("");
        setAbout("");
        setSpeciality("");
        setdegree("");
        setAddress("");
        setDocImg(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      setError(error);
    }
    finally{
      setLoading(false)
    }
  };

  return (
  <div className="min-h-screen bg-linear-to-br mt-10 px-2 sm:px-4 py-4 sm:py-6 overflow-x-hidden">
  <form onSubmit={onSubmitHandler} className="w-full max-w-7xl mx-auto">

    {/* Heading */}
    <div className="mb-5 sm:mb-8 px-1">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-800 wrap-break-word">
        Add New Doctor
      </h1>

      <p className="text-gray-500 mt-2 text-xs sm:text-sm md:text-base leading-relaxed">
        Fill in the doctor details to create a professional profile.
      </p>
    </div>

    {/* Main Container */}
    <div className="backdrop-blur-xl bg-white/70 border border-white/40 shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden">

      <div className="grid grid-cols-1 xl:grid-cols-3">

        {/* LEFT SECTION */}
        <div className="bg-linear-to-b from-blue-200 to-blue-400 p-5 sm:p-8 flex flex-col items-center justify-center text-white">

          <label
            htmlFor="doc-img"
            className="relative cursor-pointer group"
          >
            <img
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full object-cover border-4 border-white shadow-xl"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt=""
            />

            <div className="absolute inset-0 bg-black/30 rounded-full opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
              <p className="text-xs sm:text-sm font-medium">
                Upload
              </p>
            </div>
          </label>

          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />

          <h2 className="mt-5 text-lg sm:text-2xl font-semibold text-center">
            Doctor Profile
          </h2>

          <p className="text-blue-100 text-center text-xs sm:text-sm mt-2 leading-relaxed max-w-xs">
            Upload profile picture and complete professional information.
          </p>
        </div>

        {/* RIGHT SECTION */}
        <div className="xl:col-span-2 p-3 sm:p-5 md:p-10">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

            {/* Name */}
            <div className="w-full">
              <label className="text-sm font-medium text-gray-700">
                Doctor Name
              </label>

              <input
                onChange={(e) => setName(e.target.value)}
                value={names}
                type="text"
                placeholder="Enter doctor name"
                required
                className="mt-2 w-full min-w-0 bg-white border border-gray-200 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div className="w-full">
              <label className="text-sm font-medium text-gray-700">
                Doctor Email
              </label>

              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Enter email"
                required
                className="mt-2 w-full min-w-0 bg-white border border-gray-200 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div className="w-full">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>

              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Enter password"
                required
                className="mt-2 w-full min-w-0 bg-white border border-gray-200 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Experience */}
            <div className="w-full">
              <label className="text-sm font-medium text-gray-700">
                Experience
              </label>

              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className="mt-2 w-full min-w-0 bg-white border border-gray-200 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Experience</option>
                <option value="3 year">3 year</option>
                <option value="4 year">4 year</option>
                <option value="5 year">5 year</option>
                <option value="8 year">8 year</option>
                <option value="9 year">9 year</option>
                <option value="10 year">10 year</option>
                <option value="12 year">12 year</option>
                <option value="15 year">15 year</option>
                <option value="20 year">20 year</option>
                <option value="26 year">26 year</option>
              </select>
            </div>

            {/* Fees */}
            <div className="w-full">
              <label className="text-sm font-medium text-gray-700">
                Fees
              </label>

              <input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                type="text"
                placeholder="₹ Enter Fees"
                required
                className="mt-2 w-full min-w-0 bg-white border border-gray-200 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Speciality */}
            <div className="w-full">
              <label className="text-sm font-medium text-gray-700">
                Speciality
              </label>

              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                className="mt-2 w-full min-w-0 bg-white border border-gray-200 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Speciality</option>
                <option value="General Physician">General Physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatrician">Pediatrician</option>
              </select>
            </div>

            {/* Education */}
            <div className="w-full">
              <label className="text-sm font-medium text-gray-700">
                Education
              </label>

              <input
                onChange={(e) => setdegree(e.target.value)}
                value={degree}
                type="text"
                placeholder="Education"
                className="mt-2 w-full min-w-0 bg-white border border-gray-200 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Address */}
            <div className="w-full">
              <label className="text-sm font-medium text-gray-700">
                Address
              </label>

              <input
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                type="text"
                placeholder="Address"
                className="mt-2 w-full min-w-0 bg-white border border-gray-200 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* About */}
          <div className="mt-5 sm:mt-6">
            <label className="text-sm font-medium text-gray-700">
              About Doctor
            </label>

            <textarea
              onChange={(e) => setAbout(e.target.value)}
              value={About}
              rows={5}
              placeholder="Write about doctor..."
              className="mt-2 w-full bg-white border border-gray-200 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
          </div>

          {/* Button */}
          <div className="mt-6 sm:mt-8 flex justify-end">
            <button
              type="submit"
              className="w-72  bg-blue-400 hover:shadow-2xl transition-all duration-300 text-white py-3 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base cursor-pointer"
            >
               {loading ? "Adding Doctor..." : "Add Doctor"}
            
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
</div>
  );
};

export default AddDoctor;
