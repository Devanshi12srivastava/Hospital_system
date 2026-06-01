import React from 'react'
import { assets } from '../assets/assets/assets'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  
  return (
 <section
  className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat overflow-hidden mt-10"
  style={{
    backgroundImage: `url(${assets.docBgImg})`,
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-white/80"></div>

  {/* Content */}
  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-16 py-14 sm:py-16 md:py-24 flex items-center min-h-screen">

    <div className="w-full md:w-1/2 text-center md:text-left">

      {/* Heading */}
      <h1 className="text-[24px] xs:text-[28px] sm:text-[38px] md:text-[58px] leading-[1.2] md:leading-[1.1] font-bold text-blue-600 font-serif wrap-break-word">
        Book <span className='text-blue-800'>Your Doctor</span>
        <br />
        Appointment Anytime {" "}
        <br className="sm:hidden" />
        Anywhere
      </h1>

      {/* Paragraph */}
      <p className="mt-4 sm:mt-6 text-gray-600 text-[13px] sm:text-[15px] leading-6 sm:leading-7 max-w-lg mx-auto md:mx-0 px-1 sm:px-0">
        Also you dry creeping beast multiply fourth abundantly our itself
        signs bring our. Won form living. Whose dry you seasons divide
        given gathering great in whose you'll greater let living form beast.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center md:items-start gap-3 sm:gap-4 mt-7 sm:mt-8 w-full sm:w-auto">

        <Link to="/doctors" className="w-full sm:w-auto">
          <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 transition text-white px-5 sm:px-7 py-3.5 sm:py-4 text-[13px] sm:text-sm font-medium shadow-lg rounded-md cursor-pointer">
            Make An Appointment
          </button>
        </Link>

        <Link to="/about"><button className="w-full sm:w-auto border border-gray-300 hover:border-blue-600 hover:text-blue-600 transition px-5 sm:px-7 py-3.5 sm:py-4 text-[13px] sm:text-sm font-medium bg-white rounded-md cursor-pointer">
          Explore
        </button></Link>

      </div>
    </div>

  </div>
</section>
  );
};

export default Header;


