import { useState } from "react";
import { assets } from "../../assets/assets_admin/assets";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import {addDoctor} from "../../api/addDoctorapi";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [names, setName] = useState("");
const[error,setError]=useState(null);
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

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("Admin Token:", adminToken);
    console.log("Form submitted");
    try {
      
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

      const  response  = await addDoctor(backendUrl,formData,adminToken);
      const data=response.data
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
    setError(error)
    }
  };

  return (
   <div className="p-6 bg-gray-100 min-h-screen">
  <form onSubmit={onSubmitHandler} className="w-full max-w-5xl mx-auto">
    
    <p className="font-semibold text-2xl mb-5 text-gray-700">
      Add Doctor
    </p>

    <div className="bg-white p-8 rounded-2xl shadow-md border max-h-[85vh] overflow-y-auto">

      {/* Upload Section */}
      <div className="flex items-center gap-5 mb-8">
        <label htmlFor="doc-img" className="cursor-pointer">
          <img
            className="w-20 h-20 rounded-full object-cover border-2 border-dashed border-gray-300 hover:opacity-80 transition"
            src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
            alt=""
          />
        </label>
        <input
          onChange={(e) => setDocImg(e.target.files[0])}
          type="file"
          id="doc-img"
          hidden
        />
        <p className="text-gray-500 text-sm">Upload Doctor Picture</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-gray-600">

        {/* LEFT SIDE */}
        <div className="flex flex-col gap-5">

          <div>
            <p className="mb-1">Doctor Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={names}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Enter name"
              required
            />
          </div>

          <div>
            <p className="mb-1">Doctor Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="email"
              placeholder="Enter email"
              required
            />
          </div>

          <div>
            <p className="mb-1">Doctor Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="password"
              placeholder="Enter password"
              required
            />
          </div>

          <div>
            <p className="mb-1">Experience</p>
            <select
              onChange={(e) => setExperience(e.target.value)}
              value={experience}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="" disabled>Select</option>
              <option value="1 year">1 year</option>
              <option value="2 year">2 year</option>
              <option value="3 year">3 year</option>
              <option value="4 year">4 year</option>
              <option value="5 year">5 year</option>
            </select>
          </div>

          <div>
            <p className="mb-1">Fees</p>
            <input
              onChange={(e) => setFees(e.target.value)}
              value={fees}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Fees (₹)"
              required
            />
          </div>

          <div>
            <p className="mb-1">Speciality</p>
            <select
              onChange={(e) => setSpeciality(e.target.value)}
              value={speciality}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="" hidden>Select</option>
              <option value="General Physician">General Physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatrician">Pediatrician</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
            </select>
          </div>

          <div>
            <p className="mb-1">Education</p>
            <input
              onChange={(e) => setdegree(e.target.value)}
              value={degree}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Education"
            />
          </div>

          <div>
            <p className="mb-1">Address</p>
            <input
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Address"
            />
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div>
          <p className="mb-2">About Doctor</p>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={About}
            rows={8}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Write about doctor..."
          ></textarea>
        </div>

      </div>

      {/* BUTTON */}
      <button
        type="submit"
        className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-medium transition"
      >
        Add Doctor
      </button>

    </div>
  </form>
</div>
  );
};

export default AddDoctor;
