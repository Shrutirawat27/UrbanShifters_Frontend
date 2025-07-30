import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Reviews from './pages/Reviews';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import AdminBlogs from './pages/admin/AdminBlogs';
import AdminEnquiries from './pages/admin/AdminEnquiries';
import AdminReviews from './pages/admin/AdminReviews';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/about" element={<MainLayout><About /></MainLayout>} />
        <Route path="/services" element={<MainLayout><Services /></MainLayout>} />
        <Route path="/blog" element={<MainLayout><Blog /></MainLayout>} />
        <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
        <Route path="/reviews" element={<MainLayout><Reviews /></MainLayout>} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
        <Route path="/admin/blogs" element={<AdminLayout><AdminBlogs /></AdminLayout>} />
        <Route path="/admin/enquiries" element={<AdminLayout><AdminEnquiries /></AdminLayout>} />
        <Route path="/admin/reviews" element={<AdminLayout><AdminReviews /></AdminLayout>} />
      </Routes>
    </Router>
  );
}

export default App;