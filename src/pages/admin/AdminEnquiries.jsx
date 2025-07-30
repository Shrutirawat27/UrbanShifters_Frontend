import React, { useEffect, useState } from 'react';
import { Filter, Search } from 'lucide-react';

const AdminEnquiries = () => {
  const [enquiriesList, setEnquiriesList] = useState([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/enquiries`);
        const data = await res.json();
        setEnquiriesList(data);
      } catch (error) {
        console.error('Failed to fetch enquiries:', error);
      }
    };
    fetchEnquiries();
  }, []);

  const handleStatusChange = async (enquiryId, newStatus) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/enquiries/${enquiryId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        const updatedEnquiry = await res.json();
        setEnquiriesList(prev =>
          prev.map(enquiry =>
            enquiry._id === enquiryId ? updatedEnquiry : enquiry
          )
        );
      } else {
        console.error('Failed to update status');
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      contacted: 'bg-blue-100 text-blue-800',
      quoted: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800',
    };
    return colors[status] || '';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const filteredEnquiries = enquiriesList.filter(enquiry => {
    const matchesStatus = statusFilter === 'all' || enquiry.status?.toLowerCase() === statusFilter;
    const matchesSearch =
      enquiry.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.message?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Customer Enquiries</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <div className="relative mb-2 md:mb-0">
          <Search className="absolute left-3 top-2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded"
          />
        </div>
        <div>
          <Filter className="inline-block mr-2" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border py-2 px-4 rounded"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="contacted">Contacted</option>
            <option value="quoted">Quoted</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto rounded shadow bg-white">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEnquiries.map(enquiry => (
              <tr key={enquiry._id} className="border-b">
                <td className="p-4">{enquiry.name}</td>
                <td className="p-4">{enquiry.email}</td>
                <td className="p-4">{enquiry.phone}</td>
                <td className="p-4">
                  <select
                    value={enquiry.status}
                    onChange={(e) => handleStatusChange(enquiry._id, e.target.value)}
                    className={`text-xs px-2 py-1 rounded w-full ${getStatusColor(enquiry.status)}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="contacted">Contacted</option>
                    <option value="quoted">Quoted</option>
                    <option value="closed">Closed</option>
                  </select>
                </td>
                <td className="p-4">{formatDate(enquiry.createdAt)}</td>
                <td className="p-4">
                  <button
                    onClick={() => setSelectedEnquiry(enquiry)}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full shadow-lg relative">
            <button
              onClick={() => setSelectedEnquiry(null)}
              className="absolute top-2 right-3 text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">Enquiry Details</h2>
            <p><strong>Name:</strong> {selectedEnquiry.name}</p>
            <p><strong>Email:</strong> {selectedEnquiry.email}</p>
            <p><strong>Phone:</strong> {selectedEnquiry.phone}</p>
            <p><strong>Status:</strong> {selectedEnquiry.status}</p>
            <p><strong>Date:</strong> {formatDate(selectedEnquiry.createdAt)}</p>
            <p className="mt-2"><strong>Message:</strong></p>
            <p className="p-2 border mt-1 rounded bg-gray-50">{selectedEnquiry.message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEnquiries;
