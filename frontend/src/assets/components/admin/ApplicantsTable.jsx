import { Avatar } from '@mui/material';
import React from 'react';
import { Table as TableIcon, Edit, Trash2, MoreHorizontal } from 'lucide-react';
import * as Popover from '@radix-ui/react-popover';
import Button from '../ui/Button';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '../utils/constant';
import toast from 'react-hot-toast';

const ApplicantsTable = () => {
  const { allApplicants } = useSelector(store => store.application);

  const shortlistingStatus = ["Accepted", "Rejected"];

  const statusHandler = async (stat, id) => {
    try {
      const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { stat }, {
        withCredentials: true
      });
      if (res.data.success) {
        toast.success(res.data.message); // or use toast.success for notifications
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div>
      <table className="table-auto w-full text-left border rounded-md border-gray-200">
        <caption> A list of recently applied users</caption>
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">FullName</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Contact</th>
            <th className="px-4 py-2">Resume</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {allApplicants && allApplicants.applications.map((item) => (
            <tr key={item._id} className="border-b">
              <td className="px-4 py-2">{item.applicant.fullname}</td>
              <td className="px-4 py-2">{item.applicant.email}</td>
              <td className="px-4 py-2">{item.applicant.phoneNumber}</td>
              <td className="px-4 py-2">
                <a className='text-blue-500' href={item.applicant.profile.resume}>
                  {item.applicant.profile.resumeOriginalName || 'NA'}
                </a>
              </td>
              <td className="px-4 py-2">{item.createdAt.split("T")[0]}</td>
              <td className="px-4 py-2 text-right cursor-pointer">
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
                        {shortlistingStatus.map((stat, index) => (
                          <Button
                            key={index}
                            onClick={() => statusHandler(stat, item._id)} // Wrap in an anonymous function
                          >
                            {stat}
                          </Button>
                        ))}
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
    </div>
  );
};

export default ApplicantsTable;
