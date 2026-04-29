import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "flowbite-react";
import { Bookmark } from "lucide-react";
import React from "react";
import { HiCash, HiClock, HiUser } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function Job({job}) {
const navigate = useNavigate();
const jobId = 1; // Example job ID, replace with actual ID as needed

const dayAgo = (mongodbTime) =>{
  const createdAt = new Date(mongodbTime);
  const currentTime = new Date();
  const timeDifference = currentTime - createdAt;
  return Math.floor(timeDifference / (1000*24*60*60))
}


  return (
    <div className="p-6 rounded-md shadow-lg bg-white border border-b-gray-200 h-[365px]">
      <div className="flex justify-between">
        <p className="text-gray-600">{dayAgo(job?.createdAt) === 0 ? "Today" : `${dayAgo(job?.createdAt)} days ago`}</p>
        <Button
          className="rounded-full cursor-pointer"
          size="icon"
          variant="outline"
        >
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button
          className="cursor-pointer rounded-full p-6"
          variant="outline"
          size="icon"
        >
          <Avatar>
            <AvatarImage src={job?.companyId?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className='text-[20px] font-bold'>{job?.companyId?.name}</h1>
          <p>{job?.location}</p>
        </div>
      </div>
      <div className="mt-3">
        <h1 className="font-bold text-[17px] py-2">{job?.title}</h1>
        <p className="text-sm text-gray-500 line-clamp-2">
          {job?.description}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        <Badge
        color="gray"
          icon={HiClock}
        >
          {job?.jobType}
        </Badge>
        <Badge
          color="pink"
          icon={HiUser}
        >
          {job?.position} Position
        </Badge>
        <Badge
          color="indigo"
          icon={HiCash}
        >
          {job?.salary} PKR
        </Badge>
      </div>
      <div className="flex gap-4 mt-5 ">
        <Button onClick={()=>navigate(`/description/${job?._id}`)} className="bg-teal-600 text-white hover:bg-teal-700 focus:ring-teal-100 dark:bg-teal-500 dark:hover:bg-teal-600 dark:focus:ring-teal-600 cursor-pointer">
          Details
        </Button>
        <Button className="bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-100 dark:bg-rose-500 dark:hover:bg-rose-600 dark:focus:ring-rose-600 cursor-pointer">Save For Later</Button>
      </div>

    </div>
  );
}
