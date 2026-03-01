import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
    const navigate=useNavigate()
    const {doctors}=useContext(AppContext)

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-800 py-12 px-10">
      <h1 className="text-blue-600 font-medium text-3xl items-center">Your Top Doctors</h1>
      <p className="sm:w-1/3 text-center text-lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo enim
        reprehenderit eius expedita ipsa laudantium aliquid consequatur ratione
        laboriosam
      </p>
      <div className="w-full  grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 pt-5 gap-y-6 px-4 sm:px-0">
        {doctors.slice(0, 4).map((item, idx) => (
          <div onClick={()=>navigate(`/appointment/${item._id}`)} className="border border-blue-200 my-10 rounded-2xl overflow-hidden cursor-pointer" key={idx}>
            <img className="bg-[#e7d3dd]" src={item.image} alt="" />
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-center">
                <p className="w-4 h-4 bg-green-300 rounded-full"></p><p>Available</p>
              </div>
              <p className="text-gray-900 text-lg font-medium">{item.name}</p>
              <p className="text-gray-800 text-sm font-medium">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="w-30 bg-blue-400 text-lg font-medium text-white rounded-full cursor-pointer py-1" onClick={()=>{navigate('/doctors'); scrollTo(0,  0)}}>More</button>
    </div>
  );
};

export default TopDoctors;
