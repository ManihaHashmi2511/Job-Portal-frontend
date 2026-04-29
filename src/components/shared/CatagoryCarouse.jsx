// import React from "react";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "../ui/carousel";



// export default function CatagoryCarousel() {
//   const catagory = [
//     "Frontend Developer",
//     "Backend Developer",
//     "Full Stack Developer",
//     "Graphic Designer",
//     "MERN Developer",
//   ];

//   return (
//     <section>
//       <div className="flex flex-col items-center justify-center gap-4 p-4">
//         <Carousel className="w-full max-w-xl mx-auto my-16">
//           <CarouselContent className="-ml-1">
//             {catagory.map((item, index) => (
//               <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
//                 <Button className="cursor-pointer bg-gradient-to-r from-rose-400 via-rose-500 to-rose-600 text-white hover:bg-gradient-to-br focus:ring-white dark:focus:ring-rose-800">
//                   {item}
//                 </Button>
//               </CarouselItem>
//             ))}
//           </CarouselContent>
//           <CarouselPrevious />
//           <CarouselNext />
//         </Carousel>
//       </div>
//     </section>
//   );
// }
