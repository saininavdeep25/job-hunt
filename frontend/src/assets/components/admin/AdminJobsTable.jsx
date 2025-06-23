import React, { useEffect, useState } from 'react';
import { Table as TableIcon, Edit, Trash2, MoreHorizontal, Eye } from 'lucide-react';
import * as Popover from '@radix-ui/react-popover';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useGetAllAdminJobs from '../hooks/UseGetAllAdminJobs';

const AdminJobsTable = () => {
  useGetAllAdminJobs();
  const navigate = useNavigate();
  const { allAdminJobs = [], searchJobByText } = useSelector((store) => store.job); // Default to empty array
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    if (allAdminJobs.length === 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }

    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true;
      return (job?.title?.toLowerCase().includes(searchJobByText.toLowerCase())||job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase()))
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  if (loading) return <div>Loading...</div>; // Render loading state

  return (
    <div className="container mx-auto p-4">
      {/* Table Header with Icon */}
      <div className="flex items-center mb-4 my-5">
        <TableIcon size={24} className="mr-2 text-blue-500" />
        <h1 className="text-2xl font-bold">Recently Posted Jobs</h1>
      </div>

      {/* Check if there are jobs to display */}
      {filterJobs.length === 0 ? (
        <p className="text-gray-500 text-center my-5">No Jobs available</p>
      ) : (
        <table className="table-auto w-full text-left border rounded-md border-gray-200">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Company Name</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filterJobs.map((job) => (
              <tr key={job._id} className="border-b">
                <td className="px-4 py-2">{job.company.name || 'N/A'}</td> {/* Adjust field */}
                <td className="px-4 py-2">{job.title || 'No title'}</td>
                <td className="px-4 py-2">{new Date(job.createdAt).toLocaleDateString()}</td>
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
                          <Button onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)} variant="ghost" className="flex items-center space-x-2">
                            <Eye size={16} />
                            <span>Applicants</span>
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

export default AdminJobsTable;
