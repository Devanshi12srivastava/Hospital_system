import React from "react";
import { assets } from "../assets/assets/assets";

const About = () => {
  return (
   <div className="px-6 md:px-10 lg:px-20">

  {/* Heading */}
  <div className="text-center pt-12">
    <p className="text-3xl font-semibold text-gray-800">
      ABOUT <span className="text-blue-600">US</span>
    </p>
  </div>

  {/* About Section */}
  <div className="my-12 flex flex-col md:flex-row gap-10 items-center">

    {/* Image */}
    <img
      className="w-full md:w-1/2 rounded-2xl shadow-md"
      src={assets.about_image}
      alt="about"
    />

    {/* Content */}
    <div className="md:w-1/2 flex flex-col gap-5 text-gray-600 leading-7">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
        officiis ullam eius consequatur tempora quas dolore impedit voluptas.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
        aut voluptatem id voluptatibus cupiditate? Itaque at sed dolores.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
        aperiam, aliquam debitis beatae maxime at impedit.
      </p>
    </div>

  </div>

  {/* Why Choose Us */}
  <div className="text-center mb-10">
    <p className="text-2xl font-semibold text-gray-800">
      Why Choose <span className="text-blue-600">Us</span>
    </p>
  </div>

  {/* Cards */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">

    <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-lg transition">
      <b className="text-lg text-gray-800">Efficiency</b>
      <p className="text-sm text-gray-600 mt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa est
        architecto voluptatum laborum quisquam.
      </p>
    </div>

    <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-lg transition">
      <b className="text-lg text-gray-800">Convenience</b>
      <p className="text-sm text-gray-600 mt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa est
        architecto voluptatum laborum quisquam.
      </p>
    </div>

    <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-lg transition">
      <b className="text-lg text-gray-800">Personalization</b>
      <p className="text-sm text-gray-600 mt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa est
        architecto voluptatum laborum quisquam.
      </p>
    </div>

  </div>

</div>
  );
};

export default About;
