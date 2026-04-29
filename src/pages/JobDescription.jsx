import Navbar2 from "@/components/shared/Navbar2";
import { setSingleJob } from "@/redux/jobSlice";
import { store } from "@/redux/Store";
import axios from "axios";
import { Badge, Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiCash, HiClock, HiUser } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import API_BASE_URL from "@/api/config";

export default function JobDescription({ job }) {
  const params = useParams();
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isInitiallyApplied =
    singleJob?.application?.some((app) => app.applicants?._id === user?._id) ||
    false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  // Update isApplied state if singleJob or user changes
  const jobId = params.id;
  const dispatch = useDispatch();
  useEffect(() => {
    // Function to fetch all jobs from the backend
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/api/jobs/get/${jobId}`,
          { withCredentials: true }
        );
        if (res.status === 200) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.application.some(
              (application) => application.applicants._id === user?._id
            )
          );
        }
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  const applyJobHandler = async () => {
    if (!user) {
      toast.error("Please login to apply for jobs");
      return;
    }

    setIsApplied(true); // Disable button immediately

    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/applications/apply/${jobId}`,
        {},
        { withCredentials: true }
      );
      console.log(res.data);
      if (res.status === 200) {
        // Refetch the job data to update the state properly
        const updatedJobRes = await axios.get(
          `${API_BASE_URL}/api/jobs/get/${jobId}`,
          { withCredentials: true }
        );
        if (updatedJobRes.status === 200) {
          dispatch(setSingleJob(updatedJobRes.data.job));
        }

        toast.success(res.data.message || "Applied Successfully");
      }
    } catch (error) {
      console.error("Error applying for job:", error);
      if (
        error.response?.status === 400 &&
        error.response?.data?.message === "You have applied for this job"
      ) {
        toast.error(error.response.data.message);
      } else {
        setIsApplied(false); // Re-enable button on other errors
        if (error.response?.data?.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Error applying for job. Please try again.");
        }
      }
    }
  };

  return (
    <section className="">
     <Navbar2/>
      <div className="max-w-6xl mx-auto mt-10 p-3.5 shadow-lg border border-gray-200 rounded-2xl  bg-white">
        <div className="flex items-center justify-between p-5">
          <div>
            <h1 className="text-2xl font-bold text-rose-600">
              {singleJob?.title}
            </h1>
            {/* <p className="text-gray-600 px-5 w-3/4 py-3">{singleJob?.description}</p> */}
            <div className="flex items-center gap-2.5 mt-8">
              <Badge color="gray" icon={HiClock}>
                {singleJob?.jobType}
              </Badge>
              <Badge color="pink" icon={HiUser}>
                {singleJob?.position} Position
              </Badge>
              <Badge color="indigo" icon={HiCash}>
                {singleJob?.salary} PKR
              </Badge>
            </div>
          </div>
          <div>
            <Button
              onClick={isApplied ? null : applyJobHandler}
              className={`${
                isApplied
                  ? "cursor-not-allowed opacity-50 bg-rose-500 hover:bg-rose-500"
                  : " bg-gradient-to-r from-rose-500 via-rose-600 to-rose-700 text-white hover:bg-gradient-to-br focus:ring-white cursor-pointer"
              }`}
            >
              {isApplied ? "Already Applied " : "Apply Now"}
            </Button>
          </div>
        </div>
        <div className="p-4">
          <h1 className="font-bold text-xl my-2">Job Description</h1>
          <p className="text-gray-700 w-3/4 mb-5">{singleJob?.description}</p>
          <div>
            <h1 className="font-bold my-1.5 ">
              Role:
              <span className="font-normal pl-4 ">{singleJob?.title}</span>
            </h1>
            <h1 className="font-bold my-1.5">
              Location:{" "}
              <span className="font-normal pl-4 ">{singleJob?.location}</span>
            </h1>
            <h1 className="font-bold my-1.5">
              Job Type:{" "}
              <span className="font-normal pl-4 ">{singleJob?.jobType}</span>
            </h1>
            <h1 className="font-bold my-1.5">
              Salary:{" "}
              <span className="font-normal pl-4 ">{singleJob?.salary} PKR</span>
            </h1>
            <h1 className="font-bold my-1.5">
              Experience:{" "}
              <span className="font-normal pl-4 ">{singleJob?.experience}</span>
            </h1>
            <h1 className="font-bold my-1.5">
              Posted Date:{" "}
              <span className="font-normal pl-4 ">
                {singleJob?.createdAt.split("T")[0]}
              </span>
            </h1>
            <h1 className="font-bold my-1.5">
              Total Applicants:{" "}
              <span className="font-normal pl-4 ">
                {singleJob?.application?.length || "0"}
              </span>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
