import React from 'react';
import Navbar from '../shareable/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';

const Companies = () => {

  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto my-10 px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between my-5 gap-4">
          <Input
            className="w-full sm:w-1/2 lg:w-1/3 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-600 transition-all duration-200"
            placeholder="Filter by Name"
          />
          <Button className="px-5 py-2 bg-purple-700 text-white font-medium rounded-md hover:bg-purple-800 transition-all duration-200 shadow-md transform hover:scale-105 active:scale-100"
          onClick={() => navigate("/admin/companies/create")}>
            New Company
          </Button>
        </div>
        <CompaniesTable />
      </div>
    </div>
  );
};

export default Companies;
