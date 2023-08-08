import { useQuery } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import { QUERY_SINGLE_BLOG, QUERY_BLOGS, QUERY_POSTS } from "../../../utils/queries";
import Sidepanel from "../Sidepanel";

const BlogPosts = () => {
  const { blogId } = useParams();

  const { loading, error, data } = useQuery(QUERY_POSTS, {
      variables: { blogId }
  });

  if (loading) {
      return <div>Loading...</div>;
  }

  if (error) {
      return <div>Error: {error.message}</div>;
  }

  const posts = data.posts;

  return (
    <div className="flex">
      <div>
      <Sidepanel />
      </div>
      <div>
    {posts.map((post) => (
        <div key={post._id} className="bg-white rounded-md shadow-md p-4 mb-4">
            <h2 className="text-lg font-semibold">{post.title}</h2>
            <p className="mt-2">{post.content}</p>
            <div className="mt-2 flex justify-between items-center">
                <p className={`text-sm ${post.isPublished ? 'text-green-500' : 'text-gray-500'}`}>
                    {post.isPublished ? 'Published' : 'Not Published'}
                </p>
                <p className="text-sm text-gray-500">
                    Created: {new Date(post.createdOn).toLocaleDateString()}
                </p>
            </div>
            <div className="mt-2 flex justify-between items-center">
                <p className="text-sm text-gray-500">
                    Last Updated: {new Date(post.updatedOn).toLocaleDateString()}
                </p>
                <Link path="/me/blogs/:blogId/posts/:postId">
                <button className="text-sm text-blue-500 hover:underline">
                    Edit
                </button>
                </Link>

            </div>
        </div>
    ))}
</div>
    </div>
  );
}

export default BlogPosts;