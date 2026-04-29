import { Badge, Card } from "flowbite-react";
import { HiCash, HiClock, HiUser } from "react-icons/hi";
import React from "react";
import { useNavigate } from "react-router-dom";


export default function LatestJobs({job}) {
  const navigate = useNavigate();
  return (
    <div>
    <section>
      
      <div
       onClick={()=>navigate(`/description/${job?._id}`)} className="flex flex-wrap justify-center gap-4 p-4">
        <Card className="cursor-pointer max-w-sm h-[310px] ">
          <h3 className=" font-bold tracking-tight text-gray-900 dark:text-white">
           {job?.companyId?.name}
          </h3>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Pakistan
          </p>
          <div>
            <h1 className="text-rose-700 font-bold text-[20px]">{job?.title}</h1>
            <p className="text-gray-700 line-clamp-2">
             {job?.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge
              className="bg-rose-100 text-rose-800 hover:bg-rose-200 dark:bg-rose-200 dark:text-rose-900 dark:hover:bg-rose-300"
              icon={HiClock}
            >
              {job?.jobType}
            </Badge>
            <Badge
              className="bg-rose-100 text-rose-800 hover:bg-rose-200 dark:bg-rose-200 dark:text-rose-900 dark:hover:bg-rose-300"
              icon={HiUser}
            >
              {job?.position} Position
            </Badge>
            <Badge
              className="bg-rose-100 text-rose-800 hover:bg-rose-200 dark:bg-rose-200 dark:text-rose-900 dark:hover:bg-rose-300"
              icon={HiCash}
            >
             {job?.salary} PKR
            </Badge>
          </div>
        </Card>
      </div>
      
      </section>
    </div>
  );
}
