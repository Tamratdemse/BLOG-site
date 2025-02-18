"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config/config";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState("left");

  useEffect(() => {
    axios
      .get(`${BASE_URL}/get_category`)
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  console.log(categories);

  const nextCategories = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSlideDirection("left");
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex + 3 >= categories.length ? 0 : prevIndex + 3
      );
      setIsTransitioning(false);
    }, 300); // Match this with the CSS transition duration
  };

  const prevCategories = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSlideDirection("right");
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex - 3 < 0 ? Math.max(categories.length - 3, 0) : prevIndex - 3
      );
      setIsTransitioning(false);
    }, 300); // Match this with the CSS transition duration
  };

  return (
    <div className="w-full bg-[#0a1929] text-white  rounded-md  p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-3 text-[#00e5ff]">
              Hot topics
            </h2>
            <p className="text-gray-400">
              Don't miss out on the latest news about Travel tips, Hotels
              review, Food guide...
            </p>
            <div className="flex mt-4">
              <button
                onClick={prevCategories}
                className="mr-2 p-2 rounded-full bg-[#00e5ff]/20 text-[#00e5ff] hover:bg-[#00e5ff]/30 text-2xl leading-none"
              >
                &lsaquo;
              </button>
              <button
                onClick={nextCategories}
                className="p-2 rounded-full bg-[#00e5ff]/20 text-[#00e5ff] hover:bg-[#00e5ff]/30 text-2xl leading-none"
              >
                &rsaquo;
              </button>
            </div>
          </div>

          <div className="md:w-3/4 overflow-hidden">
            <div
              className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-transform duration-300 ease-in-out ${
                isTransitioning
                  ? slideDirection === "left"
                    ? "-translate-x-full"
                    : "translate-x-full"
                  : "translate-x-0"
              }`}
            >
              {categories
                .slice(currentIndex, currentIndex + 3)
                .map((category) => (
                  <div
                    key={category.id}
                    className="group relative overflow-hidden rounded-lg aspect-[4/3] bg-gradient-to-b from-transparent to-black/60"
                  >
                    <img
                      src={
                        category.photo
                          ? category.photo
                          : "https://v0.dev/placeholder.svg"
                      }
                      alt={category.category_name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="text-2xl font-semibold text-white mb-2">
                        {category.category_name}
                      </h3>
                      <p className="text-[#00e5ff]">
                        {category.post_count || "0"} Articles
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
