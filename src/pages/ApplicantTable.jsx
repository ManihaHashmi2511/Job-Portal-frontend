import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { MoreHorizontal } from "lucide-react";
import React from "react";
import { useSelector } from 'react-redux';
import axios from 'axios';
import API_BASE_URL from "@/api/config";

const shortListingStatus = ["Accepted", "Rejected"];

export default function ApplicantTable() {
  const { allApplicants } = useSelector(state => state.application);

  const handleStatusUpdate = async (applicationId, status) => {
    try {
      await axios.post(`${API_BASE_URL}/api/applications/status/${applicationId}/update`, { status }, { withCredentials: true });
      // Optionally refresh data or update local state
      window.location.reload(); // Simple refresh for now
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Full Name</TableHeadCell>
            <TableHeadCell>Email</TableHeadCell>
            <TableHeadCell>Contact</TableHeadCell>
            <TableHeadCell>Resume</TableHeadCell>
            <TableHeadCell>Date</TableHeadCell>
            <TableHeadCell className="text-right">Action</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allApplicants.length > 0 ? (
            allApplicants.map((applicant, index) => (
              <TableRow key={index}>
                <TableCell>{applicant.fullName || 'N/A'}</TableCell>
                <TableCell>{applicant.email || 'N/A'}</TableCell>
                <TableCell>{applicant.phoneNumber || 'N/A'}</TableCell>
                <TableCell>
                  <a href={applicant.profile?.resume || '#'} target="_blank" rel="noopener noreferrer">
                    View Resume
                  </a>
                </TableCell>
                <TableCell>{new Date(applicant.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger className='cursor-pointer'>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className='w-32'>
                      {shortListingStatus.map((status, sIndex) => (
                        <div
                          key={sIndex}
                          className="flex items-center my-2 cursor-pointer w-fit"
                          onClick={() => handleStatusUpdate(applicant.applicationId, status.toLowerCase())}
                        >
                          <span>{status}</span>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="6" className="text-center">No applicants found.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="mt-5 text-center">
        <h1 className="text-gray-500 font-light">
          A List of recent applied users.
        </h1>
      </div>
    </>
  );
}
