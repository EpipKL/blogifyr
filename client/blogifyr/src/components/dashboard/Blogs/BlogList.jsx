import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import BlogCard from "./BlogCard";
import { QUERY_SINGLE_BLOG, QUERY_BLOGS } from "../../../utils/queries";

const BlogList = () => {
    const { blogId } = useParams();

    const { loading, error, data } = useQuery(QUERY_BLOGS);

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }


    const blogs = data?.blogs;
    console.log(`Blogs: ${blogs}`);
    console.log('Test');

    return (
        <div>

        <h1 className="text-2xl font-semibold mb-4">Blogs</h1>

          <div className="flex justify-between">

          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
            
            ) )}

          </div>

            <Link to='/me/create_blog'>
          <button className="m-5 bg-primary text-white px-4 py-2 rounded-md">
            Create New Blog
          </button>
            </Link>

        </div>
      );
}

export default BlogList;