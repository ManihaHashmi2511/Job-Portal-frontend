import { Button } from "flowbite-react";
import "./style2.css";
import { Search } from "lucide-react";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import CategoryCarousel from "./CategoryCarousel";

export default function HeroSection() {
  const [query, setQuey] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };
  return (
    <>
      <section className="bg-section">
        <div className="bga">
          <div className="text-center">
            <div className="mt-20 mb-9">
              <h1 className="text-4xl font-bold text-white">
                Search, Apply & <br /> Get Your
                <span className="text-rose-500"> Dream Job</span>
              </h1>
              <p className="text-gray-200 mt-4 w-[50%] mx-auto">
                Find the best job opportunities that match your skills and
                interests. Explore a wide range of job listings and take the
                next step in your career.
              </p>
            </div>
            <div className="flex w-[40%] items-center mt-10  mx-auto">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuey(e.target.value)}
                placeholder="Search for jobs..."
                className="placeholder:text-white focus:outline-none text-white border-none rounded-l-full shadow-sm shadow-gray-300 py-2 px-3 w-full"
              />
              <Button
                onClick={handleSearch}
                className="bg-rose-500 hover:bg-rose-600 focus:ring-transparent text-white rounded-r-full shadow-sm shadow-gray-300 cursor-pointer "
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/*  ------Category Carousel------   */}
          <CategoryCarousel />
        </div>
      </section>
    </>
  );
}
