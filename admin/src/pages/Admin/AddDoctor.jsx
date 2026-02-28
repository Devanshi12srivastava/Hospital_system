import { useState } from "react";
import { assets } from "../../assets/assets_admin/assets";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [names, setName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 year");
  const [fees, setFees] = useState("");
  const [About, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General Physician");
  const [degree, setdegree] = useState("");
  const [address, setAddress] = useState("");
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

      //console formData
      formData.forEach((value, key) => {
        console.log(` formdata is ${key}:${value}`);
      });

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        {
          headers: {
            admintoken: adminToken,
          },
        },
      );
      console.log("Full Backend Response:", data);
      if (data.success) {
        toast.success(data.message);
        console.log("data", data);

        setName("");
        setEmail("");
        setPassword("");
        setExperience("");
        setFees("");
        setAbout("");
        setSpeciality("");
        setDegree("");
        setAddress("");
        setDocImg(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Frontend Error:", error);
      alert("eror")
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler} className="m-5 w-full">
        <p className="font-medium text-lg mb-3">Add Doctor</p>
        <div className="bg-white px-8 py-8 border border-white rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll ">
          <div className="flex items-center gap-4 mb-8 text-gray-600">
            <label htmlFor="doc-img">
              <img
                className="w-16 bg-gray-200 rounded-full cursor-pointer"
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
            <p>Upload Picture</p>
          </div>
          <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
            <div className="w-full lg:flex-1 flex flex-col gap-4">
              <div className="flex-1 flex flex-col gap-1">
                <p>Doctor Name</p>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={names}
                  className=" border border-gray-400 rounded-xl px-3 py-1"
                  type="text"
                  placeholder="Name"
                  required
                />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <p>Doctor email</p>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className=" border border-gray-400 rounded-xl px-3 py-1"
                  type="email"
                  placeholder="email"
                  required
                />
              </div>

              <div className="flex-1 flex flex-col gap-1">
                <p>Doctor password</p>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className=" border border-gray-400 rounded-xl px-3 py-1"
                  type="password"
                  placeholder="password"
                  required
                />
              </div>

              <div className="flex-1 flex flex-col gap-1">
                <p>Doctor Experience</p>
                <select
                  onChange={(e) => setExperience(e.target.value)}
                  value={experience}
                  className=" border border-gray-400 rounded-xl px-3 py-1"
                  name=""
                  id=""
                >
                  <option value="" disabled>
                    {" "}
                    select
                  </option>
                  <option value="1 year">1 year</option>
                  <option value="2 year">2 year</option>
                  <option value="3 year">3 year</option>
                  <option value="4 year">4 year</option>
                  <option value="5 year">5 year</option>
                </select>
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <p>Doctor Fees</p>
                <input
                  onChange={(e) => setFees(e.target.value)}
                  value={fees}
                  className=" border border-gray-400 rounded-xl px-3 py-1"
                  type="text"
                  placeholder="Fess. Rs"
                  required
                />
              </div>

              <div className="w-full lg:flex-1 flex flex-col gap-4">
                <div className="flex-1 flex flex-col gap-1">
                  <p>Speciality</p>
                  <select
                    onChange={(e) => setSpeciality(e.target.value)}
                    value={speciality}
                    className=" border border-gray-400 rounded-xl px-3 py-1"
                  >
                    <option value="" hidden>
                      Select
                    </option>
                    <option value="General Physician">General Physician</option>
                    <option value="Gynecologist">Gynecologist</option>
                    <option value="Dermatologist">Dermatologist</option>
                    <option value="Pediatrician">Pediatrician</option>
                    <option value="Neurologist">Neurologist</option>
                    <option value="Gastroenterologist">
                      Gastroenterologist
                    </option>
                  </select>
                </div>

                <div className="flex-1 flex flex-col gap-1">
                  <p>Education</p>
                  <input
                    onChange={(e) => setdegree(e.target.value)}
                    value={degree}
                    className=" border border-gray-400 rounded-xl px-3 py-1"
                    type="text"
                    placeholder="education"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <p>Address</p>
                  <input
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    className=" border border-gray-400 rounded-xl px-3 py-1"
                    type="text"
                    placeholder="Address"
                  />
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p className="mt-4 mb-2 ">About Me</p>
              <textarea
                onChange={(e) => setAbout(e.target.value)}
                value={About}
                className="border border-gray-400 rounded-xl py-1 w-full px-4 pt-2"
                placeholder="something"
                rows={5}
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-400 text-white px-3 py-2 mt-4 rounded-2xl cursor-pointer"
          >
            Add Doctor
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;
