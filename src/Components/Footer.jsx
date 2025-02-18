import React from "react";
import Subscribe from "./Subscribe";

const Footer = () => {
  return (
    <footer className="rounded-md bg-[#0a1929] text-white py-8">
      <div className="  max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-bold mb-3">Tamrat</h3>
          <p className="text-gray-400">
            When an unknown proto sans took a galley and scrambled it to make a
            specimen book not only five centuries.
          </p>
          <div className="mt-4">
            <h4 className="font-bold">Address</h4>
            <p>Ethiopia</p>
            <p>Addis Ababa </p>
          </div>
        </div>

        {/* Categories Section */}
        <div>
          <h3 className="text-xl font-bold mb-3">Contact</h3>
          <ul className="grid grid-cols-1 gap-2 text-gray-400">
            {/* LinkedIn Contact */}
            <li>
              <a
                href="https://www.linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-[#00e5ff]"
              >
                <i className="fab fa-linkedin text-lg"></i>
                <span>LinkedIn</span>
              </a>
            </li>

            {/* Email Contact */}
            <li>
              <a
                href="mailto:your-email@example.com"
                className="flex items-center space-x-2 hover:text-[#00e5ff]"
              >
                <i className="fas fa-envelope text-lg"></i>
                <span>Email</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div>
          <h3 className="text-xl font-bold mb-3">Newsletter</h3>
          <p className="text-gray-400 mb-3">
            Sign up to be first to receive the latest stories inspiring us, case
            studies, and industry news.
          </p>
          {/* Include your existing Subscribe component */}
          <Subscribe />
        </div>
      </div>
      <div className="text-center mt-8 text-gray-500">
        © 2025 Tamrat. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
