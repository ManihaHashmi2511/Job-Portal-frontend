import Navbar from "../components/shared/Navbar";
import React, { useEffect } from "react";
import "./style2.css";
import FooterComponent from "@/components/shared/FooterComponent";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { store } from "@/redux/Store";
import LatestJobs from "./LatestJobs";
import { useNavigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import { motion } from "framer-motion";

export default function Home() {
   useGetAllJobs();

   const {user} = useSelector(store => store.auth);
   const navigate = useNavigate();
   useEffect(() =>{
    if(user?.role === "recruiter"){
      navigate("/admin/companies");
    }
   }, [])

   console.log("Home page rendered", useGetAllJobs());

   const {allJobs} = useSelector(store => store.job);

  const catagory = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Graphic Designer",
    "MERN Developer",
  ];

 const randomJobs = [1,2,3,4,5,6,7,8];

  return (
    <div>
      <Navbar />

      {/*  ------Hero Section------    */}

     <HeroSection/>

      {/*  ------Hero Section Ends Here------    */}

      {/*  ------Latest Jobs Section------    */}

      <section className="pt-10 pb-10">
        <div>
          <h1 className="text-3xl py-4 font-bold text-center">
            <span className="text-rose-500">Latest & Top</span> Job Openings
          </h1>
        </div>
        <div className="flex flex-wrap justify-center gap-2 p-4">
         {
          allJobs.length !== 0 ? allJobs.slice(0,6).map((job) => <motion.div  key={job._id} initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}><LatestJobs job={job} /></motion.div> ) :   <span>No Jobs Found</span>
         }
        </div>
       
      </section>

      {/*  ------Latest Jobs Section Ends Here------   */}


    {/*  Footer Section Starts Here  */}
      <FooterComponent />
    </div>
  );
}
