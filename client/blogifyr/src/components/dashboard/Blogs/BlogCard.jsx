import React from "react";
import 'tailwindcss/tailwind.css'
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <>
      <Link to={`/me/blogs/${blog._id}`} className="
      flex flex-col items-center bg-dark-500 border border-primary-500 rounded-lg shadow-xl md:flex-row md:max-w-xl hover:bg-dark-300 
      ">
      {/* <img src={blog.image} alt={blog.title} className="
      object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" 
      /> */}
      <div className="flex flex-col justify-between p-4 leading-normal">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-white-50">{blog.title}</h5>
                <p className="mb-3 font-normal text-white-50">Post Count: <br />
                <span className="text-accent-500">
                {blog.postsCount}
                </span>
                </p>
                <p className="mb-3 font-normal text-white-50">Created On: <br />
                  
                <span className="text-gray-500">
                {blog.createdOn}
                </span>
                  
                </p>
      </div>
      </Link>
    </>
  );
};

export default BlogCard;