import Navbar2 from "@/components/shared/Navbar2";
import { setSingleCompany } from "@/redux/companySlice";
import axios from "axios";
import { Button, Label } from "flowbite-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function CreateComapny() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState();

  const registerNewCompany = async () => {
    try {

        const res = await axios.post("http://localhost:8000/api/companies/register", {companyName},{
            headers: {
              "Content-Type": "application/json"
            },
            withCredentials: true
          } );
            if(res.status === 201){
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message || "Company Created Successfully!");
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
    } 
    
    catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <>
      <Navbar2 />

      <div className="max-w-4xl mx-auto mt-12">
        <h1 className="text-[22px] font-bold mb-5">Your Company Name</h1>
        <p className="text-gray-600">
          What would you like to give your company a name? You can always change
          it later
        </p>

        <div className="flex flex-col gap-2 w-[50%] mt-10">
          <Label className="text-[16px] mr-5" htmlFor="companyName">
            Company Name
          </Label>
          <input
            type="text"
            placeholder="Company Name"
            onChange={(e) => setCompanyName(e.target.value)}
            className=" border border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-600 p-2 rounded-md w-[70%]"
          />
          <div className="flex gap-3 mt-3">
            <Button
              onClick={() => navigate("/admin/companies")}
              outline
              className=" cursor-pointer text-teal-500 px-6  rounded-md  hover:bg-teal-600 focus:ring-white"
            >
              Cancel
            </Button>
            <Button
              onClick={registerNewCompany}
              className="cursor-pointer bg-teal-600 text-white px-6  rounded-md hover:bg-teal-700 focus:ring-white"
            >
              Create
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
