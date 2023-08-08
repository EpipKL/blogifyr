import 'tailwindcss/tailwind.css';
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries";

const UserProfile = () => {
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
  
    const user = data?.user;
  
    return (
      <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8">
        <div className="flex justify-center items-center">
          <img
            className="w-32 h-32 rounded-full object-cover border-4 border-primary"
            src={user.profile.avatar}
            alt="Profile Avatar"
          />
        </div>
        <div className="mt-4 text-center">
          <h1 className="text-4xl font-bold">{user.profile.fullName}</h1>
          <p className="text-gray-600">{user.username}</p>
          <p className="text-gray-600">{user.profile.memberSince}</p>
        </div>
        <div className="mt-8 px-4">
          <h2 className="text-2xl font-bold">About Me</h2>
          <p className="mt-4 text-gray-800">{user.profile.aboutMe}</p>
        </div>
        <div className="mt-8 px-4">
          <h2 className="text-2xl font-bold">Connect with Me</h2>
          <div className="mt-2">
            <p className="text-gray-800">
            <i className="fa-brands fa-twitter"></i> Twitter:
              </p>
            {user.profile.sites.map((site) => (
              site.name === 'TWITTER_X' && site.url && (
                <a
                  key={site.name}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {site.url}
                </a>
              )
            ))}
          </div>
          <div className="mt-2">
            <p className="text-gray-800">
            <i className="fa-brands fa-facebook"></i> Facebook:
              </p>
            {user.profile.sites.map((site) => (
              site.name === 'FACEBOOK' && site.url && (
                <a
                  key={site.name}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {site.url}
                </a>
              )
            ))}
          </div>
          <div className="mt-2">
            <p className="text-gray-800">
            <i className="fa-brands fa-instagram"></i> Instagram:
              </p>
            {user.profile.sites.map((site) => (
              site.name === 'INSTAGRAM' && site.url && (
                <a
                  key={site.name}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {site.url}
                </a>
              )
            ))}
          </div>
          {/* Add more social media links as needed */}
        </div>
      </div>
    </div>
    );
  };
  
  export default UserProfile;