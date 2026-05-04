import { assets } from "../assets/assets/assets";

const Footer = () => {
  return (
    <div className="bg-gray-50 mt-20 px-6 md:px-10 pt-12 pb-6">

  {/* Top Section */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-gray-700">

    {/* Logo + About */}
    <div>
      <img className="mb-4 w-36" src={assets.Doc_logo} alt="logo" />
      <p className="text-sm leading-6 text-gray-600">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
        repellendus doloribus qui, voluptate rerum sed aliquam
        necessitatibus accusamus a consequuntur.
      </p>
    </div>

    {/* Company Links */}
    <div>
      <p className="text-lg font-semibold mb-4 text-gray-800">Company</p>
      <ul className="flex flex-col gap-2 text-sm">
        <li className="hover:text-blue-600 cursor-pointer">Home</li>
        <li className="hover:text-blue-600 cursor-pointer">About Us</li>
        <li className="hover:text-blue-600 cursor-pointer">Contact Us</li>
        <li className="hover:text-blue-600 cursor-pointer">Privacy Policy</li>
      </ul>
    </div>

    {/* Contact */}
    <div>
      <p className="text-lg font-semibold mb-4 text-gray-800">
        Get In Touch
      </p>
      <ul className="flex flex-col gap-2 text-sm">
        <li>📞 +91 55786767767</li>
        <li>📧 support@healthcare.com</li>
      </ul>
    </div>

  </div>

  {/* Divider */}
  <div className="mt-10 border-t pt-5 text-center text-sm text-gray-500">
    © {new Date().getFullYear()} Healthcare System. All rights reserved.
  </div>

</div>
  );
};

export default Footer;
