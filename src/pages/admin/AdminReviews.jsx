import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Star,
  Check,
  X,
  Eye,
  Calendar,
  Filter,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({
    key: 'createdAt',
    direction: 'desc',
  });

  const fetchReviews = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/reviews');
      setReviews(res.data);
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setIsLoading(false);
    }
  };

  const approveReview = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/reviews/approve/${id}`);
      fetchReviews();
    } catch (err) {
      console.error('Error approving review:', err);
    }
  };

  const rejectReview = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/reviews/reject/${id}`);
      fetchReviews();
    } catch (err) {
      console.error('Error rejecting review:', err);
    }
  };

  const deleteReview = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/reviews/${id}`);
      fetchReviews();
    } catch (err) {
      console.error('Error deleting review:', err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredReviews = sortedReviews.filter((review) => {
    if (filterStatus === 'all') return true;
    return filterStatus === 'approved'
      ? review.approved
      : !review.approved;
  });

  const getStatusColor = (approved) => {
    return approved
      ? 'bg-green-100 text-green-800'
      : 'bg-yellow-100 text-yellow-800';
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date)
      ? 'Invalid Date'
      : date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
  };

  const statusCounts = {
    total: reviews.length,
    approved: reviews.filter((r) => r.approved).length,
    pending: reviews.filter((r) => !r.approved).length,
  };

  const averageRating =
    reviews.filter((r) => r.approved).reduce((sum, review, _, { length }) => sum + review.rating / length, 0) || 0;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Review Management</h1>
        <p className="text-gray-600">Moderate and manage customer reviews</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Reviews</p>
              <p className="text-3xl font-bold text-gray-900">{statusCounts.total}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Star className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-3xl font-bold text-green-600">{statusCounts.approved}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Check className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Rating</p>
              <p className="text-3xl font-bold text-purple-600">{averageRating.toFixed(1)}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Star className="h-6 w-6 text-purple-600 fill-current" />
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-xl font-semibold text-gray-900">All Reviews</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <span className="text-gray-600 font-medium">Filter:</span>
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="text-center p-12">
            <Star className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No reviews found</h3>
            <p className="text-gray-600">
              {filterStatus === 'all'
                ? 'No reviews have been submitted yet.'
                : 'Try adjusting your filter to see more reviews.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center">
                      Customer
                      {sortConfig.key === 'name' && (
                        sortConfig.direction === 'asc' ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        )
                      )}
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('rating')}
                  >
                    <div className="flex items-center">
                      Rating
                      {sortConfig.key === 'rating' && (
                        sortConfig.direction === 'asc' ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        )
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Review
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('createdAt')}
                  >
                    <div className="flex items-center">
                      Date
                      {sortConfig.key === 'createdAt' && (
                        sortConfig.direction === 'asc' ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        )
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReviews.map((review) => (
                  <tr key={review._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{review.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {renderStars(review.rating)}
                        <span className="ml-2 text-sm text-gray-600">({review.rating})</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900 line-clamp-2 max-w-xs">
                        {review.message}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">
                          {formatDate(review.createdAt)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(review.approved)}`}>
                        {review.approved ? 'Approved' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedReview(review)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {!review.approved && (
                          <button
                            onClick={() => approveReview(review._id)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                            title="Approve"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={async () => {
                            if (window.confirm('Are you sure you want to delete this review?')) {
                              await deleteReview(review._id);
                            }
                          }}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                          title="Delete"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedReview && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setSelectedReview(null)}></div>
            <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Review Details</h2>
                <button onClick={() => setSelectedReview(null)} className="text-gray-400 hover:text-gray-600">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Customer Name</label>
                    <p className="text-gray-900">{selectedReview.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Rating</label>
                    <div className="flex items-center space-x-2">
                      {renderStars(selectedReview.rating)}
                      <span className="text-gray-600">({selectedReview.rating}/5)</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Date</label>
                  <p className="text-gray-900">{formatDate(selectedReview.createdAt)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Status</label>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedReview.approved)}`}>
                    {selectedReview.approved ? 'Approved' : 'Pending'}
                  </span>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Review</label>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-900">{selectedReview.message}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-6 pt-6 border-t">
                {!selectedReview.approved && (
                  <button
                    onClick={() => {
                      approveReview(selectedReview._id);
                      setSelectedReview(null);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Approve
                  </button>
                )}
                <button
                  onClick={async () => {
                    if (window.confirm('Are you sure you want to delete this review?')) {
                      await deleteReview(selectedReview._id);
                      setSelectedReview(null);
                    }
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
                <button
                  onClick={() => setSelectedReview(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReviews;
