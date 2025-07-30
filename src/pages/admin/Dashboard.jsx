import React from 'react';
import { 
  Users, 
  FileText, 
  MessageSquare, 
  Star, 
  TrendingUp, 
  Calendar,
  MapPin,
  DollarSign
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Customers',
      value: '10,247',
      change: '+12.5%',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Active Enquiries',
      value: '89',
      change: '+5.2%',
      icon: MessageSquare,
      color: 'teal'
    },
    {
      title: 'Blog Posts',
      value: '142',
      change: '+8.1%',
      icon: FileText,
      color: 'green'
    },
    {
      title: 'Average Rating',
      value: '4.8',
      change: '+0.1',
      icon: Star,
      color: 'yellow'
    }
  ];

  const recentEnquiries = [
    {
      id: 1,
      name: 'John Smith',
      service: 'Home Relocation',
      location: 'Mumbai to Delhi',
      date: '2024-01-20',
      status: 'pending'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      service: 'Office Shifting',
      location: 'Bangalore to Chennai',
      date: '2024-01-19',
      status: 'contacted'
    },
    {
      id: 3,
      name: 'Amit Patel',
      service: 'Vehicle Transport',
      location: 'Pune to Hyderabad',
      date: '2024-01-18',
      status: 'quoted'
    }
  ];

  const recentReviews = [
    {
      id: 1,
      name: 'Priya Sharma',
      rating: 5,
      comment: 'Excellent service! Very professional team.',
      date: '2024-01-20'
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      rating: 5,
      comment: 'Smooth relocation, highly recommended.',
      date: '2024-01-19'
    },
    {
      id: 3,
      name: 'Sneha Reddy',
      rating: 4,
      comment: 'Good service, minor delays but overall satisfied.',
      date: '2024-01-18'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600',
      teal: 'bg-teal-50 text-teal-600',
      green: 'bg-green-50 text-green-600',
      yellow: 'bg-yellow-50 text-yellow-600'
    };
    return colors[color] || colors.blue;
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      contacted: 'bg-blue-100 text-blue-800',
      quoted: 'bg-green-100 text-green-800'
    };
    return colors[status] || colors.pending;
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back! Here's an overview of your business performance.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-full ${getColorClasses(stat.color)}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <span className="text-sm font-medium text-green-600">
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {stat.value}
            </h3>
            <p className="text-gray-600 text-sm">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Enquiries */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Enquiries</h2>
            <a href="/admin/enquiries" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </a>
          </div>
          <div className="space-y-4">
            {recentEnquiries.map((enquiry) => (
              <div key={enquiry.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{enquiry.name}</h3>
                  <p className="text-sm text-gray-600">{enquiry.service}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <MapPin className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{enquiry.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(enquiry.status)}`}>
                    {enquiry.status}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{enquiry.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Reviews</h2>
            <a href="/admin/reviews" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </a>
          </div>
          <div className="space-y-4">
            {recentReviews.map((review) => (
              <div key={review.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{review.name}</h3>
                  <div className="flex space-x-1">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{review.comment}</p>
                <p className="text-xs text-gray-500">{review.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/admin/blogs"
            className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
          >
            <FileText className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <div className="font-medium text-gray-900">Create Blog Post</div>
              <div className="text-sm text-gray-600">Add new content</div>
            </div>
          </a>
          
          <a
            href="/admin/enquiries"
            className="flex items-center p-4 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors duration-200"
          >
            <MessageSquare className="h-8 w-8 text-teal-600 mr-3" />
            <div>
              <div className="font-medium text-gray-900">View Enquiries</div>
              <div className="text-sm text-gray-600">Manage customer requests</div>
            </div>
          </a>
          
          <a
            href="/admin/reviews"
            className="flex items-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors duration-200"
          >
            <Star className="h-8 w-8 text-yellow-600 mr-3" />
            <div>
              <div className="font-medium text-gray-900">Moderate Reviews</div>
              <div className="text-sm text-gray-600">Approve or reject</div>
            </div>
          </a>
          
          <div className="flex items-center p-4 bg-green-50 rounded-lg">
            <TrendingUp className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <div className="font-medium text-gray-900">View Analytics</div>
              <div className="text-sm text-gray-600">Coming soon</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;