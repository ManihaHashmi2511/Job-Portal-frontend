import Navbar2 from "@/components/shared/Navbar2";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import { useDispatch } from "react-redux";
import AdminJobTable from "./AdminJobTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";

export default function AdminJobs() {
  useGetAllAdminJobs();
  const [input, setInput] =  useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() =>{
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <>
      <Navbar2 />
      <div className="max-w-5xl mx-auto mt-16 p-5">
        <div className="flex items-center justify-between">
          <input
            className="block w-[30%] border focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50 border-teal-500 bg-[#fff] text-gray-900 placeholder-gray-500 focus:border-teal-600 focus:ring-teal-500  p-2.5 text-sm rounded-lg"
            type="text"
            onChange={(e) => setInput(e.target.value)}
            placeholder="Filter by name or role."
          />
          <Button onClick={() => navigate("/admin/jobs/create")} className="bg-teal-600 text-white hover:bg-teal-700 focus:ring-teal-100 dark:bg-teal-500 dark:hover:bg-teal-600 dark:focus:ring-teal-600 cursor-pointer">
            Post New Job
          </Button>
        </div>
        <AdminJobTable/>
      </div>
    </>
  );
}
