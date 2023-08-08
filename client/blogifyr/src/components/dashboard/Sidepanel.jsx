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
        <div className="bg-gray text-dark h-screen">
        <div className="p-5">
          <Link to="/me">
            <img src={Logo} className="max-w-xs object-contain w-32" alt="Blogifyr Logo" />
          </Link>
          <ul className="mt-4">
            <li className="mb-2">
              <Link to="/me">
              <a href="#" className="block px-2 py-1 text-primary font-bold text-xl hover:underline">Account</a>
              </Link>
            </li>
            <li className="mb-2">
                <Link to={`/me/blogs`}>
              <a href="#" className="block px-2 py-1 text-primary font-bold text-xl hover:underline">Blogs</a>
                </Link>
              <ul className="list-disc list-inside ml-4">
                {/* {blogs.map((blog) => (
                    <li key={blog._id}>
                        <Link to={`/blogs/${blog._id}`}>
                        <a href="#" className="text-primary font-bold hover:underline">{blog.title}</a>
                        </Link>
                    </li>
                ))} */}
                <li>
                  <Link to='/me/create_blog'>
                    <a href="#" className="text-primary font-bold hover:underline">Create Blog</a>
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