import { useContext, useEffect, useState } from "react";
import { changeAvailabilty, doctorList } from "../../api/DoctorList";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";

const DoctorsList = () => {
  const { backendUrl, adminToken } = useContext(AdminContext);

  const [doctorData, setDoctorData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
const[available,setAvailable]=useState(true);

  const allDoctorData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await doctorList(backendUrl, adminToken);
      const data = response.data;
      setDoctorData(data.doctors);
      console.log(data);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (adminToken) {
      allDoctorData();
    }
  }, [adminToken]);

   const changeAvailble=async(docId)=>{
    try{
    const response = await changeAvailabilty(backendUrl,docId,adminToken);
    const data=response.data
    if(data.success){
    // setAvailable(data)
    toast.success("success")
    allDoctorData()
    }else{
      toast.error(data.message)
    }
    console.log("change",data)
    }
    catch(err){
      toast.error(err.message)
      console.log(err.message)
    }
   }
  return (
    <div>
      <div className="m-5 max-h-[90vh] overflow-y-scroll">
        <h1 className="text-lg font-medium">All Doctors</h1>
        <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
          {doctorData?.map((item, idx) => (
            <div
              className="border border-blue-200 rounded-xl max-w-56 overflow-hidden cursor-pointer"
              key={idx}
            >
              <img
                className="bg-blue-50 group-hover:bg-blue-600 transition-all duration-500"
                src={item.image}
                alt=""
              />
              <div className="p-4">
                <p className="text-neutral-800 text-lg font-medium">
                  {item.name}
                </p>
                <p className="text-zinc-600 text-sm">{item.speciality}</p>
                <div className="mt-2 flex items-center gap-1 text-sm">
                  <input
                    type="checkbox"
                    checked={item.available}
                    onChange={() => changeAvailble(item._id)}
                  />
                  <p>Available</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorsList;
