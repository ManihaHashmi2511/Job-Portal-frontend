import Navbar2 from "@/components/shared/Navbar2";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge, Button } from "flowbite-react";
import { Contact, Mail, Pen, Phone, PhoneCall } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import AppliedJobs from "./AppliedJobs";
import EditProfile from "./EditProfile";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

export default function Profile() {
  useGetAppliedJobs();
  const { user } = useSelector((store) => store.auth);
  const skills = user?.profile?.skills || [];


  const isResumeUploaded = user?.profile?.resume ? true : false;


 const [edit, setEdit] = useState(false);
  return (

    <>
      <Navbar2 />
      <div className="max-w-4xl mx-auto mt-10 p-8 border border-gray-300 shadow-gray-300 shadow-sm rounded-md">
        <div className="flex justify-between items-center ">
          <div className="flex gap-4 items-center">
            <Avatar className="h-20 w-20 cursor-pointer">
              <AvatarImage src={user?.profile?.profilePicture} alt="@shadcn" />
            </Avatar>
            <div>
              <h3 className="text-[20px] font-bold">{user?.fullName || "Full Name"}</h3>
              <p className="text-[16px] font-medium text-gray-600 w-[80%]">
                {user?.profile?.bio || "No bio available"}
              </p>
            </div>
          </div>
          <div>
              <Button onClick={()=>setEdit(true)}  className="px-2 text-right border border-teal-600 text-teal-600 hover:border-teal-600 hover:bg-teal-600 hover:text-white focus:ring-white cursor-pointer" outline><Pen/></Button>
          </div>
          
        </div>
        <div className="flex flex-col ">
            <div className="flex gap-3 items-center mt-6">
                <Mail/>
                <p className="text-[16px] font-medium text-gray-600">{user?.email || "example@gmail.com"}</p>
            </div>
            <div className="flex gap-3 items-center mt-6">
                <Phone/>
                <p className="text-[16px] font-medium text-gray-600">{user?.phoneNumber || "+123456789"}</p>
            </div>
             <div className="flex gap-2 items-center mt-6">
               <h4 className="text-[18px] font-bold mr-2">Skills:</h4>
               <div className="flex flex-wrap gap-2">
                {
                    skills.length !== 0 ? skills.map((skill, index) => (
                    <Badge className="bg-teal-600 text-white hover:bg-teal-700 " key={index}>{skill}</Badge>
                    )) : <p className="text-gray-500">No skills added</p>
                }
               </div>
            </div>
            <div className="flex gap-2 items-center mt-6">
              <h4 className="text-[18px] font-bold mr-2">Resume:</h4>
              <div>
                {isResumeUploaded ? (
                  <a className="text-green-600" target="_blank" href={user?.profile?.resume.replace('/image/', '/raw/')}>
                    {user?.profile?.resumeOriginalName || "View Resume"}
                  </a>
                ) : (
                  <p className="text-red-600">No Resume Uploaded</p>
                )}
              </div>
            </div>
        </div>
      </div>
      <div className=" max-w-4xl mx-auto bg-white rounded-2xl my-10">
        <h3 className="text-[20px] my-4 font-bold p-5">Applied Jobs</h3>
        <AppliedJobs/>
      </div>
      <EditProfile edit={edit} setEdit={setEdit}/>
    </>
  );
}
