import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";
import { Button } from "flowbite-react";

export default function CategoryCarousel() {
  const catagory = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Graphic Designer",
    "MERN Stack Developer",
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 p-4">
        <Carousel className="w-full max-w-xl mx-auto my-16">
          <CarouselContent className="-ml-1">
            {catagory.map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Button
                  onClick={() => handleSearch(item)}
                  className="px-3 cursor-pointer bg-gradient-to-r from-rose-500 via-rose-600 to-rose-700 text-white hover:bg-gradient-to-br focus:ring-transparent dark:focus:ring-rose-800"
                >
                  {item}
                </Button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
}
