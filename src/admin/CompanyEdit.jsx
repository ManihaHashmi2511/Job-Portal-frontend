import Navbar2 from "@/components/shared/Navbar2";
import useGetSingleCompany from "@/hooks/useGetSingleCompany";
import { store } from "@/redux/Store";
import axios from "axios";
import { Button, FileInput, Label } from "flowbite-react";
import { ArrowLeft, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function CompanyEdit() {
  const params = useParams();
  useGetSingleCompany({ companyId: params.id })
  const [input, setInput] = useState({
    name: "",
    description: "",
    location: "",
    website: "",
    file: null,
  });

  const navigate = useNavigate();
  
  const { singleCompany } = useSelector((store) => store.company);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("location", input.location);
    formData.append("website", input.website);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const response = await axios.put(
        `http://localhost:8000/api/companies/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success("Company created successfully!");
        navigate("/admin/companies");
      }
    } catch (error) {
      toast.error("Failed to create company.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        location: singleCompany.location || "",
        website: singleCompany.website || "",
        file: singleCompany.file || null,
      });
    }
  }, [singleCompany]);

  return (
    <>
      <Navbar2 />
      <div className="flex justify-center items-center mx-auto max-w-7xl mt-24 mb-12">
        <form
          onSubmit={handleSubmit}
          className="w-[40%] m-2 p-3 shadow-sm shadow-gray-300 rounded-2xl border border-gray-400"
        >
          <div
            className="flex items-center my-4 gap-9
           p-6"
          >
            <Button
              onClick={() => navigate("/admin/companies")}
              className="flex items-center gap-1 cursor-pointer hover:text-teal-600"
              color="alternative"
              pill
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>

            <h1 className="font-bold text-xl">Company Setup</h1>
          </div>
          <div className="flex flex-col gap-4 ">
            <div className="flex flex-col gap-2 px-6">
              <Label htmlFor="name">Company Name</Label>
              <input
                type="text"
                name="name"
                placeholder="Company Name"
                value={input.name}
                onChange={handleChange}
                className="border border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-600 p-2 rounded-md mt-1"
              />
            </div>
            <div className="flex flex-col gap-2 px-6">
              <Label htmlFor="description">Description</Label>
              <input
                type="text"
                name="description"
                placeholder="Something about your company"
                value={input.description}
                onChange={handleChange}
                className="border border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-600 p-2 rounded-md mt-1"
              />
            </div>
            <div className="flex flex-col gap-2 px-6">
              <Label htmlFor="location">Location</Label>
              <input
                type="text"
                name="location"
                placeholder="Company Location"
                value={input.location}
                onChange={handleChange}
                className="border border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-600 p-2 rounded-md mt-1"
              />
            </div>
            <div className="flex flex-col gap-2 px-6">
              <Label htmlFor="website">Website</Label>
              <input
                type="text"
                name="website"
                placeholder="Company Website"
                value={input.website}
                onChange={handleChange}
                className="border border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-600 p-2 rounded-md mt-1"
              />
            </div>
            <div className="flex flex-col gap-2 px-6">
              <Label htmlFor="file">Company Logo</Label>
              <FileInput
                type="file"
                name="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="flex gap-3 mt-10 px-6">
            {loading ? (
              <Button className=" cursor-pointer text-white bg-teal-600 hover:bg-teal-700 focus:ring-teal-100 dark:bg-teal-500 dark:hover:bg-teal-600 dark:focus:ring-teal-600 px-6  rounded-md ">
                {" "}
                <Loader2 />
                Please wait...
              </Button>
            ) : (
              <Button
                className=" cursor-pointer text-white bg-teal-600 hover:bg-teal-700 focus:ring-teal-100 dark:bg-teal-500 dark:hover:bg-teal-600 dark:focus:ring-teal-600 px-6  rounded-md "
                type="submit"
              >
                Save
              </Button>
            )}
            <Button
              outline
              onClick={() => navigate("/admin/companies")}
              className=" cursor-pointer text-teal-500 px-6  rounded-md  hover:bg-teal-600 focus:ring-white"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
