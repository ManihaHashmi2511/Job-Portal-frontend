import React, { useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import "./style.css";
import { Button } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { store } from "@/redux/Store";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import axios from "axios";
import API_BASE_URL from "@/api/config";

export default function Navbar2() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      // ✅ Changed from GET to POST method
      const res = await axios.post(
        `${API_BASE_URL}/api/users/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message || "Logout successfully!");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error.response?.data?.message || "Logout failed!");
    }
  };

  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/users/profile`, { withCredentials: true });
        if (res.status === 200) {
          dispatch(setUser(res.data.user));
        }
      } catch (error) {
        // If not authenticated, do nothing
      }
    };
    if (!user) {
      fetchUser();
    }
  }, [user]);

  return (
    <>
      <div className="">
        <div className="flex items-center justify-between mx-auto max-w-6xl py-5 h-16  ">
          <div>
            <h1 className="text-3xl font-bold text-black">
              Job<span className="text-rose-500" style={{fontFamily:'Berkshire Swash,cursive '}}>Hunt</span>
            </h1>
          </div>
          <div className="flex items-center gap-10 ">
            <ul className="flex gap-4 text-[18px] font-medium text-black">
              {user && user.role === "recruiter" ? (
                <>
                  <li className="cursor-pointer hover:text-rose-500">
                    <Link to={"/admin/companies"}>Companies </Link>
                  </li>
                  <li className="cursor-pointer hover:text-rose-500">
                    <Link to={"/admin/jobs"}>Jobs</Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="cursor-pointer hover:text-rose-500">
                    <Link to={"/"}>Home </Link>
                  </li>
                  <li className="cursor-pointer hover:text-rose-500">
                    {" "}
                    <Link to={"/jobs"}>Jobs</Link>
                  </li>
                  <li className="cursor-pointer hover:text-rose-500">
                    <Link to={"/browse"}>Browse</Link>
                  </li>
                </>
              )}
            </ul>

            {!user ? (
              <div className="flex gap-4">
                <Link to={"/login"}>
                  <Button
                    className="border border-rose-600 text-rose-600 hover:border-rose-600 hover:bg-rose-600 hover:text-white focus:ring-rose-100 dark:border-rose-600 dark:text-rose-500 dark:hover:border-rose-700 dark:hover:bg-rose-700 dark:hover:text-white dark:focus:ring-rose-800 cursor-pointer"
                    outline
                  >
                    Log In
                  </Button>
                </Link>

                <Link to={"/signup"}>
                  <Button className="bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-100 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-700 cursor-pointer">
                    Sign Up
                  </Button>
                </Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilePicture}
                      alt="@shadcn"
                    />
                  </Avatar>
                </PopoverTrigger>

                <PopoverContent className="w-80">
                  <div className="flex gap-4 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={user?.profile?.profilePicture}
                        alt="@shadcn"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullName}</h4>
                      <p className="text-gray-500 line-clamp-1">
                        {user?.profile?.bio || "No bio available"}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col pt-2.5 ">
                    {user && user.role === "user" && (
                      <div className="flex w-fit items-center mt-3 gap-5 profile ">
                        <User2 />
                        <h3 className="cursor-pointer text-[17px]  font-medium prolog ">
                          <Link to={"/profile"}>View Profile</Link>
                        </h3>
                      </div>
                    )}
                    <div className="flex w-fit items-center mt-3 gap-5 profile ">
                      <LogOut />
                      <h3 className="cursor-pointer text-[17px] font-medium prolog ">
                        <button
                          className="cursor-pointer"
                          onClick={logoutHandler}
                        >
                          LogOut
                        </button>
                      </h3>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
