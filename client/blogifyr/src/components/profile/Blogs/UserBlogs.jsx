import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_BLOGS, QUERY_SINGLE_BLOG } from "../../../utils/queries";

const UserBlogs = () => {
    const { loading, error, data } = useQuery(QUERY_USER); // or QUERY_USER if you're fetching another user's data
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }
  
    const user = data?.user; // or data?.user if using QUERY_USER
  
    return (
      <div>
        <h2>Your Blogs</h2>
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog._id}>
              <h3>{blog.title}</h3>
              <p>{blog.createdOn}</p>
              
            </li>
          ))}
        </ul>
      </div>
    );
  };

export default UserBlogs;