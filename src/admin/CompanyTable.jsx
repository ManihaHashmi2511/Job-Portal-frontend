import { Avatar, AvatarImage } from "@/components/ui/avatar";
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
import { Edit2, MoreHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CompanyTable() {
  const { companies, filterCompaniesByText } = useSelector((store) => store.company);
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    let filtered = companies;
    if (filterCompaniesByText) {
      filtered = companies.filter((company) =>
        company?.name?.toLowerCase().includes(filterCompaniesByText.toLowerCase())
      );
    }
    setFilterCompany(filtered);
  }, [filterCompaniesByText, companies]);



  return (
    <>
      <div className="overflow-x-auto mt-16">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>Logo</TableHeadCell>
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Date</TableHeadCell>
              <TableHeadCell className="text-right">Action</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y">
            {filterCompany.length === 0 ? (
              <span>You have no registered companies</span>
            ) : (
              <>
                {filterCompany.map((company) => {
                  return (
                    <TableRow key={company._id}>
                   

                      <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        <Avatar>
                          <AvatarImage src={company.logo} />
                        </Avatar>
                      </TableCell>
                      <TableCell>{company.name}</TableCell>
                      <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                      <TableCell className="text-right">
                        <Popover>
                          <PopoverTrigger className="cursor-pointer">
                            <MoreHorizontal />
                          </PopoverTrigger>
                          <PopoverContent className="w-32">
                            <div onClick={()=>navigate(`/admin/companies/${company._id}`)} className="flex gap-2 items-center cursor-pointer w-fit">
                              <Edit2 />
                              <span>Edit</span>
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
          A List of your registered companies
        </h1>
      </div>
    </>
  );
}
