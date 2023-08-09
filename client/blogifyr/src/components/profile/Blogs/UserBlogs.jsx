import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery, useLazyQuery } from "@apollo/client";
import { QUERY_BLOGS, QUERY_ME, QUERY_USER } from "../../../utils/queries";
import Navbar from "../Navbar";

const UserBlogs = () => {
  const { username } = useParams();

  const { loading, error, data } = useQuery(QUERY_USER, {
    variables: { username },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const blogs = data.user.blogs;

  return (
    <div className="w-full">
      <Navbar username={username} />
      <div className="container-fluid m-5">


      <div className="px-4 md:px-0">
        <h2 className="text-xl font-semibold mb-4">{`${username}'s Blogs`}</h2>
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white-50 rounded-md shadow-md p-4 mb-4"
          >
            <h3 className="text-lg font-semibold">{blog.title}</h3>
            <p className="mt-2 text-sm text-dark-500">{blog.createdOn}</p>
            <p className="text-sm text-dark-500">Posts: {blog.postsCount}</p>

            <Link to={`${blog._id}`} className="text-primary-500 hover:underline mt-2 inline-block">View Blog</Link>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default UserBlogs;
