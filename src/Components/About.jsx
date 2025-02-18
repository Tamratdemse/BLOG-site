import React from "react";
import image from "../image/IMG_0300.JPG";

const AboutMe = () => {
  return (
    <section
      id="about-me"
      className="bg-[#10243b] py-12 px-6 md:px-12 lg:px-24 border-b border-gray-500"
    >
      <div className="max-w-screen-lg mx-auto ">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-center text-[#00e5ff] mb-8">
          About Me
        </h2>

        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Introduction Text */}
          <div className="flex-1 text-center md:text-left">
            <p className="text-gray-400 text-lg leading-relaxed mb-4">
              Hi there! I'm Tamrat Demse , the voice behind this blog. I’m
              passionate about nature, sport, food and coding sharing stories,
              insights, and ideas with readers like you.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              This blog is my little corner of the internet where I explore
              topics like coding, nature, or food. I hope you’ll find
              inspiration, useful tips, or just a moment of joy while reading my
              posts. Stay a while, and let’s connect!
            </p>
          </div>

          {/* Profile Image */}
          <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden  shadow-lg">
            <img
              src={image}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
