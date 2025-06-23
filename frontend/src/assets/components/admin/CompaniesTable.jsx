import React, { useEffect, useState } from 'react';
import { Table as TableIcon, Edit, Trash2, MoreHorizontal } from 'lucide-react';
import Avatar from '../ui/Avatar';
import * as Popover from '@radix-ui/react-popover';
import Button from '../ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useGetAllCompanies from '../hooks/UseGetAllCompanies';

const CompaniesTable = () => {
  useGetAllCompanies();
  const navigate= useNavigate();
  
  const { companies, searchCompanyByText } = useSelector((store) => store.company); // Ensure store.company is an object
  const companyList = companies || []; // Fallback to empty array if companies is undefined
  const[filterCompany, setFilterCompany]= useState(companyList);
  useEffect(()=>{
    const filteredCompany=companyList.length>=0 && companyList.filter((company)=>{
      if(!searchCompanyByText){
        return true
      };
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
    });
    setFilterCompany(filteredCompany);

  },[companies,searchCompanyByText])
  return (
    <div className="container mx-auto p-4">
      {/* Table Header with Icon */}
      <div className="flex items-center mb-4 my-5">
        <TableIcon size={24} className="mr-2 text-blue-500" />
        <h1 className="text-2xl font-bold">Recently Registered Companies</h1>
      </div>

      {/* Check if there are companies to display */}
      {filterCompany.length === 0 ? (
        <p className="text-gray-500 text-center my-5">No companies available</p>
      ) : (
        <table className="table-auto w-full text-left border rounded-md border-gray-200">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Logo</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filterCompany.map((company) => (
              <tr key={company.id} className="border-b">
                <td className="px-4 py-2">
                  <Avatar src={company.logo} />
                </td>
                <td className="px-4 py-2">{company.name}</td>
                <td className="px-4 py-2">{company.createdAt.split("T")[0]}</td>
                <td className="px-4 py-2 text-right cursor-pointer">
                  {/* Popover Implementation */}
                  <Popover.Root>
                    <Popover.Trigger asChild>
                      <Button variant="ghost">
                        <MoreHorizontal size={24} className="cursor-pointer" />
                      </Button>
                    </Popover.Trigger>

                    <Popover.Portal>
                      <Popover.Content
                        align="end"
                        sideOffset={5}
                        className="bg-white p-2 rounded-md shadow-lg border border-gray-200"
                      >
                        <div className="flex flex-col space-y-2">
                         
                            <Button  onClick={()=>navigate(`/admin/companies/${company._id}`)} variant="ghost" className="flex items-center space-x-2">
                              <Edit size={16} />
                              <span>Edit</span>
                            </Button>
                         
                          <Button variant="ghost" className="flex items-center space-x-2">
                            <Trash2 size={16} />
                            <span>Delete</span>
                          </Button>
                        </div>
                        <Popover.Arrow className="fill-white" />
                      </Popover.Content>
                    </Popover.Portal>
                  </Popover.Root>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CompaniesTable;
