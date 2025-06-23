import React from 'react';
import { Table as TableIcon } from 'lucide-react'; // Importing the table icon
import Badge from './ui/Badge';
import { useSelector } from 'react-redux';
import UseGetAppliedJobs from './hooks/UseGetAppliedJobs';

const AppliedJobTable = () => {
    UseGetAppliedJobs();
    const { allAppliedJobs } = useSelector(store => store.job);

    if (!allAppliedJobs || !Array.isArray(allAppliedJobs)) {
        return <span>Loading...</span>;
    }

    return (
        allAppliedJobs.length === 0 ? (
            <span>No applied Jobs</span>
        ) : (
            <div className="container mx-auto p-4">
                <div className="flex items-center mb-4">
                    <TableIcon size={24} className="mr-2 text-blue-500" /> {/* Table icon here */}
                    <h1 className="text-2xl font-bold">Applied Jobs</h1>
                </div>

                <table className="table-auto w-full text-left border rounded-md border-gray-200">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Job Role</th>
                            <th className="px-4 py-2">Company</th>
                            <th className="px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allAppliedJobs.map((appliedjob) => (
                            <tr key={appliedjob._id} className="border-b">
                                <td className="px-4 py-2">{appliedjob.createdAt.split("T")[0] || 'NA'}</td>
                                <td className="px-4 py-2">{appliedjob?.job?.title || 'NA'}</td>
                                <td className="px-4 py-2">{appliedjob?.job?.company?.name || 'NA'}</td>
                                <td className="px-4 py-2">
                                    <Badge
                                        className={`${appliedjob.status === 'Rejected' ? 'bg-red-500' : appliedjob.status === 'Pending' ? 'bg-gray-500' : 'bg-green-600'}`}
                                        text={appliedjob.status.toUpperCase() || 'NA'}
                                    />

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    );
}

export default AppliedJobTable;
