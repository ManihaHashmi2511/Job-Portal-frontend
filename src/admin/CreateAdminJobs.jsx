import Navbar2 from "@/components/shared/Navbar2";
import { store } from "@/redux/Store";
import useGetSingleJob from "@/hooks/useGetSingleJob";
import axios from "axios";
import { Button, Label, Dropdown, DropdownItem } from "flowbite-react";
import { ArrowLeft, Loader2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function CreateAdminJobs() {
  const companyArray = [];
  const navigate = useNavigate();
  const { id } = useParams();
  const [input, setInput] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    companyId: "",
    jobType: "",
    experience: "",
    position: "",
    requirements: "",
  });

  const [loading, setLoading] = useState(false);
  const [selectedCompanyName, setSelectedCompanyName] = useState("");

  const { companies } = useSelector((store) => store.company);
  const { singleJob } = useSelector((store) => store.job);

  useGetSingleJob({ jobId: id });

  useEffect(() => {
    if (singleJob) {
      setInput({
        title: singleJob.title || "",
        description: singleJob.description || "",
        location: singleJob.location || "",
        salary: singleJob.salary || "",
        companyId: singleJob.companyId || "",
        jobType: singleJob.jobType || "",
        experience: singleJob.experience || "",
        position: singleJob.position || "",
        requirements: singleJob.requirements ? singleJob.requirements.join(",") : "",
      });
      const company = companies.find(c => c._id === singleJob.companyId);
      if (company) {
        setSelectedCompanyName(company.name);
      }
    }
  }, [singleJob, companies]);

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany._id });
    setSelectedCompanyName(selectedCompany.name);
  };


  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      let res;
      if (id) {
        res = await axios.put(`http://localhost:8000/api/jobs/update/${id}`, input, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        if (res.status === 200) {
          toast.success(res.data.message || "Job Updated Successfully");
          navigate("/admin/jobs");
        }
      } else {
        res = await axios.post("http://localhost:8000/api/jobs/post-job", input, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        if (res.status === 201) {
          toast.success(res.data.message || "Job Posted Successfully");
          navigate("/admin/jobs");
        }
      }
    } catch (error) {
      console.error("Error details:", error.response?.data || error.message);
      toast.error(id ? "Failed to update job." : "Failed to post a job.");
    } finally {
      setLoading(false);
    }

    console.log(input);
  };

  return (
    <>
      <Navbar2 />
      <div className="flex justify-center items-center w-screen mt-8 mb-10">
        <form
          onSubmit={submitHandler}
          className="max-w-4xl p-5 shadow-sm shadow-gray-300 rounded-2xl border "
        >
          <div
            className="flex items-center my-1 gap-9
           p-6"
          >
            <Button
              onClick={() => navigate("/admin/jobs")}
              className="flex items-center gap-1 cursor-pointer hover:text-rose-600"
              color="alternative"
              pill
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>

            <h1 className="font-bold text-xl">{id ? "Edit Job" : "Post new job"}</h1>
          </div>

          <div className="grid grid-cols-2 gap-4 ">
            <div className="flex flex-col  gap-1.5">
              <Label htmlFor="name">Job Title </Label>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={input.title}
                onChange={changeHandler}
                className="border border-gray-300 focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500 p-2 rounded-md mt-1"
              />
            </div>
            <div className="flex flex-col  gap-1.5">
              <Label htmlFor="description">Description</Label>
              <input
                type="text"
                name="description"
                placeholder="Job Description"
                value={input.description}
                onChange={changeHandler}
                className="border border-gray-300 focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500 p-2 rounded-md mt-1"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="location">Location</Label>
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={input.location}
                onChange={changeHandler}
                className="border border-gray-300 focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500 p-2 rounded-md mt-1"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="salary">Salary</Label>
              <input
                type="text"
                name="salary"
                placeholder="Salary"
                value={input.salary}
                onChange={changeHandler}
                className="border border-gray-300 focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500 p-2 rounded-md mt-1"
              />
            </div>
            {/* <div className="flex flex-col gap-1.5">
              <Label htmlFor="companyId">Company Name</Label>
              <input
                type="text"
                name="companyId"
                placeholder="Company Name"
                value={input.companyId}
                onChange={changeHandler}
                className="border border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-600 p-2 rounded-md mt-1"
              />
            </div> */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="jobType">Job Type</Label>
              <input
                type="text"
                name="jobType"
                placeholder="Job Type"
                value={input.jobType}
                onChange={changeHandler}
                className="border border-gray-300 focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500 p-2 rounded-md mt-1"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="experience">Experience</Label>
              <input
                type="text"
                name="experience"
                placeholder="Experience"
                value={input.experience}
                onChange={changeHandler}
                className="border border-gray-300 focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500 p-2 rounded-md mt-1"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="position">Position</Label>
              <input
                type="text"
                name="position"
                placeholder="Position Level"
                value={input.position}
                onChange={changeHandler}
                className="border border-gray-300 focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500 p-2 rounded-md mt-1"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="requirements">Requirements</Label>
              <input
                type="text"
                name="requirements"
                placeholder="Requirements or Skills"
                value={input.requirements}
                onChange={changeHandler}
                className="border border-gray-300 focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500 p-2 rounded-md mt-1"
              />
            </div>
          </div>
          <div className="mb-2 p-2 mt-4">
            {companies.length > 0 && (
              <Dropdown
                style={{
                  border: "1px solid #EC003F",
                  backgroundColor: "white",
                  color: "#EC003F",
                }}
                className="cursor-pointer focus:ring-0 focus:outline-none"
                label={selectedCompanyName || "Select Company"}
              >
                {companies.map((company) => {
                  return (
                    <DropdownItem
                    className="text-black hover:text-rose-500"
                     
                      onClick={() =>
                        selectChangeHandler(company.name.toLowerCase())
                      }
                      value={company.name.toLowerCase()}
                    >
                      {company.name}
                    </DropdownItem>
                  );
                })}
              </Dropdown>
            )}
          </div>
          <div className="mb-2 p-2 mt-4 ">
            {loading ? (
              <Button className="w-full cursor-pointer text-white bg-teal-600 hover:bg-teal-700 focus:ring-teal-100 dark:bg-teal-500 dark:hover:bg-teal-600 dark:focus:ring-teal-600 px-6  rounded-md ">
                {" "}
                <Loader2 />
                Please wait...
              </Button>
            ) : (
              <Button
                className=" w-full cursor-pointer text-white bg-rose-600 hover:bg-rose-700 focus:ring-rose-100 dark:bg-rose-500 dark:hover:bg-rose-600 dark:focus:ring-rose-600 px-6  rounded-md "
                type="submit"
              >
              {id ? "Update Job" : "Post Job"}
              </Button>
            )}
            {companies.length === 0 && (
              <p className="text-red-600 mt-2 font-bold text-center">
                *Please register a company before post you post a job.{" "}
              </p>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
