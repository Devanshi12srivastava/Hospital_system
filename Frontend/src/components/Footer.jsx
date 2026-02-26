import { assets } from "../assets/assets/assets";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14my-10 mt-40 text-lg">
        <div>
          <img className="mb-5 w-40" src={assets.logo} alt="" />
          <p className="mr-10 w-full md:w-2/3 text-gray-700 leading-6">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas
            repellendus doloribus qui, voluptate rerum sed aliquam
            necessitatibus accusamus a consequuntur, incidunt quaerat, sapiente
            dolores minus omnis! Iure temporibus porro eaque
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">company</p>
          <ul className="flex flex-col gap-2 text-gray-700">
            <li>Home</li>
            <li>About us</li>
            <li>Contact Us</li>
            <li>Policy</li>
          </ul>
        </div>
        <div>
          <h1 className="text-xl font-medium mb-5">Get In Touch</h1>
          <ul className="flex flex-col gap-2 text-gray-700">
            <li>+91 55786767767</li>
            <li>ertfgafg@g.com</li>
          </ul>
        </div>
      </div>
      <div></div>
      <div className="mt-12">
        <hr />
        <p className="py-5 text-sm text-center">Copyright</p>
      </div>
    </div>
  );
};

export default Footer;
