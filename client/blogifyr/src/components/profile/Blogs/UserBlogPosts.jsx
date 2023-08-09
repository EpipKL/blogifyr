import { useQuery } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import {
  QUERY_SINGLE_BLOG,
  QUERY_BLOGS,
  QUERY_POSTS,
} from "../../../utils/queries";
import Navbar from "../Navbar";

const UserBlogPosts = () => {
  const { username, blogId } = useParams();

  const { loading, error, data } = useQuery(QUERY_SINGLE_BLOG, {
    variables: { id: blogId },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // filtered out unpublished posts - ideally this would be done by the GQL query...
  const posts = data.blog.posts.filter(post => post.isPublished);

  return (
    <div className="w-full">
      <Navbar username={username} />
      <div className="px-4 md:px-0">
        <div className="flex m-5">
          <h1 className="text-2xl md:text-4xl text-dark-500 font-semibold mb-4">{data.blog.title}</h1>
        </div>
        <div className="m-5">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white-50 rounded-md shadow-md p-4 mb-4"
            >
              <h2 className="text-lg font-semibold">{post.title}</h2>
              <p className="mt-2 text-sm">{`${post.content.substring(0, 47)}...`}</p>
              <div className="mt-2 flex justify-between items-center">
                <p className="text-sm text-dark-500">
                  Last Updated: {new Date(post.updatedOn).toLocaleDateString()}
                </p>
                <Link to={`posts/${post._id}`}>
                <button className="text-sm text-primary-500 hover:underline mt-2 inline-block">
                  View Post
                </button>
              </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserBlogPosts;
