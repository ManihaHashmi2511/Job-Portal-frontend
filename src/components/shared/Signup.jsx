import { Button, FileInput, Label, Radio} from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import Navbar2 from "./Navbar2";
import { useSelector } from "react-redux";
import API_BASE_URL from "@/api/config";


export default function Signup() {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "",
    file: "",
  });
const {user} = useSelector(store => store.auth);
  const navigate = useNavigate();

  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("role", input.role);
    if(input.file){
      formData.append("file", input.file);
    }

    axios.post(`${API_BASE_URL}/api/users/register`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      withCredentials: true
    }).then((res) => {
      console.log("Registration response:", res);
      if (res.status === 201) {
        navigate("/login");
        toast.success(res.data.message || "Account created successfully!");
      }
    }).catch((error) => {
      console.error("Registration error:", error);
      toast.error(error.response?.data?.message || "Registration failed!");
    });

    
  };
  useEffect(() => {
    if(user){
      navigate("/")
    }
  },[])

  return (
    <div>
      
      <Navbar2 />
      <div className="flex justify-center items-center mx-auto max-w-7xl p-5">
        <form
          onSubmit={handleSubmit}
          className="w-[40%] m-5 p-6 shadow-sm shadow-rose-300 rounded-2xl border border-rose-200"
        >
          <div className="">
            <h1 className="text-2xl font-bold text-center">Sign Up</h1>

            <div className="my-3 py-2">
              <Label className="text-[16px] py-3.5" htmlFor="name">
                Your Name
              </Label>
              <input
                type="text"
                value={input.fullName}
                onChange={handleInput}
                placeholder="Enter your name"
                name="fullName"
                className="block w-full border focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50 border-rose-300 bg-[#fff] text-gray-900 placeholder-gray-400 focus:border-rose-500 focus:ring-rose-400 dark:border-rose-600 dark:bg-gray-700 dark:text-white  dark:focus:border-rose-300 dark:focus:ring-rose-300 p-2.5 text-sm rounded-lg"
              />
            </div>
            <div className="my-3 py-2">
              <Label className="text-[16px] py-3.5" htmlFor="email">
                Your Email
              </Label>
              <input
                className="block w-full border focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50 border-rose-300 bg-[#fff] text-gray-900 placeholder-gray-400 focus:border-rose-300 focus:ring-rose-400 dark:border-rose-600 dark:bg-gray-700 dark:text-white  dark:focus:border-rose-300 dark:focus:ring-rose-300 p-2.5 text-sm rounded-lg"
                type="text"
                placeholder="example@gmail.com"
                name="email"
                value={input.email}
                onChange={handleInput}
              />
            </div>
            <div className="my-3 py-2">
              <Label className="text-[16px] py-3.5" htmlFor="">
                Phone Number
              </Label>
              <input
                className="block w-full border focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50 border-rose-300 bg-[#fff] text-gray-900 placeholder-gray-400 focus:border-rose-300 focus:ring-rose-400 dark:border-rose-600 dark:bg-gray-700 dark:text-white  dark:focus:border-rose-300 dark:focus:ring-rose-300 p-2.5 text-sm rounded-lg"
                type="text"
                placeholder="Phone number"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={handleInput}
              />
            </div>
            <div className="my-3 py-2">
              <Label className="text-[16px] py-3.5" htmlFor="name">
                Password
              </Label>
              <input
                className="block w-full border focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50 border-rose-300 bg-[#fff] text-gray-900 placeholder-gray-400 focus:border-rose-300 focus:ring-rose-400 dark:border-rose-600 dark:bg-gray-700 dark:text-white  dark:focus:border-rose-300 dark:focus:ring-rose-300 p-2.5 text-sm rounded-lg"
                type="password"
                placeholder="Password"
                name="password"
                value={input.password}
                onChange={handleInput}
              />
            </div>
            <div className="flex items-center justify-between space-x-2 ">
              <div className="my-2 py-2">
                <Label className="mb-2 block" htmlFor="file">
                  Profile
                </Label>
                <FileInput
                  name="file"
                  onChange={handleFileChange}
                  className="  border-rose-400   bg-[#fff] text-gray-900 placeholder-rose-700 focus:border-rose-400 focus:ring-rose-400 dark:border-rose-400 dark:bg-rose-100 dark:focus:border-rose-500 dark:focus:ring-rose-500"
                />
              </div>

              <div className="flex max-w-md mt-6  gap-4">
                <div className="flex items-center gap-2">
                  <Radio
                    id="user"
                    name="role"
                    value="user"
                    checked={input.role === "user"}
                    onChange={handleInput}
                    className="cursor-pointer text-rose-500 focus:ring-rose-500 dark:ring-offset-rose-500 dark:focus:ring-rose-500"
                  />
                  <Label htmlFor="user">User</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio
                    id="recruiter"
                    name="role"
                    value="recruiter"
                    checked={input.role === "recruiter"}
                    onChange={handleInput}
                    className="cursor-pointer text-rose-500 focus:ring-rose-500 dark:ring-offset-rose-500 dark:focus:ring-rose-500"
                  />
                  <Label htmlFor="uk">Recruiter</Label>
                </div>
              </div>
            </div>
            <div className="my-4 py-2">
              <Button
                type="submit"
                className="w-full bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-100 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-700 cursor-pointer"
              >
                Sign Up
              </Button>
            </div>
            <span className="text-sm">
              {" "}
              Already have an account?
              <Link to={"/login"} className="text-primary-600 hover:underline">
                {" "}
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
