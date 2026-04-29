import { Button, FileInput, Label, Radio, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import Navbar2 from "./Navbar2";
import API_BASE_URL from "@/api/config";

export default function Login() {


  const [input, setInput] = useState({
    email: "",
    password: "",
    role:""
  })

  const {loading, user} = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true)); // Set loading state to true
      const res = await axios.post(`${API_BASE_URL}/api/users/login`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
      
      if (res.status === 200) {
        dispatch(setUser(res.data.user)); // Update user state in Redux store
        toast.success(res.data.message || "Login successful!");
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed!");
    } finally {
      dispatch(setLoading(false)); // Set loading state to false
    }

  }
 useEffect(() => {
  if(user) {
    navigate("/");
  }
 }, [])

 
  return (
    <div>
      <Navbar2 />
      <div className="flex justify-center items-center mx-auto max-w-7xl p-5">
        <form
          onSubmit={handleSubmit}
          className="w-[40%] m-5 p-6 shadow-sm shadow-rose-300 rounded-2xl border border-rose-200"
        >
          <div className="">
            <h1 className="text-2xl font-bold text-center">Log In</h1>

            
            <div className="my-3 py-2">
              <Label className="text-[16px] py-3.5" htmlFor="email">
                Email
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
              <Label className="text-[16px] py-3.5" htmlFor="password">
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
              {
              loading ? <Button  className="w-full bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-100 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-700 cursor-pointer"><Loader2/>please wait...</Button> : 
               <Button type="submit" className="w-full bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-100 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-700 cursor-pointer">
                Log In
              </Button>
            }
              </div>
              <span className="text-sm"> Don't you have an account?<Link to={'/signup'} className="text-primary-600 hover:underline"> Sign Up</Link></span>
           
          </div>
        </form>
      </div>
    </div>
  );
}
