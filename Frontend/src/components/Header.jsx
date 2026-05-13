import React from 'react'
import { assets } from '../assets/assets/assets'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
   <section
  className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: `url(${assets.docBgImg})`,
  }}
>
  {/* OVERLAY */}
  <div className="absolute inset-0 bg-white/70"></div>

  {/* CONTENT */}
  <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 py-20">

    <div className="w-full md:w-1/2">

      <h1 className="text-[42px] md:text-[68px] leading-[1.1] font-bold text-blue-600 font-serif">
        Making Health <br />
        Care Better Together
      </h1>

      <p className="mt-6 text-gray-600 text-[15px] leading-7 max-w-lg">
        Also you dry creeping beast multiply fourth abundantly our itself
        signs bring our. Won form living. Whose dry you seasons divide
        given gathering great in whose you'll greater let living form beast.
      </p>

      {/* BUTTONS */}
      <div className="flex items-center gap-4 mt-8">

        <Link to="/doctors"><button className="bg-blue-600 hover:bg-blue-700 transition text-white px-7 py-4 text-sm font-medium shadow-lg cursor-pointer">
          Make An Appointment
        </button></Link>

        <button className="border border-gray-300 hover:border-blue-600 hover:text-blue-600 transition px-7 py-4 text-sm font-medium bg-white cursor-pointer">
          Explore
        </button>

      </div>
    </div>

  </div>
</section>
  );
};

export default Header;


