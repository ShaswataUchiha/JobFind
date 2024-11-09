import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Edit2, MoreHorizontal, Trash2 } from "lucide-react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const CompaniesTable = () => {
  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <Table className="w-full">
        <TableCaption className="text-gray-500 text-sm">List of your registered companies</TableCaption>
        <TableHeader>
          <TableRow className="text-left text-gray-700 bg-gray-100">
            <TableHead className="py-4">Logo</TableHead>
            <TableHead className="py-4">Name</TableHead>
            <TableHead className="py-4">Date</TableHead>
            <TableHead className="py-4 text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="hover:bg-gray-50 transition-colors duration-200">
            <TableCell className="p-4">
              <Avatar>
                <AvatarImage src="https://via.placeholder.com/150" alt="Company Logo" />
              </Avatar>
            </TableCell>
            <TableCell className="p-4 font-medium text-gray-800">Company Name</TableCell>
            <TableCell className="p-4 text-gray-600">01/01/2024</TableCell>
            <TableCell className="p-4 text-right cursor-pointer">
              <Popover>
                <PopoverTrigger>
                  <MoreHorizontal className="text-gray-600 hover:text-gray-800" />
                </PopoverTrigger>
                <PopoverContent className="w-36 p-2 border border-gray-300 rounded-md shadow-lg">
                  <div className="flex items-center gap-2 py-1 px-2 hover:bg-gray-100 cursor-pointer rounded transition">
                    <Edit2 className="w-4 h-4 text-gray-700" />
                    <span className="text-gray-700 text-sm">Edit</span>
                  </div>
                  <div className="flex items-center gap-2 py-1 px-2 hover:bg-gray-100 cursor-pointer rounded transition">
                    <Trash2 className="w-4 h-4 text-red-600" />
                    <span className="text-red-600 text-sm">Delete</span>
                  </div>
                </PopoverContent>
              </Popover>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
