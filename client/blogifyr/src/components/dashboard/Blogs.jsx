import React, { useState } from 'react';
import 'tailwindcss/tailwind.css'
import Sidepanel from './Sidepanel'
import BlogList from './Blogs/BlogList';
import CreateBlog from './Blogs/CreateBlog';
import BlogPosts from './Blogs/BlogPosts';
import CreatePost from './Blogs/Posts/CreatePost';

const Blogs = () => {

    const [sidepanelOpen, setSidepanelOpen] = useState(false);

    return (
        <div className="flex flex-col md:flex-row">
        {/* Toggle button for Sidepanel on mobile */}
        <button
          className="md:hidden bg-primary-500 text-white-50 px-4 py-2 rounded-xl fixed top-2 right-2 z-10"
          onClick={() => setSidepanelOpen(!sidepanelOpen)}
        >
            {sidepanelOpen ? (
            <i className="fa-solid fa-bars"></i>
          ) : (
            <i className="fa-solid fa-xmark"></i>
          )}
        </button>
  
        {/* Sidepanel */}
        <div className={`bg-gray-50 text-dark-500 h-screen md:w-1/4 ${sidepanelOpen ? 'block' : 'hidden'}`}>
          <Sidepanel />
        </div>
  
        {/* Main content */}
        <div className="flex-grow bg-gray-100">
          <BlogList />
        </div>
      </div>
    )
}

export default Blogs;