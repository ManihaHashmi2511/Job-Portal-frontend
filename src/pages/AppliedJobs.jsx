import { store } from "@/redux/Store";
import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import React from "react";
import { HiCheck, HiScissors } from "react-icons/hi";
import { useSelector } from "react-redux";

export default function AppliedJobs() {
  const { allAppliedJobs } = useSelector((store) => store.job);
  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>Date</TableHeadCell>
              <TableHeadCell>Job Role</TableHeadCell>
              <TableHeadCell>Company</TableHeadCell>
              <TableHeadCell className="text-right">Status</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y">
            {allAppliedJobs.length === 0 ? (
              <span className="text-center text-red-600">
                You have not applied to any job yet.
              </span>
            ) : (
              allAppliedJobs.map((appliedJob) => (
                <TableRow
                  key={appliedJob?._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {appliedJob?.createdAt.split("T")[0]}
                  </TableCell>
                  <TableCell>{appliedJob?.job?.title}</TableCell>
                  <TableCell>{appliedJob?.job?.companyId?.name}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      className="inline"
                      size="sm"
                      color={
                        appliedJob?.status === 'pending'
                          ? 'warning'
                          : appliedJob?.status === 'accepted'
                          ? 'success'
                          : 'failure'
                      }
                    >
                      {appliedJob?.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
