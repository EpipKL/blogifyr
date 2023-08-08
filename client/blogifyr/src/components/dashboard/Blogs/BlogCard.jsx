import React from "react";
import 'tailwindcss/tailwind.css'
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <>
      <div className="bg-white rounded-md shadow-md m-5 p-10">
        <h2 className="text-lg font-semibold">{blog.title}</h2>
            <img src={blog.image} alt={blog.title} className="mt-2 max-w-full" />
                 <p className="mt-2">Post Count: {blog.postsCount}</p>
                        <Link to={`/me/blogs/${blog._id}`}>
                            <button className="mt-2 bg-primary text-white px-4 py-2 rounded-md">
                            View Blog
                            </button>
                             </Link>
                        </div>
    </>
  );
};

export default BlogCard;