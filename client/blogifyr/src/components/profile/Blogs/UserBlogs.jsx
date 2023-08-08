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
    <div className="">
      <Navbar username={username} />

      <div className="flex">
        <h2 className="text-xl font-semibold mb-4">{`${username}'s Blogs`}</h2>
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-md shadow-md p-4 mb-4"
          >
            <h3 className="text-lg font-semibold">{blog.title}</h3>
            <p className="mt-2">{blog.createdOn}</p>
            <p className="text-sm text-gray-500">Posts: {blog.postsCount}</p>

            <Link to={`${blog._id}`}>View Blog</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserBlogs;
