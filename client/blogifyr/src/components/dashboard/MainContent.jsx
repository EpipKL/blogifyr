import React from "react";
import "tailwindcss/tailwind.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Sidepanel from "./Sidepanel";
import Account from "./Account";
import Blogs from "./Blogs";

import Auth from "../../utils/auth";



const MainContent = () => {
  if (!Auth.loggedIn()) {
    window.location.assign("/login");
    return;
  }
  return (
      
    <div className="flex">
      <Sidepanel />
      <Account />
    </div>
  );
};

export default MainContent;
