import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_SINGLE_BLOG, QUERY_BLOGS } from "../../../utils/queries";

const BlogPosts = () => {
    const { blogId } = useParams();

    const { loading, error, data } = useQuery(QUERY_BLOGS);

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }


    const blog = data?.blogs[0];

    return (
        <div>
          <h1>{blog.title}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {blog.posts.map((post) => (
              <div key={post._id} className="bg-white rounded shadow p-4">
                <h2 className="text-lg font-bold">{blog.title}</h2>
                <p></p>
              </div>
            ))}
          </div>
        </div>
      );
}

export default BlogPosts;