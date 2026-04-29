import { Dialog, DialogContent, DialogHeader, DialogTitle,} from "@/components/ui/dialog";
import { setUser } from "@/redux/authSlice";
import axios from "axios";
import { Button, FileInput, Label, TextInput } from "flowbite-react";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import API_BASE_URL from "@/api/config";


export default function EditProfile({ edit, setEdit }) {

  const [loading, setLoading] = useState(false);
  const {user} = useSelector(store=>store.auth)
  const dispatch  = useDispatch();

  const [input, setInput] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: null,

  });

  useEffect(() => {
    setInput({
      fullName: user?.fullName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      bio: user?.profile?.bio || "",
      skills: user?.profile?.skills?.join(", ") || "",
      file: null,
    });
  }, [user]);

  const inputHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  const fileHandleChange = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file});
  };

  const submitHandle = async (e) => {
    e.preventDefault();

    // Validation
    if (!input.fullName || !input.email) {
      toast.error("Full name and email are required!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
  
    if(input.file){
      formData.append("file", input.file);
    }

    try {
     
      const res = await axios.put(`${API_BASE_URL}/api/users/updateProfile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      });

      if(res.status === 200){
        console.log("Updated user data:", res.data.user);
        dispatch(setUser(res.data.user));
        toast.success(res.data.message || "Profile updated successfully!");

      }
    } catch (error) {
      console.error("Profile update error:", error);

      // More specific error handling
      if (error.response?.status === 404) {
        toast.error("User not found. Please login again.");
      } else if (error.response?.status === 401) {
        toast.error("Authentication failed. Please login again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response?.data?.message || "Invalid data provided.");
      } else if (error.response?.status === 500) {
        toast.error("Server error. Please try again later.");
      } else {
        toast.error(error.response?.data?.message || "Profile update failed!");
      }
    } finally {
      setLoading(false);
    }
    setEdit(false);

    console.log("Form data:", input);
  }



  return (
    <>
      <Dialog open={edit}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={() => setEdit(false)}
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <div className="p-5">
            <form className="flex flex-col gap-4" onSubmit={submitHandle}>
              <div className="flex justify-between  items-center">
                <Label>Name</Label>
                <TextInput
                  id="name"
                  name="fullName"
                  placeholder="Enter your full name"
                  type="text"
                  onChange={inputHandler}
                  value={input.fullName}
                  className="w-[80%]"
                />
              </div>
              <div className="flex justify-between items-center">
                <Label>Bio</Label>
                <TextInput
                  id="bio"
                    name="bio"
                  placeholder="Tell us about yourself"
                  type="text"
                    onChange={inputHandler}
                    value={input.bio}
                  className="w-[80%]"
                />
              </div>
              <div className="flex justify-between items-center">
                <Label>Email</Label>
                <TextInput
                 id="email"
                    name="email"
                  placeholder="Enter your email"
                  type="email"
                    onChange={inputHandler}
                    value={input.email}
                  className="w-[80%]"
                />
              </div>
              <div className="flex justify-between items-center">
                <Label>Phone</Label>
                <TextInput
                    id="phoneNumber"
                    name="phoneNumber"
                  placeholder="Your Phone number"
                  type="number"
                    onChange={inputHandler}
                    value={input.phoneNumber}
                  className="w-[80%]"
                />
              </div>
              <div className="flex justify-between items-center">
                <Label>Skills</Label>
                <TextInput
                    id="skills"
                    name="skills"
                  placeholder="e.g. JavaScript, React, Node.js"
                  type="text"
                    onChange={inputHandler}
                    value={input.skills}
                  className="w-[80%]"
                />
              </div>
              <div className="flex justify-between items-center">
                <Label htmlFor="file">Resume</Label>
                <FileInput name="file" type="file" id="file" onChange={fileHandleChange} accept="application/pdf" className="w-[80%] ml-3" />
              </div>
              <div className="flex justify-end mt-4">
                {loading ? (
                  <Button className="w-full bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-100 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-700 cursor-pointer">
                    <Loader2 />
                    please wait...
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="w-full bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-100 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-700 cursor-pointer"
                  >
                    Save Changes
                  </Button>
                )}
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
