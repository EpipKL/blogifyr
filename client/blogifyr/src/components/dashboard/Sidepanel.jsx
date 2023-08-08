import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import 'tailwindcss/tailwind.css';
import Logo from '../../img/png/logo-no-background.png';
import { QUERY_BLOGS, QUERY_ME } from "../../utils/queries";
import Auth from "../../utils/auth";
import CreateBlog from "./Blogs/CreateBlog";

const Sidepanel = () => {

    return (
        <div className="bg-gray-500 text-dark-500 h-screen">
        <div className="p-4 sm:p-5">
          <Link to="/me">
            <img src={Logo} className="max-w-xs object-contain w-32 mb-4" alt="Blogifyr Logo" />
          </Link>
          <ul>
            <li className="mb-2">
              <Link to="/me">
              <a href="#" className="block px-2 py-1 text-primary-500 font-bold text-lg hover:underline">Account</a>
              </Link>
            </li>
            <li className="mb-2">
                <Link to={`/me/blogs`}>
              <a href="#" className="block px-2 py-1 text-primary-500 font-bold text-lg hover:underline">Blogs</a>
                </Link>
              <ul className="list-inside ml-4">
                {/* {blogs.map((blog) => (
                    <li key={blog._id}>
                        <Link to={`/blogs/${blog._id}`}>
                        <a href="#" className="text-primary font-bold hover:underline">{blog.title}</a>
                        </Link>
                    </li>
                ))} */}
                <li>
                  <Link to='/me/create_blog'>
                    <a href="#" className="text-primary-500 hover:underline">Create Blog</a>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    )
}

export default Sidepanel;