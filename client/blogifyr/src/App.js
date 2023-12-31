import React from "react";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./components/landing/LandingPage";
import AuthPage from "./components/auth/AuthPage";
import MainContent from "./components/dashboard/MainContent";
import Profile from "./components/profile/Profile";
import NotFound from "./components/NotFound";
import ProfileBlogs from "./components/profile/Blogs";
import Blogs from "./components/dashboard/Blogs";
import CreatePost from "./components/dashboard/Blogs/Posts/CreatePost";
import CreateBlog from "./components/dashboard/Blogs/CreateBlog";
import BlogPosts from "./components/dashboard/Blogs/BlogPosts";
import Post from "./components/dashboard/Blogs/Posts/Post";
import UserBlogPosts from "./components/profile/Blogs/UserBlogPosts.jsx";
import UserPost from "./components/profile/Blogs/UserPost";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/me" element={<MainContent />} />
          <Route path="/me/blogs" element={<Blogs />} />
          <Route path="/me/blogs/:blogId" element={<BlogPosts />} />
          <Route path="/me/blogs/:blogId/new_post" element={<CreatePost />} />
          <Route path="/me/create_blog" element={<CreateBlog />} />
          <Route path="/:username" element={<Profile />} />
          <Route path="/:username/blogs" element={<ProfileBlogs />} />
          {/* <Route path="/:username/blogs/:blogId" element={<User />} /> */}
          <Route path="/me/create_blog" element={<CreateBlog />} />
          <Route path="/me/blogs/:blogId/posts/:postId" element={<Post />} />
          <Route path="/:username/blogs/:blogId" element={<UserBlogPosts />} />
          <Route
            path="/:username/blogs/:blogId/posts/:postId"
            element={<UserPost />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
};

export default App;
