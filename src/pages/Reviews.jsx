import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Star, Plus, Filter, X } from 'lucide-react';

const Reviews = () => {
  const [form, setForm] = useState({ name: '', rating: '', message: '' });
  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchApprovedReviews = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/reviews');
      const approved = res.data.filter((r) => r.approved);
      setReviews(approved);
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.rating || !form.message) {
      alert('Please fill all fields');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/reviews', form);
      alert('Review submitted for approval!');
      setForm({ name: '', rating: '', message: '' });
      setIsModalOpen(false);
      fetchApprovedReviews(); 
    } catch (err) {
      console.error('Error submitting review:', err);
      alert('Failed to submit review. Please try again.');
    }
  };

  useEffect(() => {
    fetchApprovedReviews();
  }, []);

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Rating Summary Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div className="mb-6 md:mb-0">
          <h2 className="text-4xl font-bold mb-2">{averageRating.toFixed(1)}</h2>
          <div className="flex items-center mb-2">
            {renderStars(Math.round(averageRating))}
          </div>
          <p className="text-gray-600">Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}</p>
        </div>
        
        <div>
          <p className="text-gray-700 mb-4">
            Our customers consistently rate us highly for service quality and professionalism.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            <Plus size={18} />
            Add Your Review
          </button>
        </div>
      </div>

      {/* Rating Breakdown */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Rating Breakdown</h3>
        {[5, 4, 3, 2, 1].map((rating) => (
          <div key={rating} className="flex items-center mb-2">
            <span className="w-8">{rating} ★</span>
            <div className="flex-1 bg-gray-200 rounded-full h-2 mx-2">
              <div
                className="bg-yellow-400 h-2 rounded-full"
                style={{
                  width: `${(reviews.filter(r => r.rating === rating).length / reviews.length) * 100 || 0}%`
                }}
              ></div>
            </div>
            <span>{reviews.filter(r => r.rating === rating).length}</span>
          </div>
        ))}
      </div>

      {/* Reviews List */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">All Reviews ({reviews.length})</h3>
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-400" />
            <select 
              className="border rounded px-2 py-1"
              defaultValue="all"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : reviews.length === 0 ? (
          <p className="text-gray-500 py-4">No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review._id} className="border-b pb-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{review.name}</h4>
                  <div className="flex items-center">
                    {renderStars(review.rating)}
                    <span className="ml-1 text-sm text-gray-600">({review.rating})</span>
                  </div>
                </div>
                <p className="text-gray-700">{review.message}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(review.createdAt).toLocaleDateString() || 'Invalid Date'}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Add Your Review</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Rating</label>
                <select
                  value={form.rating}
                  onChange={(e) => setForm({...form, rating: e.target.value})}
                  className="w-full border rounded px-3 py-2"
                  required
                >
                  <option value="">Select rating</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Review</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({...form, message: e.target.value})}
                  className="w-full border rounded px-3 py-2"
                  rows="4"
                  required
                ></textarea>
              </div>
              
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
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
    </div>
  );
};

export default Reviews;