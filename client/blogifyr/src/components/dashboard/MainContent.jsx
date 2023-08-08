import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Sidepanel from "./Sidepanel";
import Account from "./Account";
import Blogs from "./Blogs";

import Auth from "../../utils/auth";



const MainContent = () => {

  const [sidepanelOpen, setSidepanelOpen] = useState(false);


  if (!Auth.loggedIn()) {
    window.location.assign("/login");
    return;
  }

  const toggleSidepanel = () => {
    setSidepanelOpen(!sidepanelOpen);
  };

  return (
    <div className="flex">
      {/* Mobile Toggle button for Sidepanel */}
      <button
        className="md:hidden bg-primary-500 text-white-50 px-4 py-2 rounded-xl fixed top-2 right-2 z-10"
        onClick={toggleSidepanel}
      >
        {sidepanelOpen ? (
          <i className="fa-solid fa-xmark"></i>
        ) : (
          <i className="fa-solid fa-bars"></i>
        )}
      </button>

      {/* Sidepanel for Desktop */}
      <div
        className={`bg-gray-50 text-dark-500 h-screen w-1/4 ${
          !sidepanelOpen ? "hidden md:flex" : "block md:flex"
        }`}
      >
        <Sidepanel />
      </div>

      {/* Account or Sidepanel for Mobile */}
      <div className="flex-grow bg-gray-100 md:w-3/4">
        {sidepanelOpen ? <Sidepanel /> : <Account />}
      </div>
    </div>
  );
};

export default MainContent;
