import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow, 
} from "flowbite-react";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AdminJobTable() {
  
  const {allAdminJobs, searchJobByText} = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    let filtered = allAdminJobs;
    if (searchJobByText) {
      filtered = allAdminJobs.filter((job) =>
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.companyId?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    }
    setFilterJobs(filtered);
  }, [searchJobByText, allAdminJobs]);



  return (
    <>
      <div className="overflow-x-auto mt-16">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>Company Name</TableHeadCell>
              <TableHeadCell>Role</TableHeadCell>
              <TableHeadCell>Date</TableHeadCell>
              <TableHeadCell className="text-right">Action</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y">
            {filterJobs.length === 0 ? (
              <span>You have no job posted yet.</span>
            ) : (
              <>
                {filterJobs.map((job) => {
                  return (
                    <TableRow key={job._id}>
                   

                      <TableCell>{job?.companyId?.name}</TableCell>
                      <TableCell>{job?.title}</TableCell>
                      <TableCell>{job.createdAt.split("T")[0]}</TableCell>
                      <TableCell className="text-right">
                        <Popover>
                          <PopoverTrigger className="cursor-pointer">
                            <MoreHorizontal />
                          </PopoverTrigger>
                          <PopoverContent className="w-32">
                            <div onClick={() => navigate(`/admin/jobs/${job._id}`)} className="flex gap-2 items-center cursor-pointer w-fit hover:text-teal-600 transition-colors">
                              <Edit2 className="w-5" />
                              <span>Edit</span>
                            </div>
                            <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}  className="flex gap-2 items-center mt-3 cursor-pointer w-fit  hover:text-teal-600 transition-colors">
                              <Eye className="w-4"/>
                              <span>Applicants</span>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                    </TableRow>
                   
                  ); 
                })}
              </>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mt-5 text-center">
        <h1 className="text-gray-500 font-light">
          A List of your posted jobs.
        </h1>
      </div>
    </>
  );
}
