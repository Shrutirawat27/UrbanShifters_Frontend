import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Star, Plus, X } from 'lucide-react';

const Reviews = () => {
  const [form, setForm] = useState({ name: '', rating: '', message: '' });
  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const fetchApprovedReviews = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/reviews`);
      const approved = res.data.filter((r) => r.approved);
      setReviews(approved);
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovedReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.rating || !form.message) {
      alert('Please fill all fields');
      return;
    }
    try {
      await axios.post(`${API_BASE}/api/reviews`, form);
      alert('Review submitted for approval!');
      setForm({ name: '', rating: '', message: '' });
      setIsModalOpen(false);
      fetchApprovedReviews();
    } catch (err) {
      console.error('Error submitting review:', err);
      alert('Failed to submit review. Please try again.');
    }
  };

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Customer <span className="text-teal-300">Reviews</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Hear from our satisfied customers across India.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        {/* Rating Summary */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-2">Customer Reviews</h2>
          <p className="text-gray-600">Here's what our clients are saying</p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 mb-12">
          <div>
            <div className="text-5xl font-bold text-blue-600 mb-2">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex items-center mb-2">
              {renderStars(Math.round(averageRating))}
            </div>
            <p className="text-gray-600">
              Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="flex flex-col justify-center items-start md:items-end">
            <p className="text-gray-700 mb-4 text-sm md:text-base text-center md:text-right">
              We strive for excellence and your feedback matters!
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              <Plus className="inline-block mr-2" size={18} />
              Add Your Review
            </button>
          </div>
        </div>

        {/* Rating Breakdown */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-4">Rating Breakdown</h3>
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = reviews.filter((r) => r.rating === rating).length;
            const percentage = (count / reviews.length) * 100 || 0;
            return (
              <div key={rating} className="flex items-center mb-2">
                <span className="w-8 text-sm">{rating}★</span>
                <div className="flex-1 h-2 bg-gray-200 mx-2 rounded-full">
                  <div
                    className="h-2 bg-yellow-400 rounded-full"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm">{count}</span>
              </div>
            );
          })}
        </div>

        {/* Reviews List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-full text-center py-8">
              <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading reviews...</p>
            </div>
          ) : reviews.length === 0 ? (
            <p className="col-span-full text-gray-500 text-center">
              No reviews available yet.
            </p>
          ) : (
            reviews.map((review) => (
              <div
                key={review._id}
                className="border rounded-lg p-4 shadow-sm hover:shadow-md transition bg-white"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-lg text-gray-800">{review.name}</h4>
                  <div className="flex items-center">
                    {renderStars(review.rating)}
                    <span className="ml-1 text-sm text-gray-600">({review.rating})</span>
                  </div>
                </div>
                <p className="text-gray-700 mb-2">{review.message}</p>
                <p className="text-xs text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Add Review Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Add Your Review</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">Rating</label>
                  <select
                    value={form.rating}
                    onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) })}
                    className="w-full border rounded px-3 py-2"
                    required
                  >
                    <option value="">Select rating</option>
                    {[5, 4, 3, 2, 1].map((r) => (
                      <option key={r} value={r}>{r} Stars</option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">Review</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows="4"
                    className="w-full border rounded px-3 py-2"
                    required
                  ></textarea>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Reviews;
