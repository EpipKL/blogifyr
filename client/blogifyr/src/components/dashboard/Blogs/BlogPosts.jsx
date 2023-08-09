import { useQuery } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import {
  QUERY_SINGLE_BLOG,
  QUERY_BLOGS,
  QUERY_POSTS,
} from "../../../utils/queries";
import Sidepanel from "../Sidepanel";
import Spinner from '../../shared/Spinner'

const BlogPosts = () => {
  const { blogId } = useParams();

  const { loading, error, data } = useQuery(QUERY_POSTS, {
    variables: { blogId },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const posts = data.posts;

  return (
    <div className="flex flex-col md:flex-row">
      <Sidepanel />
      <div className="w-full p-4">
      <h1 className="text-2xl md:text-4xl text-dark-500 font-semibold mb-4">Posts</h1>
        {posts.map((post) => (
          <div key={post._id} className="bg-white-50 rounded-md shadow-md mb-4">
            <h2 className="text-lg font-semibold px-4 py-3">{post.title}</h2>
            <p className="px-4 py-2">{post.content}</p>
            <div className="px-4 py-2 flex justify-between items-center">
              <p
                className={`text-sm font-semibold ${
                  post.isPublished ? "text-success-500" : "text-gray-500"
                }`}
              >
                {post.isPublished ? "Published" : "Not Published"}
              </p>
              <p className="text-sm text-gray-500">
                Created: {new Date(post.createdOn).toLocaleDateString()}
              </p>
            </div>
            <div className="px-4 py-2 flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Last Updated: {new Date(post.updatedOn).toLocaleDateString()}
              </p>
              <Link to={`posts/${post._id}`}>
                <button className="text-sm text-blue-500 hover:underline">
                  Edit
                </button>
              </Link>
            </div>
          </div>
        ))}
      <Link to={`new_post`}>
          <button className="my-5 bg-primary-500 text-white-50 px-4 py-2 rounded-md w-full md:w-auto">
            Create New Post
          </button>
      </Link>
      </div>
    </div>
  );
};

export default BlogPosts;
