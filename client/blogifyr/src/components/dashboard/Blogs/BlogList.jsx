import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import Spinner from "../../shared/Spinner";
import BlogCard from "./BlogCard";
import { QUERY_SINGLE_BLOG, QUERY_BLOGS } from "../../../utils/queries";

const BlogList = () => {
    const { blogId } = useParams();

    const { loading, error, data } = useQuery(QUERY_BLOGS);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }


    const blogs = data?.blogs;
    console.log(`Blogs: ${blogs}`);
    console.log('Test');

    return (
        <div className="p-4 h-screen w-screen bg-white-50">

        <h1 className="text-2xl md:text-4xl text-dark-500 font-semibold mb-4">Blogs</h1>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

        {blogs.length === 0 ? (
          <p>No blogs found.</p>
        ) : (
          blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))
        )}
      </div>

            <Link to='/me/create_blog'>
          <button className="my-5 bg-primary-500 text-white-50 px-4 py-2 rounded-md w-full md:w-auto">
            Create New Blog
          </button>
            </Link>

        </div>
      );
}

export default BlogList;