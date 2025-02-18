import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // Icons for mobile menu
import image from "../image/tame-logo.png";

const NavigationHeader = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false); // Close menu after clicking
    }
  };

  return (
    <header className="bg-[#0a1929] p-4 shadow-md border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Combined Logo and Title */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => scrollToSection("categories")}
        >
          <img src={image} alt="Logo" className="w-8 h-8" />
          <h1 className="text-[#00e5ff] text-2xl font-bold font-mono">
            Tamrat
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            {["categories", "posts", "all-posts", "footer"].map((id, index) => (
              <li key={index}>
                <button
                  onClick={() => scrollToSection(id)}
                  className="text-white hover:text-[#00e5ff]"
                >
                  {id === "categories"
                    ? "Topics"
                    : id === "posts"
                    ? "Top Post"
                    : id === "all-posts"
                    ? "Recent Post"
                    : "Contact"}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => scrollToSection("footer")}
                className="text-white bg-teal-500 px-3 py-1 rounded-lg hover:bg-teal-600"
              >
                Subscribe
              </button>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-[#0a1929] p-4 border-t border-white/20">
          <ul className="flex flex-col space-y-4 text-center">
            {["categories", "posts", "all-posts", "footer"].map((id, index) => (
              <li key={index}>
                <button
                  onClick={() => scrollToSection(id)}
                  className="text-white hover:text-[#00e5ff] w-full"
                >
                  {id === "categories"
                    ? "Topics"
                    : id === "posts"
                    ? "Top Post"
                    : id === "all-posts"
                    ? "Recent Post"
                    : "Contact"}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => scrollToSection("footer")}
                className="text-white bg-teal-500 px-3 py-1 rounded-lg hover:bg-teal-600 w-full"
              >
                Subscribe
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default NavigationHeader;
